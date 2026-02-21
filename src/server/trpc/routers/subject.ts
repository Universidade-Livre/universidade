import "server-only";

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/trpc";
import { getSubjectsGroupedByLessonIds } from "@/server/services/subject.service";

export const subjectRouter = createTRPCRouter({
  getGroupedByLessonIds: publicProcedure
    .input(
      z.object({
        lessonIds: z.array(z.string().min(1)),
      }),
    )
    .query(async ({ input }) => {
      return getSubjectsGroupedByLessonIds(input.lessonIds);
    }),
});
