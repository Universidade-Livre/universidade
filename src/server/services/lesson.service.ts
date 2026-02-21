import "server-only";

import { toLessonFromModel } from "@/server/mappers/lesson.mapper";
import { LessonModel } from "@/server/models/lesson.model";
import {
  getLessonModelById,
  getLessonModelsBySubjectId,
} from "@/server/repositories/lesson.repository";
import { Lesson } from "@/types/course/lesson.interface";
import { unstable_cache } from "next/cache";

export const getLessonById = unstable_cache(
  async (lessonId: string): Promise<Lesson | null> => {
    const lesson: LessonModel | null = await getLessonModelById(lessonId);
    return lesson && toLessonFromModel(lesson);
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
    return lessons.map(toLessonFromModel);
  },
  ["service:lesson:by-subject-id"],
  {
    revalidate: false,
    tags: ["lesson"],
  },
);
