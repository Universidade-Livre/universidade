import type Lesson from "@/types/course/lesson.interface";
import { z } from "zod";

export const lessonSchema: z.ZodType<Lesson> = z.object({
  id: z.number().int().positive(),
  number: z.number().int().positive(),
  name: z.string().min(1),
  duration: z.number().nonnegative().optional(),
  embedUrl: z.string().min(1),
});

export const lessonArraySchema: z.ZodType<Lesson[]> = z.array(lessonSchema);
