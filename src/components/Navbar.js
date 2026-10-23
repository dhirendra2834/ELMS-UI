"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser, initializeAuth } from "@/redux/Slice/AuthSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  //  Restore authentication after page refresh
  useEffect(() => {
     dispatch(initializeAuth());
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    setDropdownOpen(false);
    await dispatch(logoutUser());
    router.push("/");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-indigo-700"
        >
          Learn<span className="text-slate-900">Hub.</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            href="/courses"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Courses
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Contact
          </Link>
        </div>

        {/* Authentication Section */}
        <div className="flex items-center gap-3">

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>

              {/* Clickable User Profile */}
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-100"
              >
                {/* User Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                  {(user?.name || user?.email || "User")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <span className="hidden text-sm font-medium text-slate-700 sm:block">
                  Hi, {user?.name || user?.email || "Learner"}
                </span>

                {/* Dropdown Arrow */}
                <svg
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                >
                  {/* User Details */}
                  <div className="border-b border-slate-100 px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {user?.name || "Learner"}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {user?.email || ""}
                    </p>
                  </div>

                  {/* Profile Links */}
                  <div className="p-2">
               
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      📊 Dashboard
                    </Link>

                    <Link
                      href="/my-courses"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      📚 My Courses
                    </Link>

                        <Link
                    href="/account-settings"
                         role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                       className="block rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                         >
                       ⚙️ Account Settings
                          </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-slate-100 p-2">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {loading ? "Logging out..." : "↪ Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
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