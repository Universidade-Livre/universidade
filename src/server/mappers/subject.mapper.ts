import "server-only";

import { toSubjectBookFromModel } from "@/server/mappers/subject-book.mapper";
import { SubjectModel } from "@/server/models/subject.model";
import { Subject } from "@/types/course/subject.interface";

export function toSubjectFromModel(subject: SubjectModel): Subject {
  return {
    id: subject.id,
    name: subject.name,
    number: subject.number,
    lessons: subject.lessons.length,
    lessonsDurationSeconds: subject.lessons.reduce(
      (acc, lesson) => acc + (lesson.durationSeconds ?? 0),
      0,
    ),
    books: subject.books.map(toSubjectBookFromModel),
    prerequisites: subject.prerequisites.map((p) => ({
      id: p.prerequisite.id,
      name: p.prerequisite.name,
      number: p.prerequisite.number,
    })),
  };
}
