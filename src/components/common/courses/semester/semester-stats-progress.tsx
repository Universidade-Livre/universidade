"use client";

import useCourseProgress from "@/hooks/use-course-progress";
import CourseProgress from "@/types/course-progress/course-progress.interface";
import Course from "@/types/course/course.interface";

interface SemesterStatsProgressProps {
  semesterNumber: number;
  course: Course;
}

export const SemesterStatsProgress = ({ semesterNumber, course }: SemesterStatsProgressProps) => {
  const courseProgress: CourseProgress = useCourseProgress({ course });
  return (
    <span>
      {courseProgress.semesters
        .find((semester) => semester.number === semesterNumber)
        ?.subjects.filter((subject) => subject.progress === 100).length ?? 0}
    </span>
  );
};

export default SemesterStatsProgress;
