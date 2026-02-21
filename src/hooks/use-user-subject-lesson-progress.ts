"use client";

import useUserLessonProgress from "@/hooks/use-user-lesson-progress";
import { trpc } from "@/lib/trpc";
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
  const { data: subjectsGroupedByLessonIds, isLoading: isSubjectLoading, isError } = trpc.subject.getGroupedByLessonIds.useQuery(
    { lessonIds: progress.lessons },
    {
      enabled: progress.lessons.length > 0,
      placeholderData: (prev) => prev,
    },
  );

  return {
    getSubjectLessonProgress: (subjectId: string): UserSubjectLessonProgress => {
      const [lessonIds, subject] = subjectsGroupedByLessonIds?.find(([, subject]) => subject.id === subjectId) ?? [[], undefined];
      const totalLessons: number = subject?.lessons ?? 0;
      const completedLessons: number = lessonIds.length;
      return {
        percentage: totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
        completed: completedLessons,
        completedIds: progress.lessons,
        total: totalLessons,
      };
    },
    subjects: subjectsGroupedByLessonIds
      ?.map(([, subject]) => subject)
      .sort((a, b) => {
        switch (orderBy) {
          // case UserSubjectLessonProgressOrder.Progress:
          //   return b.subjectProgress.percentage - a.subjectProgress.percentage;
          case UserSubjectLessonProgressOrder.Semester:
            return a.info.semester.number - b.info.semester.number;
          case UserSubjectLessonProgressOrder.Course:
            return a.info.course.name.localeCompare(b.info.course.name);
          default:
            return 0;
        }
      }),
    orderBy: orderBy,
    setOrderBy: setOrderBy,
    toggleLessonProgress: toggleLessonProgress,
    isLoading: isProgressLoading || isSubjectLoading,
    isError: isError,
  };
};

export default useUserSubjectLessonProgress;
