"use client";

import useUserSubjectLessonProgress from "@/hooks/use-user-subject-lesson-progress";
import { Semester } from "@/types/course/semester.interface";

interface SemesterStatsProgressProps {
  semester: Semester;
}

export const SemesterStatsProgress = ({ semester }: SemesterStatsProgressProps) => {
  const { getSubjectLessonProgress, isLoading, isError } = useUserSubjectLessonProgress();
  if (isError) {
    throw new Error("Não foi possível carregar o progresso do semestre.");
  }

  if (isLoading) {
    return <span className="text-zinc-400">...</span>;
  }

  return (
    <span>
      {semester.subjects.filter(
        (subject) => getSubjectLessonProgress(subject.id).percentage === 100,
      ).length}
    </span>
  );
};

export default SemesterStatsProgress;
