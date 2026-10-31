
"use client";

import { useState } from "react";

export default function CourseForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    fees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      fees: Number(form.fees),
    };

    // Connect your existing Redux course-creation thunk here.
    console.log("Course payload:", payload);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Course Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Full Stack Java Development"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What will students learn?"
          rows={5}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Course Fees
        </label>
        <input
          name="fees"
          type="number"
          min="0"
          step="0.01"
          value={form.fees}
          onChange={handleChange}
          placeholder="e.g. 4999"
          required
          className={inputClass}
        />
      </div>

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
          Create Course
        </button>
      </div>
    </form>
  );
}
