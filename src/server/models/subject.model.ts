import "server-only";

import type { CourseModel } from "@/server/models/course.model";
import type { LessonModel } from "@/server/models/lesson.model";
import type { SemesterModel } from "@/server/models/semester.model";
import type { SubjectBookModel } from "@/server/models/subject-book.model";

export interface SubjectModel {
  id: string;
  name: string;
  number: number;
  lessons: Array<Pick<LessonModel, "id" | "durationSeconds">>;
  books: SubjectBookModel[];
  prerequisites: Array<{ prerequisite: Pick<SubjectModel, "id" | "name" | "number"> }>;
  semester?: Pick<SemesterModel, "id" | "number"> & {
    course: Pick<CourseModel, "slug" | "name" | "alternativeName">;
  };
}
