import "server-only";

import { LessonModel } from "@/server/models/lesson.model";
import { Lesson } from "@/types/course/lesson.interface";

export function toLessonFromModel(lesson: LessonModel): Lesson {
  return {
    id: lesson.id,
    number: lesson.number,
    name: lesson.name,
    durationSeconds: lesson.durationSeconds,
    embedUrl: lesson.embedUrl,
  };
}
