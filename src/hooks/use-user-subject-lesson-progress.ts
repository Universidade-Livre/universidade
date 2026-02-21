"use client";

import useUserLessonProgress from "@/hooks/use-user-lesson-progress";
import { trpc } from "@/lib/trpc";
import { Subject } from "@/types/course/subject.interface";
import { UserSubjectLessonProgress } from "@/types/user-progress/user-subject-lesson-progress.interface";
import { useState } from "react";

export enum UserSubjectLessonProgressOrder {
  Progress = "progresso",
  Semester = "etapa",
  Course = "curso",
}

export const useUserSubjectLessonProgress = () => {
  const [orderBy, setOrderBy] = useState<UserSubjectLessonProgressOrder>(UserSubjectLessonProgressOrder.Progress);
  const { progress, toggleLessonProgress, isLoading: isProgressLoading } = useUserLessonProgress();
  const { data: subjects, isLoading: isSubjectLoading, isError } = trpc.subject.getByLessonIds.useQuery(
    { lessonIds: progress.lessons },
    { enabled: progress.lessons.length > 0 },
  );

  return {
    getSubjectLessonProgress: (subjectId: string): UserSubjectLessonProgress => {
      const subject: Subject | undefined = subjects?.find((subject) => subject.id === subjectId);
      const totalLessons: number = subject?.lessons ?? 0;
      const completedLessons: number = progress.lessons.length;
      return {
        percentage: totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
        completed: completedLessons,
        completedIds: progress.lessons,
        total: totalLessons,
      };
    },
    subjects: subjects,
    orderBy: orderBy,
    setOrderBy: setOrderBy,
    toggleLessonProgress: toggleLessonProgress,
    isLoading: isProgressLoading || isSubjectLoading,
    isError: isError,
  };
};

export default useUserSubjectLessonProgress;
