"use client";

import useUserSubjectLessonProgress from "@/hooks/use-user-subject-lesson-progress";
import { Semester } from "@/types/course/semester.interface";

interface SemesterStatsProgressProps {
  semester: Semester;
}

export const SemesterStatsProgress = ({ semester }: SemesterStatsProgressProps) => {
  const { getSubjectLessonProgress } = useUserSubjectLessonProgress();
  return (
    <span>
      {semester.subjects.filter(
        (subject) => getSubjectLessonProgress(subject.id).percentage === 100,
      ).length}
    </span>
  );
};

export default SemesterStatsProgress;
