import "server-only";

import { prisma } from "@/lib/prisma";

export const courseInclude = {
  semesters: {
    orderBy: { number: "asc" as const },
    include: {
      subjects: {
        orderBy: { number: "asc" as const },
        include: {
          books: true,
          lessons: {
            select: {
              durationSeconds: true,
            },
          },
          prerequisites: {
            include: {
              prerequisite: true,
            },
          },
        },
      },
    },
  },
};

export async function getCourseModelBySlug(courseSlug: string) {
  return await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: courseInclude,
  });
}
