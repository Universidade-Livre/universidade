import "server-only";

import {
  getLessonById,
  getLessonsBySubjectId,
} from "@/server/services/lesson.service";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/trpc";
import { Lesson } from "@/types/course/lesson.interface";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const lessonRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        lessonId: z.string(),
      }),
    )
    .query(async ({ input: { lessonId } }): Promise<Lesson> => {
      const lesson: Lesson | null = await getLessonById(lessonId);
      if (!lesson) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Aula não encontrada.",
        });
      }

      return lesson;
    }),
  getBySubjectId: publicProcedure
    .input(
      z.object({
        subjectId: z.string(),
      }),
    )
    .query(async ({ input: { subjectId } }): Promise<Lesson[]> => {
      const lessons: Lesson[] = await getLessonsBySubjectId(subjectId);
      if (!lessons) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Aulas não encontradas.",
        });
      }

      return lessons;
    }),
});
