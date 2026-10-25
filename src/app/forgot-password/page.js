
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  forgetPassword,
  verifyOtp,
} from "@/redux/Actions/AuthAction";

import {clearAuthActionStatus} from "@/redux/Slice/AuthSlice";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Match the existing AuthSlice initialState
  const {
    authActionLoading,
    authActionError,
    authActionMessage,
  } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // Clear the previous message/error before a new request
    const result = await dispatch(forgetPassword({email}));

    if (forgetPassword.fulfilled.match(result)) {
      setStep(2);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      verifyOtp({ email, otp })
    );

    if (verifyOtp.fulfilled.match(result)) {
      // Prefill the reset-password page.
      // This is not proof of OTP verification.
      sessionStorage.setItem("resetPasswordEmail", email);
      router.push("/reset-password");
    }
  };

const handleChangeEmail = () => {
  setStep(1);
  setOtp("");
  dispatch(clearAuthActionStatus());
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-center text-2xl font-bold text-slate-800">
          {step === 1 ? "Forgot Password?" : "Verify OTP"}
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          {step === 1
            ? "Enter your registered email to receive an OTP."
            : `Enter the OTP sent to ${email}.`}
        </p>

        {authActionError && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {authActionError}
          </p>
        )}

        {authActionMessage && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700"
          >
            {authActionMessage}
          </p>
        )}

        {step === 1 ? (
          <form
            onSubmit={handleSendOtp}
            className="mt-6 space-y-4"
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              disabled={authActionLoading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {authActionLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleVerifyOtp}
            className="mt-6 space-y-4"
          >
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-slate-700"
            >
              Enter OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              placeholder="Enter OTP"
              maxLength={6}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              disabled={authActionLoading || otp.length !== 6}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {authActionLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleChangeEmail}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 hover:bg-slate-50"
            >
              Change Email
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
