
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import StudentDashboard from "@/components/dashboard/StudentDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";

const stats = [
  {
    title: "Total Students",
    value: "—",
    icon: "🎓",
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Total Teachers",
    value: "—",
    icon: "👨‍🏫",
    color: "bg-purple-50 text-purple-700",
  },
  {
    title: "Total Courses",
    value: "—",
    icon: "📚",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Total Enrollments",
    value: "—",
    icon: "📝",
    color: "bg-orange-50 text-orange-700",
  },
];

const managementItems = [
  {
    title: "Manage Students",
    description: "View student details and manage accounts.",
    icon: "🎓",
    href: "/admin/students",
  },
  {
    title: "Manage Teachers",
    description: "View teachers and manage their accounts.",
    icon: "👨‍🏫",
    href: "/admin/teachers",
  },
  {
    title: "Manage Courses",
    description: "Create and manage courses, subjects, and chapters.",
    icon: "📚",
    href: "/admin/courses",
  },
  {
    title: "Enrollments",
    description: "Check which students enrolled in each course.",
    icon: "📝",
    href: "/admin/enrollments",
  },
];

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  const [preview, setPreview] = useState("ADMIN");

  // Preview other dashboard UIs without changing the logged-in role.
  if (preview === "STUDENT") {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex flex-col gap-3 border-b bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-amber-700">
              Student Dashboard Preview
            </p>
            <p className="text-sm text-slate-500">
              Preview mode — your authenticated account is still Admin.
            </p>
          </div>

          <button
            onClick={() => setPreview("ADMIN")}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            ← Back to Admin Dashboard
          </button>
        </div>

        <StudentDashboard previewMode={true} />
      </div>
    );
  }

  if (preview === "TEACHER") {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex flex-col gap-3 border-b bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-amber-700">
              Teacher Dashboard Preview
            </p>
            <p className="text-sm text-slate-500">
              Preview mode — your authenticated account is still Admin.
            </p>
          </div>

          <button
            onClick={() => setPreview("ADMIN")}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            ← Back to Admin Dashboard
          </button>
        </div>

        <TeacherDashboard previewMode={true} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome section */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-700 p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-sm font-medium text-indigo-200">
              ADMIN DASHBOARD
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Welcome back, {user?.name || "Admin"}! 👋
            </h1>

            <p className="mt-3 text-sm text-indigo-100">
              Manage your learning platform from one place.
            </p>
          </div>

          <Link
            href="/admin/students/create"
            className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            + Add New User
          </Link>
        </section>

        {/* Dashboard preview selector */}
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Preview Dashboard
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore how the platform looks for different roles.
            </p>
          </div>

          <select
            value={preview}
            onChange={(event) => setPreview(event.target.value)}
            aria-label="Choose dashboard preview"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-64"
          >
            <option value="ADMIN">Admin Dashboard</option>
            <option value="STUDENT">Student Dashboard Preview</option>
            <option value="TEACHER">Teacher Dashboard Preview</option>
          </select>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Platform Overview
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <span className={`rounded-xl p-3 text-xl ${stat.color}`}>
                    {stat.icon}
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Connect API to load live data
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Management */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Platform Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage users, learning content, and student enrollments.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {managementItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>

                    <Link
                      href={item.href}
                      className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Open Management →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/courses/create"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              + Create Course
            </Link>

            <Link
              href="/admin/teachers/create"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              + Add Teacher
            </Link>

            <Link
              href="/admin/students/create"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              + Add Student
            </Link>

            <Link
              href="/admin/enrollments"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Enrollments
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
