import "server-only";

import { toUserLessonProgressFromLessonModels } from "@/server/mappers/user-lesson-progress.mapper";
import { LessonModel } from "@/server/models/lesson.model";
import { getLessonModelsByUserId } from "@/server/repositories/lesson.repository";
import { toggleUserLessonProgressModelByUserIdAndLessonId } from "@/server/repositories/user-lesson-progress.repository";
import { UserLessonProgress } from "@/types/user-progress/user-lesson-progress.interface";

export async function getUserProgressByUserId(userId: string): Promise<UserLessonProgress> {
  const lessons: Pick<LessonModel, "id">[] = await getLessonModelsByUserId(userId);
  return toUserLessonProgressFromLessonModels(lessons);
}

export async function toggleLessonProgressByUserIdAndLessonId(userId: string, lessonId: string): Promise<void> {
  await toggleUserLessonProgressModelByUserIdAndLessonId(userId, lessonId);
}
