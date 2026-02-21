"use client";

import useUserLessonProgress from "@/hooks/use-user-lesson-progress";
import { trpc } from "@/lib/trpc";
import { Subject } from "@/types/course/subject.interface";
import { UserSubjectLessonProgress } from "@/types/user-progress/user-subject-lesson-progress.interface";
import { useCallback, useMemo, useState } from "react";

export enum UserSubjectLessonProgressOrder {
  Progress = "progresso",
  Semester = "etapa",
  Course = "curso",
}

export const useUserSubjectLessonProgress = () => {
  const [orderBy, setOrderBy] = useState<UserSubjectLessonProgressOrder>(UserSubjectLessonProgressOrder.Progress);
  const { progress, toggleUserLessonProgress, isLoading: isProgressLoading, isError: isProgressError } = useUserLessonProgress();
  const { data: subjectsGroupedByLessonIds = [], isLoading: isSubjectLoading, isError: isSubjectError } = trpc.subject.getGroupedByLessonIds.useQuery(
    { lessonIds: progress.lessons },
    {
      placeholderData: (previousData) => progress.lessons.length > 0
        ? previousData
        : [],
    },
  );

  const subjectLessonProgressMap = useMemo<Map<string, UserSubjectLessonProgress>>(
    () =>
      new Map<string, UserSubjectLessonProgress>(
        subjectsGroupedByLessonIds.map(([lessonIds, subject]) => {
          const totalLessons: number = subject.lessons;
          const completedLessons: number = lessonIds.length;
          return [
            subject.id,
            {
              percentage: totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0,
              completed: completedLessons,
              completedIds: progress.lessons,
              total: totalLessons,
            },
          ];
        }),
      ),
    [progress.lessons, subjectsGroupedByLessonIds],
  );

  const getSubjectLessonProgress = useCallback<(subjectId: string) => UserSubjectLessonProgress>(
    (subjectId: string): UserSubjectLessonProgress =>
      subjectLessonProgressMap.get(subjectId) ?? {
        percentage: 0,
        completed: 0,
        completedIds: progress.lessons,
        total: 0,
      },
    [progress.lessons, subjectLessonProgressMap],
  );

  const subjects = useMemo<Subject[]>(
    () =>
      [...subjectsGroupedByLessonIds]
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
    [orderBy, subjectsGroupedByLessonIds],
  );

  return {
    subjects,
    getSubjectLessonProgress,
    orderBy,
    setOrderBy,
    toggleLessonProgress: toggleUserLessonProgress,
    isLoading: isProgressLoading || isSubjectLoading,
    isError: isProgressError || isSubjectError,
  };
};

export default useUserSubjectLessonProgress;
