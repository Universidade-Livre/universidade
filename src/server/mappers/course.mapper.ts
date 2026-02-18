import "server-only";

import { courseInclude } from "@/server/repositories/course.repository";
import { Course } from "@/types/course/course.interface";
import { Prisma } from "@prisma/client";

export function toCourseFromInclude(course: Prisma.CourseGetPayload<{ include: typeof courseInclude }>): Course {
  return {
    id: course.id,
    slug: course.slug,
    name: course.name,
    alternativeName: course.alternativeName,
    semesters: course.semesters.map((semester) => ({
      id: semester.id,
      number: semester.number,
      subjects: semester.subjects.map((subject) => ({
        id: subject.id,
        number: subject.number,
        name: subject.name,
        lessons: subject.lessons.length,
        lessonsDurationSeconds: subject.lessons.reduce(
          (acc, lesson) => acc + (lesson.durationSeconds ?? 0),
          0,
        ),
        books: subject.books.map((book) => ({
          id: book.id,
          name: book.name,
          url: book.url,
        })),
        prerequisites: subject.prerequisites.map((prerequisite) => ({
          id: prerequisite.prerequisite.id,
          name: prerequisite.prerequisite.name,
          number: prerequisite.prerequisite.number,
        })),
      })),
    })),
  };
}
