"use client";

import useUserProgressStore from "@/stores/user-progress-store";
import { Course } from "@/types/course/course.interface";

interface SemesterStatsProgressProps {
  semesterNumber: number;
  course: Course;
}

export const SemesterStatsProgress = ({ semesterNumber, course }: SemesterStatsProgressProps) => {
  const getSubjectProgress = useUserProgressStore((state) => state.getSubjectProgress);
  return (
    <span>
      {course.semesters
        .find((semester) => semester.number === semesterNumber)
        ?.subjects.filter(
          (subject) =>
            getSubjectProgress(subject.id, subject.lessons).percentage === 100,
        ).length ?? 0}
    </span>
  );
};

export default SemesterStatsProgress;
