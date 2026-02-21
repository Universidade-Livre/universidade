import { SubjectBook } from "@/types/course/subject-book.interface";

export interface Subject {
  id: string;
  name: string;
  number: number;
  lessons: number;
  lessonsDurationSeconds: number;
  books: SubjectBook[];
  prerequisites: Array<Pick<Subject, "id" | "name" | "number">>;
}
