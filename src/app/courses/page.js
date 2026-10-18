"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allcoursesData } from "@/redux/Slice/CourseSlice";
import Link from "next/link";

export default function Page() {
  const dispatch = useDispatch();

  const { coursesData, loading, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(allcoursesData());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Courses Heading */}
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Explore Our Courses
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Discover courses and start learning new skills today.
          </p>
        </div>

        <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {coursesData.length} Courses Available
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="py-6 text-center text-gray-600">
          Loading courses...
        </p>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="py-6 text-center text-red-600">
          {typeof error === "string"
            ? error
            : "Failed to load courses. Please try again."}
        </p>
      )}

      {/* Course Boxes */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-6">
          {coursesData.length > 0 ? (
            coursesData.map((course) => (
              <div
                key={course.id}
                className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  {course.name}
                </h2>

                <p className="mb-4 text-sm leading-6 text-gray-600">
                  {course.description}
                </p>

                <p className="mb-5 text-lg font-bold text-blue-600">
                  ₹{course.fees}
                </p>

                <Link
                  href={`/courses/${course.id}`}
                  className="inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  View Course
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No courses available.
            </p>
          )}
        </div>
      )}

    </div>
  );
}