import type SubjectBook from "@/types/subject-book.interface";

export default interface Subject {
  number: number;
  name: string;
  url: string;
  prerequisites: string[];
  books: SubjectBook[];
}
