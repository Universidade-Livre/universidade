import "server-only";

import { prisma } from "@/lib/prisma";

export const lessonInclude = {
  subject: true,
};

export async function getLessonModelById(lessonId: string) {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: lessonInclude,
  });
}

export async function getLessonModelsBySubjectId(subjectId: string) {
  return prisma.lesson.findMany({
    where: { subjectId: subjectId },
    orderBy: { number: "asc" },
    include: lessonInclude,
  });
}
