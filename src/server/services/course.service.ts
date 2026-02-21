import "server-only";

import { toCourseFromModel } from "@/server/mappers/course.mapper";
import { CourseModel } from "@/server/models/course.model";
import { getCourseModelBySlug } from "@/server/repositories/course.repository";
import { Course } from "@/types/course/course.interface";

export async function getCourseBySlug(courseSlug: string): Promise<Course | null> {
  const course: CourseModel | null = await getCourseModelBySlug(courseSlug);
  return course && toCourseFromModel(course);
}
