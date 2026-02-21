import "server-only";

import { toSubjectBookFromModel } from "@/server/mappers/subject-book.mapper";
import { SubjectModel } from "@/server/models/subject.model";
import { Subject } from "@/types/course/subject.interface";

export function toSubjectFromModel(subject: SubjectModel): Subject {
  const prerequisiteById = new Map<string, Pick<Subject, "id" | "name" | "number">>();
  subject.dependents.forEach((relation) => {
    const prerequisite = relation.prerequisite;
    if (!prerequisite?.id || prerequisite.id === subject.id) {
      return;
    }

    prerequisiteById.set(prerequisite.id, {
      id: prerequisite.id,
      name: prerequisite.name,
      number: prerequisite.number,
    });
  });

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
    prerequisites: Array.from(prerequisiteById.values()),
    info: {
      course: subject.semester.course,
      semester: {
        id: subject.semester.id,
        number: subject.semester.number,
      },
    },
  };
}
