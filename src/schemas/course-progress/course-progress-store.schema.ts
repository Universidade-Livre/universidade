import type CourseProgressStore from "@/types/course-progress/course-progress-store.interface";
import { z } from "zod";

export const courseProgressStoreSchema: z.ZodType<CourseProgressStore> = z.record(
  z.string().min(1),
  z.record(
    z.string().regex(/^\d+$/),
    z.record(
      z.string().regex(/^\d+$/),
      z.array(z.number().int().nonnegative()),
    ),
  ),
);
