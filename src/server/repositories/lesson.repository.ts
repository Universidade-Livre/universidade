import "server-only";

import { prisma } from "@/lib/prisma";
import { LessonModel } from "@/server/models/lesson.model";

export async function getLessonModelById(lessonId: string): Promise<LessonModel | null> {
  return await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { subject: true },
  });
}

export async function getLessonModelsBySubjectId(subjectId: string): Promise<LessonModel[]> {
  return await prisma.lesson.findMany({
    where: { subjectId: subjectId },
    orderBy: { number: "asc" },
    include: { subject: true },
  });
}

export async function getLessonModelsByUserId(userId: string): Promise<Array<Pick<LessonModel, "id">>> {
  return await prisma.lesson.findMany({
    where: {
      progresses: {
        some: { userId: userId },
      },
    },
    orderBy: { number: "asc" },
    select: { id: true },
  });
}
