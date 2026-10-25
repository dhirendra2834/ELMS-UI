
"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

const sampleCourses = [
  {
    id: 1,
    name: "Java Programming",
    description: "Master Java fundamentals and OOP concepts.",
    completedChapters: 8,
    totalChapters: 12,
    progress: 67,
    color: "bg-indigo-600",
  },
  {
    id: 2,
    name: "Spring Boot & REST APIs",
    description: "Build REST APIs with Spring Boot.",
    completedChapters: 5,
    totalChapters: 15,
    progress: 33,
    color: "bg-emerald-600",
  },
  {
    id: 3,
    name: "React & Next.js",
    description: "Build modern interactive web applications.",
    completedChapters: 12,
    totalChapters: 12,
    progress: 100,
    color: "bg-violet-600",
  },
];

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);

  // Demo data: replace with enrolled courses from your API.
  const courses = sampleCourses;

  const completedCourses = courses.filter(
    (course) => course.progress === 100
  ).length;

  const inProgressCourses = courses.filter(
    (course) => course.progress > 0 && course.progress < 100
  ).length;

  const overallProgress = courses.length
    ? Math.round(
        courses.reduce((total, course) => total + course.progress, 0) /
          courses.length
      )
    : 0;

  const stats = [
    {
      label: "Enrolled Courses",
      value: courses.length,
      icon: "📚",
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "In Progress",
      value: inProgressCourses,
      icon: "⏳",
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Completed",
      value: completedCourses,
      icon: "🏆",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Overall Progress",
      value: `${overallProgress}%`,
      icon: "📈",
      color: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-700 p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-sm text-indigo-100">
              STUDENT DASHBOARD
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Welcome back, {user?.name || "Learner"}! 👋
            </h1>

            <p className="mt-2 text-sm text-indigo-100">
              Keep learning, track your progress, and achieve your goals.
            </p>
          </div>

          <Link
            href="/my-courses"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            Continue Learning →
          </Link>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Learning Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>

                  <span className={`rounded-xl p-3 ${stat.color}`}>
                    {stat.icon}
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Enrolled Courses */}
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                My Learning
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Pick up where you left off.
              </p>
            </div>

            <Link
              href="/my-courses"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View All →
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-lg font-semibold text-slate-800">
                No enrolled courses yet
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Explore our courses and start learning today.
              </p>

              <Link
                href="/courses"
                className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`h-2 ${course.color}`} />

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900">
                      {course.name}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm text-slate-500">
                      {course.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Course Progress
                      </span>
                      <span className="font-bold text-indigo-700">
                        {course.progress}%
                      </span>
                    </div>

                    <div
                      className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
                      role="progressbar"
                      aria-valuenow={course.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${course.name} progress`}
                    >
                      <div
                        className={`h-full rounded-full ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      {course.completedChapters} of {course.totalChapters} chapters completed
                    </p>

                    <Link
                      href={`/courses/${course.id}`}
                      className="mt-5 block rounded-xl border border-indigo-200 px-4 py-3 text-center text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
                    >
                      {course.progress === 100
                        ? "Review Course"
                        : "Continue Course"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Account Shortcut */}
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-slate-900">
              Manage Your Account
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update your personal information and security settings.
            </p>
          </div>

          <Link
            href="/account-settings"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
          >
            Account Settings
          </Link>
        </section>

      </div>
    </div>
  );
}
