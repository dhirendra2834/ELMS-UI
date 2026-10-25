
"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

const stats = [
  {
    title: "My Courses",
    value: "—",
    icon: "📚",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "My Subjects",
    value: "—",
    icon: "📖",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "My Students",
    value: "—",
    icon: "👨‍🎓",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Pending Reviews",
    value: "—",
    icon: "📝",
    color: "bg-orange-100 text-orange-700",
  },
];

const quickActions = [
  {
    title: "Manage My Courses",
    description: "View your assigned courses and manage their content.",
    href: "/teacher/courses",
    icon: "📚",
  },
  {
    title: "Manage Subjects",
    description: "View subjects and organize learning content.",
    href: "/teacher/subjects",
    icon: "📖",
  },
  {
    title: "Manage Chapters",
    description: "Create and update chapters for your subjects.",
    href: "/teacher/chapters",
    icon: "🗂️",
  },
  {
    title: "View My Students",
    description: "Check enrolled students and their learning progress.",
    href: "/teacher/students",
    icon: "👨‍🎓",
  },
];

export default function TeacherDashboard({ previewMode = false }) {
  const { user } = useSelector((state) => state.auth);

  const teacherName = user?.name || "Teacher";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome Section */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-600 p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-sm text-blue-100">
              {previewMode ? "Dashboard Preview" : "Teacher Portal"}
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Welcome, {previewMode ? "Teacher" : teacherName}! 👋
            </h1>

            <p className="mt-2 text-sm text-blue-100 sm:text-base">
              Manage your courses, subjects, students, and learning content.
            </p>
          </div>

          <Link
            href="/teacher/courses"
            className="inline-flex w-fit items-center rounded-lg bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-blue-50"
          >
            View My Courses →
          </Link>
        </div>

        {/* Statistics */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Teaching Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </span>

                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${stat.color}`}
                  >
                    {stat.icon}
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {previewMode
                    ? "Preview — sample data not connected"
                    : "Connect the relevant API to display data"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Teaching Management
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                    {action.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-indigo-700">
                      {action.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {action.description}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-indigo-600">
                      Open section →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep track of updates related to your teaching.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-8 text-center">
            <div className="text-4xl">📋</div>

            <p className="mt-3 font-medium text-slate-700">
              No recent activity available
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Activity will appear here once the backend API is connected.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
