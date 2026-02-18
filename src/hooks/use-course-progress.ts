"use client";

import { toCourseProgress, toCourseProgressFromSubjectParams } from "@/mappers/course.mapper";
import useCourseProgressStore from "@/stores/course-progress-store";
import CourseProgress from "@/types/course-progress/course-progress.interface";
import Course from "@/types/course/course.interface";
import { useMemo } from "react";

type UseCourseProgressParams =
  | { course: Course }
  | { courseSlug: string; semesterNumber: number; subjectNumber: number; totalLessons: number };

export const useCourseProgress = (params: UseCourseProgressParams) => {
  const progressStore = useCourseProgressStore((state) => state.progress);
  const progress: CourseProgress = useMemo<CourseProgress>(() => {
    if ("course" in params) {
      return toCourseProgress(params.course, progressStore);
    }

    return toCourseProgressFromSubjectParams(
      params.courseSlug,
      params.semesterNumber,
      params.subjectNumber,
      params.totalLessons,
      progressStore,
    );
  }, [params, progressStore]);
  return progress;
};

export default useCourseProgress;
