
"use client";

import { useState } from "react";

export default function UserForm({
  defaultRole = "STUDENT",
  onClose,
}) {
  const [role, setRole] = useState(defaultRole);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    qualification: "",
    experienceYears: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
      roles: [role],
      ...(role === "TEACHER" && {
        teacherProfile: {
          qualification: form.qualification,
          experienceYears: Number(form.experienceYears),
          bio: form.bio,
        },
      }),
    };

    // Connect your existing Redux user-creation thunk here.
    console.log("User payload:", payload);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          User Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Temporary Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Temporary password"
            autoComplete="new-password"
            required
            className={inputClass}
          />
        </div>
      </div>

      {role === "TEACHER" && (
        <div className="space-y-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <h3 className="font-semibold text-slate-900">Teacher Profile</h3>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Qualification
            </label>
            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              placeholder="e.g. B.Tech, M.Sc."
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Years of Experience
            </label>
            <input
              name="experienceYears"
              type="number"
              min="0"
              step="1"
              value={form.experienceYears}
              onChange={handleChange}
              placeholder="e.g. 3"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Teacher's background and expertise"
              maxLength={2000}
              rows={4}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Create {role === "TEACHER" ? "Teacher" : "Student"}
        </button>
      </div>
    </form>
  );
}
