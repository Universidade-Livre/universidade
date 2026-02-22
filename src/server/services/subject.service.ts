import "server-only";

import { toSubjectFromModel } from "@/server/mappers/subject.mapper";
import { getSubjectModelsByLessonIds } from "@/server/repositories/subject.repository";
import { SubjectModel } from "@/server/models/subject.model";
import { Subject } from "@/types/course/subject.interface";
import { unstable_cache } from "next/cache";

export const getSubjectsGroupedByLessonIds = unstable_cache(
  async (lessonIds: string[]): Promise<Array<[lessonIds: string[], subject: Subject]>> => {
    if (lessonIds.length === 0) {
      return [];
    }

    const uniqueLessonIds: string[] = Array.from(new Set(lessonIds)).sort();
    const subjects: SubjectModel[] = await getSubjectModelsByLessonIds(uniqueLessonIds);
    return subjects.map((subject) => [
      subject.lessons
        .filter((lesson) => uniqueLessonIds.includes(lesson.id))
        .map((lesson) => lesson.id),
      toSubjectFromModel(subject),
    ]);
  },
  ["service:subject:get-grouped-by-lesson-ids"],
  {
    revalidate: 3600,
    tags: ["subject"],
  },
);
