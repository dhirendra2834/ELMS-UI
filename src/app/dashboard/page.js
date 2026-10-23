
"use client";

import { useSelector } from "react-redux";
import Link from "next/link";

import StudentDashboard from "@/components/dashboard/StudentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="p-8">
        Please <Link href="/login" className="text-indigo-600 underline">
          login
        </Link> to access your dashboard.
      </div>
    );
  }

  const roles = user.roles ?? (user.role ? [user.role] : []);

  if (roles.includes("ADMIN") || roles.includes("ADMINISTRATION")) {
    return <AdminDashboard />;
  }

  if (roles.includes("TEACHER")) {
    return <TeacherDashboard />;
  }

  if (roles.includes("STUDENT")) {
    return <StudentDashboard />;
  }

  return <div className="p-8">No dashboard is assigned to your role.</div>;
}
