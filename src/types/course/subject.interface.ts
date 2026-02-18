import { SubjectBook } from "@/types/course/subject-book.interface";

export interface SubjectOverview {
  id: string;
  name: string;
  number: number;
}

export interface Subject extends SubjectOverview {
  lessons: number;
  lessonsDurationSeconds: number;
  books: SubjectBook[];
  prerequisites: SubjectOverview[];
}
