"use client";

import UserForm from "@/components/from/UserForm";
import CourseForm from "@/components/from/CourseForm";

export default function AdminActionModal({ type, role, onClose }) {
  const isUser = type === "USER";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {isUser
              ? `Create ${role === "TEACHER" ? "Teacher" : "Student"}`
              : "Create Course"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        {isUser ? (
          <UserForm
            key={role}
            defaultRole={role || "STUDENT"}
            onClose={onClose}
          />
        ) : (
          <CourseForm onClose={onClose} />
        )}
      </section>
    </div>
  );
}