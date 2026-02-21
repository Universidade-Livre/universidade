import "server-only";

import { LessonModel } from "@/server/models/lesson.model";
import { SubjectBookModel } from "@/server/models/subject-book.model";

export interface SubjectModel {
  id: string;
  name: string;
  number: number;
  lessons: Array<Pick<LessonModel, "id" | "durationSeconds">>;
  books: SubjectBookModel[];
  prerequisites: Array<{ prerequisite: Pick<SubjectModel, "id" | "name" | "number"> }>;
}
