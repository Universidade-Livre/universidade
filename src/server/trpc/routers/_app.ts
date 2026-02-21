import "server-only";

import { subjectRouter } from "@/server/trpc/routers/subject";
import { userLessonProgressRouter } from "@/server/trpc/routers/user-lesson-progress";
import { createTRPCRouter } from "@/server/trpc/trpc";

export const appRouter = createTRPCRouter({
  subject: subjectRouter,
  userProgress: userLessonProgressRouter,
});

export type AppRouter = typeof appRouter;
