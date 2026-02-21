"use client";

import useUserSubjectLessonProgress from "@/hooks/use-user-subject-lesson-progress";
import { Course } from "@/types/course/course.interface";

interface SemesterStatsProgressProps {
  semesterNumber: number;
  course: Course;
}

export const SemesterStatsProgress = ({ semesterNumber, course }: SemesterStatsProgressProps) => {
  const { getSubjectLessonProgress } = useUserSubjectLessonProgress();
  return (
    <span>
      {course.semesters
        .find((semester) => semester.number === semesterNumber)
        ?.subjects.filter(
          (subject) => getSubjectLessonProgress(subject.id).percentage === 100,
        ).length ?? 0}
    </span>
  );
};

export default SemesterStatsProgress;
