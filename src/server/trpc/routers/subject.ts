import "server-only";

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/trpc";
import { getSubjectsByLessonIds } from "@/server/services/subject.service";

export const subjectRouter = createTRPCRouter({
  getByLessonIds: publicProcedure
    .input(
      z.object({
        lessonIds: z.array(z.string().min(1)),
      }),
    )
    .query(async ({ input }) => {
      return getSubjectsByLessonIds(input.lessonIds);
    }),
});
