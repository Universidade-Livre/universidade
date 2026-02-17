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

export async function getAllCourseModels() {
  return prisma.course.findMany({
    orderBy: { name: "asc" },
    include: courseInclude,
  });
}

export async function getCourseModelBySlug(courseSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: courseInclude,
  });

  if (!course) {
    return null;
  }

  return course;
}
