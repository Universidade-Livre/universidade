import "server-only";

import { toLessonFromInclude } from "@/server/mappers/lesson.mapper";
import { getLessonModelById, getLessonModelsBySubjectId } from "@/server/repositories/lesson.repository";
import { Lesson } from "@/types/course/lesson.interface";
import { unstable_cache } from "next/cache";

export const getLessonById = unstable_cache(
  async (lessonId: string): Promise<Lesson | null> => {
    const lesson = await getLessonModelById(lessonId);
    return lesson && toLessonFromInclude(lesson);
  },
  ["service:lesson:by-id"],
  {
    revalidate: false,
    tags: ["lesson"],
  },
);

export const getLessonsBySubjectId = unstable_cache(
  async (subjectId: string): Promise<Lesson[]> => {
    const lessons = await getLessonModelsBySubjectId(subjectId);
    return lessons.map(toLessonFromInclude);
  },
  ["service:lesson:by-subject-id"],
  {
    revalidate: false,
    tags: ["lesson"],
  },
);
