"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {coursesDataById} from '@/redux/Slice/CourseSlice'

export default function CourseDetails() {
  const { id } = useParams();
  const {courseData, loading, error} = useSelector((state)=> state.courses)
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(coursesDataById(id))
  },[id])

  if (loading) {
    return <p className="p-6">Loading course details...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!courseData) {
    return <p className="p-6">Course not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Course Information */}
      <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          {courseData.name}
        </h1>

        <p className="mb-5 leading-7 text-gray-600">
          {courseData.description}
        </p>

        <p className="text-xl font-bold text-blue-600">
          Fees: ₹{courseData.fees}
        </p>
      </div>

      {/* Subjects */}
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        Course Subjects
      </h2>

      {courseData.subjects?.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {courseData.subjects.map((subject) => (
            <div
              key={subject.id}
              className="w-full rounded-xl border bg-white p-5 shadow-sm sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <h3 className="mb-2 text-xl font-semibold">
                {subject.name}
              </h3>

              <p className="mb-5 text-sm leading-6 text-gray-600">
                {subject.description}
              </p>

              {/* Chapters */}
              <h4 className="mb-3 font-semibold text-gray-800">
                Chapters
              </h4>

              {subject.chapters?.length > 0 ? (
                <div className="space-y-3">
                  {[...subject.chapters]
                    .sort(
                      (a, b) => a.chapterOrder - b.chapterOrder
                    )
                    .map((chapter) => (
                      <div
                        key={chapter.id}
                        className="rounded-lg bg-gray-50 p-3"
                      >
                        <p className="font-medium text-gray-900">
                          {chapter.chapterOrder}. {chapter.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          {chapter.description}
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No chapters available.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No subjects available for this course.
        </p>
      )}
    </div>
  );
}