
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/redux/Actions/AuthAction";
import { clearAuthActionStatus } from "@/redux/Slice/AuthSlice";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    authActionLoading,
    authActionError,
    authActionMessage,
  } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  // Email was saved after OTP verification on the previous page.
  const [email] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("resetPasswordEmail") || "";
    }
    return "";
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email) {
      setLocalError(
        "Email not found. Please complete the forgot-password process first."
      );
      return;
    }

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    const result = await dispatch(
      resetPassword({
        email,
        password,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      sessionStorage.removeItem("resetPasswordEmail");

      // Clear the shared status before leaving the page.
      dispatch(clearAuthActionStatus());

      router.push("/login?passwordReset=success");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-center text-2xl font-bold text-slate-800">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          Create a new password for your account.
        </p>

        {(localError || authActionError) && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {localError || authActionError}
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              New Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4"
            />
            Show passwords
          </label>

          <button
            type="submit"
            disabled={authActionLoading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {authActionLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
