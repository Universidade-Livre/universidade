import "server-only";

import { prisma } from "@/lib/prisma";
import { SubjectModel } from "@/server/models/subject.model";

export async function getSubjectModelsByLessonIds(lessonIds: string[]): Promise<SubjectModel[]> {
  if (lessonIds.length === 0) {
    return [];
  }

  return await prisma.subject.findMany({
    where: {
      lessons: {
        some: { id: { in: lessonIds } },
      },
    },
    orderBy: { number: "asc" },
    include: {
      lessons: {
        where: { id: { in: lessonIds } },
        select: {
          id: true,
          durationSeconds: true,
        },
        orderBy: { number: "asc" },
      },
      books: true,
      prerequisites: {
        include: {
          prerequisite: true,
        },
      },
      semester: {
        select: {
          id: true,
          number: true,
          course: {
            select: {
              slug: true,
              name: true,
              alternativeName: true,
            },
          },
        },
      },
    },
  });
}
