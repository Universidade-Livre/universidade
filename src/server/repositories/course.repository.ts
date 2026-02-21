import "server-only";

import { prisma } from "@/lib/prisma";
import { CourseModel } from "@/server/models/course.model";

export async function getCourseModelBySlug(courseSlug: string): Promise<CourseModel | null> {
  return await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      semesters: {
        orderBy: { number: "asc" },
        include: {
          subjects: {
            orderBy: { number: "asc" },
            include: {
              books: true,
              lessons: {
                select: {
                  id: true,
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
    },
  });
}
