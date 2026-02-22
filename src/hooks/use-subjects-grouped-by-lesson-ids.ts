"use client";

import { trpc } from "@/lib/trpc";
import { Subject } from "@/types/course/subject.interface";
import { useMemo } from "react";

const MAX_LESSON_IDS: number = 50;

export const useSubjectsGroupedByLessonIds = (lessonIds: string[]) => {
  const uniqueLessonIds = useMemo<string[]>(
    () => Array.from(new Set(lessonIds)),
    [lessonIds],
  );

  const uniqueLessonIdChunks = useMemo<string[][]>(() => {
    if (!uniqueLessonIds.length) {
      return [];
    }

    return Array.from(
      { length: Math.ceil(uniqueLessonIds.length / MAX_LESSON_IDS) },
      (_, index) =>
        uniqueLessonIds.slice(
          index * MAX_LESSON_IDS,
          index * MAX_LESSON_IDS + MAX_LESSON_IDS,
        ),
    );
  }, [uniqueLessonIds]);

  const subjectQueries = trpc.useQueries((t) =>
    uniqueLessonIdChunks.map((uniqueLessonIdChunk) =>
      t.subject.getGroupedByLessonIds({ lessonIds: uniqueLessonIdChunk }),
    ),
  );

  const subjectsGroupedByLessonIds = useMemo<Array<[lessonIds: string[], subject: Subject]>>(() => {
    const result = new Map<string, { lessonIds: Set<string>; subject: Subject }>();
    for (const subjectQuery of subjectQueries) {
      for (const [lessonIds, subject] of subjectQuery.data ?? []) {
        const subjectGroupedByLessonIds = result.get(subject.id);
        if (subjectGroupedByLessonIds) {
          lessonIds.forEach((id) => subjectGroupedByLessonIds.lessonIds.add(id));
        } else {
          result.set(subject.id, { lessonIds: new Set(lessonIds), subject });
        }
      }
    }

    return Array.from(result.values(), ({ lessonIds, subject }) => [
      [...lessonIds],
      subject,
    ]);
  }, [subjectQueries]);

  return {
    subjectsGroupedByLessonIds,
    isLoading: subjectQueries.some((query) => query.isLoading),
    isError: subjectQueries.some((query) => query.isError),
  };
};

export default useSubjectsGroupedByLessonIds;
