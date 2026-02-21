import "server-only";

import { courseRouter } from "@/server/trpc/routers/course";
import { lessonRouter } from "@/server/trpc/routers/lesson";
import { subjectRouter } from "@/server/trpc/routers/subject";
import { userLessonProgressRouter } from "@/server/trpc/routers/user-lesson-progress";
import { createTRPCRouter } from "@/server/trpc/trpc";

export const appRouter = createTRPCRouter({
  course: courseRouter,
  lesson: lessonRouter,
  subject: subjectRouter,
  userProgress: userLessonProgressRouter,
});

export type AppRouter = typeof appRouter;
