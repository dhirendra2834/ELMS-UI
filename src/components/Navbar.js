
"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/Slice/AuthSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-indigo-700"
        >
          Learn<span className="text-slate-900">Hub.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-indigo-600">
            Home
          </Link>
          <Link href="/courses" className="text-sm font-medium text-slate-700 hover:text-indigo-600">
            Courses
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-indigo-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-indigo-600">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:block">
                Hi, {user?.name || user?.email || "Learner"}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
