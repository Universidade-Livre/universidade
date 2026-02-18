import "server-only";

import { toCourseFromInclude } from "@/server/mappers/course.mapper";
import { getCourseModelBySlug } from "@/server/repositories/course.repository";
import { Course } from "@/types/course/course.interface";
import { unstable_cache } from "next/cache";

export const getCourseBySlug = unstable_cache(
  async (courseSlug: string): Promise<Course | null> => {
    const course = await getCourseModelBySlug(courseSlug);
    return course && toCourseFromInclude(course);
  },
  ["service:course:by-slug"],
  {
    revalidate: false,
    tags: ["course"],
  },
);
