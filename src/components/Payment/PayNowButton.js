"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  createEnrollmentOrder,
  verifyPayment,
} from "@/services/apidetails";

export default function PayNowButton({ courseId }) {
  const router = useRouter();

  const { user, token } = useSelector((state) => state.auth);

  const [scriptReady, setScriptReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (window.Razorpay) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => setScriptReady(true);
    script.onerror = () =>
      setMessage("Could not load Razorpay checkout.");

    document.body.appendChild(script);
  }, []);

  async function handlePayment() {
    // 1. Check authentication
    if (!token || !user) {
      const currentPath =
        window.location.pathname + window.location.search;

      router.push(
        `/login?redirect=${encodeURIComponent(currentPath)}`
      );

      return;
    }

    // 2. Check student role
    const roles = Array.isArray(user.roles)
      ? user.roles
      : [];

    if (!roles.includes("STUDENT")) {
      setMessage("Only students can purchase courses.");
      return;
    }

    // 3. Check Razorpay readiness
    if (!scriptReady || !window.Razorpay) {
      setMessage("Payment checkout is not ready.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      // 4. Create Razorpay order
      const orderResponse = await createEnrollmentOrder({
        courseId,
      });

      const order = orderResponse.data;

      // 5. Razorpay configuration
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Learning Platform",
        description: `Course ID: ${order.courseId}`,
        order_id: order.razorpayOrderId,

        // 6. Verify payment
        handler: async function (response) {
          try {
            setMessage("Verifying payment...");

            const verifyResponse = await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            const result = verifyResponse.data;

            setMessage(
              typeof result === "string"
                ? `Payment successful! ${result}`
                : result?.message || "Payment successful!"
            );

            // Refresh enrollment/course state here.
          } catch (error) {
            console.error("Payment verification error:", error);

            setMessage(
              error.response?.data?.message ||
              "Payment received, but verification is pending."
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setMessage(
              "Checkout closed. Please check payment status before retrying."
            );
            setLoading(false);
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      // 7. Open checkout
      const checkout = new window.Razorpay(options);

      checkout.on("payment.failed", (response) => {
        setMessage(
          response.error?.description || "Payment failed."
        );
        setLoading(false);
      });

      checkout.open();

    } catch (error) {
      console.error("Payment initialization error:", error);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Unable to start payment."
      );

      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handlePayment}
        disabled={!scriptReady || loading}
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!scriptReady
          ? "Loading Checkout..."
          : loading
          ? "Processing..."
          : "Pay Now"}
      </button>

      {message && (
        <p className="mt-3 text-sm" role="status">
          {message}
        </p>
      )}
    </div>
  );
}