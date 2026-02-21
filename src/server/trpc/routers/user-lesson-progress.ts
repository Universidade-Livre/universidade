import "server-only";

import {
  getUserProgressByUserId,
  toggleLessonProgressByUserIdAndLessonId as toggleUserLessonProgressByUserIdAndLessonId,
} from "@/server/services/user-progress.service";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc/trpc";
import z from "zod";

export const userLessonProgressRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return getUserProgressByUserId(ctx.session.user.id);
  }),
  toggleLessonProgress: protectedProcedure
    .input(z.object({ lessonId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await toggleUserLessonProgressByUserIdAndLessonId(
        ctx.session.user.id,
        input.lessonId,
      );
    }),
});
