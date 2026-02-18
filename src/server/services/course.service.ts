import "server-only";

import { toCourseFromPayload } from "@/server/mappers/course.mapper";
import { getAllCourseModels, getCourseModelBySlug } from "@/server/repositories/course.repository";
import { Course } from "@/types/course/course.interface";

export async function getAllCourses(): Promise<Course[]> {
  const courses = await getAllCourseModels();
  return courses.map(toCourseFromPayload);
}

export async function getCourseBySlug(courseSlug: string): Promise<Course | null> {
  const course = await getCourseModelBySlug(courseSlug);
  return course && toCourseFromPayload(course);
}
