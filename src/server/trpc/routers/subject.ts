import "server-only";

import { getSubjectsGroupedByLessonIds } from "@/server/services/subject.service";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/trpc";
import { z } from "zod";

const MAX_LESSON_IDS: number = 50;

export const subjectRouter = createTRPCRouter({
  getGroupedByLessonIds: publicProcedure
    .input(
      z.object({
        lessonIds: z.array(z.string().min(1)).max(MAX_LESSON_IDS),
      }),
    )
    .query(async ({ input }) => {
      return getSubjectsGroupedByLessonIds(
        Array.from(new Set(input.lessonIds)).sort(),
      );
    }),
});
