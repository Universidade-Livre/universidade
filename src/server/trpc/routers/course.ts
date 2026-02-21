import "server-only";

import { getCourseBySlug } from "@/server/services/course.service";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/trpc";
import { Course } from "@/types/course/course.interface";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const courseRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ courseSlug: z.string().min(1) }))
    .query(async ({ input: { courseSlug } }): Promise<Course> => {
      const course: Course | null = await getCourseBySlug(courseSlug);
      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Curso não encontrado.",
        });
      }

      return course;
    }),
});
