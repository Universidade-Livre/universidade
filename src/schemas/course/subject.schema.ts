import type Subject from "@/types/course/subject.interface";
import { z } from "zod";

export const subjectBookSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

export const subjectSchema: z.ZodType<Subject> = z.object({
  id: z.number().int().positive(),
  number: z.number().int().positive(),
  name: z.string().min(1),
  prerequisites: z.array(z.string()),
  url: z.string().min(1),
  duration: z.number().nonnegative().optional(),
  lessons: z.number().int().nonnegative(),
  books: z.array(subjectBookSchema),
});
