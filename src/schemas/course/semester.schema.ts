import { subjectSchema } from "@/schemas/course/subject.schema";
import type Semester from "@/types/course/semester.interface";
import { z } from "zod";

export const semesterSchema: z.ZodType<Semester> = z.object({
  id: z.number().int().positive(),
  number: z.number().int().positive(),
  subjects: z.array(subjectSchema),
});
