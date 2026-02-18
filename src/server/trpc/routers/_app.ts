import { courseRouter } from "@/server/trpc/routers/course";
import { lessonRouter } from "@/server/trpc/routers/lesson";
import { createTRPCRouter } from "@/server/trpc/trpc";

export const appRouter = createTRPCRouter({
  course: courseRouter,
  lesson: lessonRouter,
});

export type AppRouter = typeof appRouter;
