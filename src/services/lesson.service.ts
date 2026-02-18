import "server-only";

import { lessonArraySchema } from "@/schemas/course/lesson.schema";
import Lesson from "@/types/course/lesson.interface";
import { unstable_cache } from "next/cache";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const getLessons = unstable_cache(
  async (courseSlug: string, semesterNumber: number, subjectNumber: number): Promise<Lesson[] | undefined> => {
    try {
      const subjectPath: string = path.join(process.cwd(), "src", "data", courseSlug, "semesters", String(semesterNumber), `${subjectNumber}.json`);
      const lessonsJson: unknown = JSON.parse(await readFile(subjectPath, "utf8"));
      const lessons = lessonArraySchema.safeParse(lessonsJson);
      if (!lessons.success) {
        console.error(`Invalid lessons JSON for "${courseSlug}" (semester ${semesterNumber}, subject ${subjectNumber}).`, lessons.error);
        return undefined;
      }

      return lessons.data;
    } catch (error) {
      console.error(`Failed to load lessons for "${courseSlug}" (semester ${semesterNumber}, subject ${subjectNumber}).`, error);
      return undefined;
    }
  },
  ["lessons"],
  { revalidate: false },
);
