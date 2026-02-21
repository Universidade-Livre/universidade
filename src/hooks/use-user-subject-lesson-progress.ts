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
  const { data: subjectsGroupedByLessonIds = [], isLoading: isSubjectLoading, isError } = trpc.subject.getGroupedByLessonIds.useQuery(
    { lessonIds: progress.lessons },
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
        completedIds: lessonIds,
        total: totalLessons,
      };
    },
    subjects: [...subjectsGroupedByLessonIds]
      .sort(([lessonIdsA, subjectA], [lessonIdsB, subjectB]) => {
        switch (orderBy) {
          case UserSubjectLessonProgressOrder.Progress:
            return subjectA.lessons > 0 && subjectB.lessons > 0
              ? lessonIdsB.length / subjectB.lessons - lessonIdsA.length / subjectA.lessons
              : 0;
          case UserSubjectLessonProgressOrder.Semester:
            return subjectA.info.semester.number - subjectB.info.semester.number;
          case UserSubjectLessonProgressOrder.Course:
            return subjectA.info.course.name.localeCompare(subjectB.info.course.name);
          default:
            return 0;
        }
      })
      .map(([, subject]) => subject),
    orderBy: orderBy,
    setOrderBy: setOrderBy,
    toggleLessonProgress: toggleLessonProgress,
    isLoading: isProgressLoading || isSubjectLoading,
    isError: isError,
  };
};

export default useUserSubjectLessonProgress;
