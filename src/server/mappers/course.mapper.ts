import "server-only";

import { toSemesterFromModel } from "@/server/mappers/semester.mapper";
import { CourseModel } from "@/server/models/course.model";
import { Course } from "@/types/course/course.interface";

export function toCourseFromModel(course: CourseModel): Course {
  return {
    id: course.id,
    slug: course.slug,
    name: course.name,
    alternativeName: course.alternativeName,
    semesters: course.semesters.map(toSemesterFromModel),
  };
}
