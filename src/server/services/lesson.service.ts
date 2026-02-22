import "server-only";

import { toLessonFromModel } from "@/server/mappers/lesson.mapper";
import { LessonModel } from "@/server/models/lesson.model";
import {
  getLessonModelsBySubjectId
} from "@/server/repositories/lesson.repository";
import { Lesson } from "@/types/course/lesson.interface";
import { unstable_cache } from "next/cache";

export const getLessonsBySubjectId = unstable_cache(
  async (subjectId: string): Promise<Lesson[]> => {
    const lessons: LessonModel[] = await getLessonModelsBySubjectId(subjectId);
    return lessons.map(toLessonFromModel);
  },
  ["service:lesson:get-by-subject-id"],
  {
    revalidate: false,
    tags: ["lesson"],
  },
);
