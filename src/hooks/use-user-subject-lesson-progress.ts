"use client";

import useUserLessonProgress from "@/hooks/use-user-lesson-progress";
import { trpc } from "@/lib/trpc";
import { Subject } from "@/types/course/subject.interface";
import { UserSubjectLessonProgress } from "@/types/user-progress/user-subject-lesson-progress.interface";
import { useMemo, useState } from "react";

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
    { enabled: progress.lessons.length > 0 },
  );

  const subjects: Subject[] = useMemo(() => {
    if (!subjectsGroupedByLessonIds) {
      return [];
    }

    const uniqueSubjectsById: Map<string, Subject> = new Map();
    Object.values(subjectsGroupedByLessonIds)
      .flat()
      .forEach((subject) => {
        if (!uniqueSubjectsById.has(subject.id)) {
          uniqueSubjectsById.set(subject.id, subject);
        }
      });

    return Array.from(uniqueSubjectsById.values());
  }, [subjectsGroupedByLessonIds]);

  const completedLessonIdsBySubjectId: Record<string, string[]> = useMemo(() => {
    if (!subjectsGroupedByLessonIds) {
      return {};
    }

    return Object.entries(subjectsGroupedByLessonIds).reduce<Record<string, string[]>>((acc, [lessonId, subjects]) => {
      subjects.forEach((subject) => {
        if (!acc[subject.id]) {
          acc[subject.id] = [];
        }

        acc[subject.id].push(lessonId);
      });

      return acc;
    }, {});
  }, [subjectsGroupedByLessonIds]);

  return {
    getSubjectLessonProgress: (subjectId: string): UserSubjectLessonProgress => {
      const subject: Subject | undefined = subjects?.find((subject) => subject.id === subjectId);
      const completedIds: string[] = completedLessonIdsBySubjectId[subjectId] ?? [];
      const totalLessons: number = subject?.lessons ?? 0;
      const completedLessons: number = completedIds.length;
      return {
        percentage: totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
        completed: completedLessons,
        completedIds: completedIds,
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
