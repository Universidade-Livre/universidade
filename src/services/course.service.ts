import "server-only";

import { courseSchema } from "@/schemas/course/course.schema";
import Course from "@/types/course/course.interface";
import { unstable_cache } from "next/cache";
import { Dirent } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const getAllCourseSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const coursesPath: string = path.join(process.cwd(), "src", "data");
    const coursesDir: Dirent<string>[] = await readdir(coursesPath, { withFileTypes: true });
    return coursesDir
      .filter((courseDir) => courseDir.isDirectory())
      .map((courseDir) => courseDir.name);
  },
  ["course-slugs"],
  { revalidate: false },
);

export const getAllCourses = unstable_cache(
  async (): Promise<Course[]> => {
    const courseSlugs: string[] = await getAllCourseSlugs();
    const courses: (Course | undefined)[] = await Promise.all(courseSlugs.map((courseSlug) => getCourse(courseSlug)));
    return courses.filter((course): course is Course => course !== undefined);
  },
  ["courses"],
  { revalidate: false },
);

export const getCourse = unstable_cache(
  async (courseSlug: string): Promise<Course | undefined> => {
    try {
      const coursePath: string = path.join(process.cwd(), "src", "data", courseSlug, "index.json");
      const courseJson: unknown = JSON.parse(await readFile(coursePath, "utf8"));
      const course = courseSchema.safeParse(courseJson);
      if (!course.success) {
        console.error(`Invalid course JSON for "${courseSlug}".`, course.error);
        return undefined;
      }

      return course.data;
    } catch (error) {
      console.error(`Failed to load course "${courseSlug}".`, error);
      return undefined;
    }
  },
  ["course"],
  { revalidate: false },
);
