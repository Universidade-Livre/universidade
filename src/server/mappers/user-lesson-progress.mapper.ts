import "server-only";

import { LessonModel } from "@/server/models/lesson.model";
import { UserLessonProgress } from "@/types/user-progress/user-lesson-progress.interface";

export function toUserLessonProgressFromLessonModels(lessons: Array<Pick<LessonModel, "id">>): UserLessonProgress {
  return { lessons: lessons.map((lesson) => lesson.id) };
}
