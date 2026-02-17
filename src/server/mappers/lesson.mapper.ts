import "server-only";

import { lessonInclude } from "@/server/repositories/lesson.repository";
import { Lesson } from "@/types/course/lesson.interface";
import { Prisma } from "@prisma/client";

export function toLessonFromPayload(lesson: Prisma.LessonGetPayload<{ include: typeof lessonInclude }>): Lesson {
  return {
    id: lesson.id,
    number: lesson.number,
    name: lesson.name,
    durationSeconds: lesson.durationSeconds,
    embedUrl: lesson.embedUrl,
  };
}
