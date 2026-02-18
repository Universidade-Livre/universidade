import "server-only";

import { toLessonFromPayload } from "@/server/mappers/lesson.mapper";
import { getLessonModelById, getLessonModelsBySubjectId } from "@/server/repositories/lesson.repository";
import { Lesson } from "@/types/course/lesson.interface";

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
  const lesson = await getLessonModelById(lessonId);
  return lesson && toLessonFromPayload(lesson);
}

export async function getLessonsBySubjectId(subjectId: string): Promise<Lesson[]> {
  const lessons = await getLessonModelsBySubjectId(subjectId);
  return lessons.map(toLessonFromPayload);
}
