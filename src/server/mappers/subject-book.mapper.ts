import "server-only";

import { SubjectBookModel } from "@/server/models/subject-book.model";
import { SubjectBook } from "@/types/course/subject-book.interface";

export function toSubjectBookFromModel(book: SubjectBookModel): SubjectBook {
  return {
    id: book.id,
    name: book.name,
    url: book.url,
  };
}
