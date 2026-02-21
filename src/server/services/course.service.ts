import "server-only";

import { toCourseFromModel } from "@/server/mappers/course.mapper";
import { CourseModel } from "@/server/models/course.model";
import { getCourseModelBySlug } from "@/server/repositories/course.repository";
import { Course } from "@/types/course/course.interface";
import { unstable_cache } from "next/cache";

export const getCourseBySlug = unstable_cache(
  async (courseSlug: string): Promise<Course | null> => {
    const course: CourseModel | null = await getCourseModelBySlug(courseSlug);
    return course && toCourseFromModel(course);
  },
  ["service:course:by-slug"],
  {
    revalidate: false,
    tags: ["course"],
  },
);
