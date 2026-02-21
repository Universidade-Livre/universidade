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

const getCourseName = (subject: Subject): string =>
  subject.info.course.alternativeName || subject.info.course.name;

const getEmptySubjectLessonProgress = (totalLessons = 0): UserSubjectLessonProgress => ({
  percentage: 0,
  completed: 0,
  completedIds: [],
  total: totalLessons,
});

export const useUserSubjectLessonProgress = () => {
  const [orderBy, setOrderBy] = useState<UserSubjectLessonProgressOrder>(UserSubjectLessonProgressOrder.Progress);
  const { progress, toggleLessonProgress, isLoading: isProgressLoading } = useUserLessonProgress();
  const lessonIds = useMemo<string[]>(
    () => [...progress.lessons].sort(),
    [progress.lessons],
  );
  const { data: subjectsGroupedByLessonIds, isLoading: isSubjectLoading, isError } = trpc.subject.getGroupedByLessonIds.useQuery(
    { lessonIds },
    {
      enabled: lessonIds.length > 0,
      placeholderData: (previousData) => previousData,
    },
  );

  const { subjects, subjectProgressById } = useMemo((): {
    subjects: Subject[];
    subjectProgressById: Record<string, UserSubjectLessonProgress>;
  } => {
    if (!subjectsGroupedByLessonIds || lessonIds.length === 0) {
      return {
        subjects: [],
        subjectProgressById: {},
      };
    }

    const uniqueSubjectsById: Map<string, Subject> = new Map();
    const completedLessonIdsBySubjectId: Record<string, string[]> = {};

    Object.entries(subjectsGroupedByLessonIds).forEach(([lessonId, subjects]) => {
      subjects.forEach((subject) => {
        if (!uniqueSubjectsById.has(subject.id)) {
          uniqueSubjectsById.set(subject.id, subject);
        }

        if (!completedLessonIdsBySubjectId[subject.id]) {
          completedLessonIdsBySubjectId[subject.id] = [];
        }

        completedLessonIdsBySubjectId[subject.id].push(lessonId);
      });
    });

    const subjectProgressById: Record<string, UserSubjectLessonProgress> = {};
    uniqueSubjectsById.forEach((subject, subjectId) => {
      const completedIds: string[] = completedLessonIdsBySubjectId[subjectId] ?? [];
      const totalLessons: number = subject.lessons;
      const completedLessons: number = completedIds.length;

      subjectProgressById[subjectId] = {
        percentage: totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
        completed: completedLessons,
        completedIds: completedIds,
        total: totalLessons,
      };
    });

    return {
      subjects: Array.from(uniqueSubjectsById.values()),
      subjectProgressById,
    };
  }, [lessonIds.length, subjectsGroupedByLessonIds]);

  const sortedSubjects = useMemo((): Subject[] => {
    if (subjects.length === 0) {
      return [];
    }

    return [...subjects].sort((subjectA, subjectB) => {
      if (orderBy === UserSubjectLessonProgressOrder.Progress) {
        const progressA = subjectProgressById[subjectA.id]?.percentage ?? 0;
        const progressB = subjectProgressById[subjectB.id]?.percentage ?? 0;
        if (progressA !== progressB) {
          return progressB - progressA;
        }
      }

      if (orderBy === UserSubjectLessonProgressOrder.Semester) {
        if (subjectA.info.semester.number !== subjectB.info.semester.number) {
          return subjectA.info.semester.number - subjectB.info.semester.number;
        }
      }

      if (orderBy === UserSubjectLessonProgressOrder.Course || orderBy === UserSubjectLessonProgressOrder.Semester) {
        const courseNameA = getCourseName(subjectA);
        const courseNameB = getCourseName(subjectB);
        if (courseNameA !== courseNameB) {
          return courseNameA.localeCompare(courseNameB);
        }
      }

      if (orderBy === UserSubjectLessonProgressOrder.Course) {
        if (subjectA.info.semester.number !== subjectB.info.semester.number) {
          return subjectA.info.semester.number - subjectB.info.semester.number;
        }
      }

      return subjectA.number - subjectB.number;
    });
  }, [orderBy, subjectProgressById, subjects]);

  const getSubjectLessonProgress = useCallback((subjectId: string, totalLessonsFallback = 0): UserSubjectLessonProgress => {
    return subjectProgressById[subjectId] ?? getEmptySubjectLessonProgress(totalLessonsFallback);
  }, [subjectProgressById]);

  return {
    getSubjectLessonProgress,
    subjects: sortedSubjects,
    orderBy,
    setOrderBy,
    toggleLessonProgress,
    isLoading: isProgressLoading || (lessonIds.length > 0 && isSubjectLoading && !subjectsGroupedByLessonIds),
    isError,
  };
};

export default useUserSubjectLessonProgress;
