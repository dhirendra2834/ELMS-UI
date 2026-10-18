
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loginUser,
//   clearAuthError,
// } from "@/redux/AuthSlice";

export default function LoginPage() {
//   const dispatch = useDispatch();
  const router = useRouter();

//   const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // try {
    //   await dispatch(
    //     loginUser({
    //       email: email.trim(),
    //       password,
    //     })
    //   ).unwrap();

    //   router.push("/");
    // } catch {
    //   // The rejected thunk stores the error in Redux.
    //   // Read it through useSelector above.
    // }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-5 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-indigo-600 p-12 text-white md:flex">
          <Link href="/" className="text-2xl font-extrabold">
            LearnHub.
          </Link>

          <div>
            <div className="mb-7 text-7xl">🎓</div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Your learning journey starts here.
            </h1>
            <p className="mt-5 leading-7 text-indigo-100">
              Sign in to explore courses, access learning materials,
              and continue building your skills.
            </p>
          </div>

          <p className="text-sm text-indigo-200">
            Learn something new every day.
          </p>
        </div>

        <div className="p-7 sm:p-12">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-indigo-600"
          >
            ← Back to home
          </Link>

          <h2 className="mt-10 text-3xl font-extrabold text-slate-900">
            Welcome back!
          </h2>
          <p className="mt-3 text-slate-600">
            Enter your details to access your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                //   dispatch(clearAuthError());
                }}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    // dispatch(clearAuthError());
                  }}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 pr-20 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )} */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {/* {loading ? "Signing in..." : "Sign in"} */}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-indigo-600 hover:text-indigo-800"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
