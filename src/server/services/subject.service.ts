import "server-only";

import { toSubjectFromModel } from "@/server/mappers/subject.mapper";
import { getSubjectModelsByLessonIds } from "@/server/repositories/subject.repository";
import { Subject } from "@/types/course/subject.interface";

export type SubjectsByLessonId = Record<string, Subject[]>;

export async function getSubjectsGroupedByLessonIds(lessonIds: string[]): Promise<SubjectsByLessonId> {
  if (lessonIds.length === 0) {
    return {};
  }

  const uniqueLessonIds: string[] = Array.from(new Set(lessonIds));
  const lessonIdSet: Set<string> = new Set(uniqueLessonIds);
  const groupedSubjects: SubjectsByLessonId = Object.fromEntries(
    uniqueLessonIds.map((lessonId) => [lessonId, [] as Subject[]]),
  );

  const subjects = await getSubjectModelsByLessonIds(uniqueLessonIds);
  subjects.forEach((subject) => {
    if (!subject.semester) {
      return;
    }

    const mappedSubject: Subject = toSubjectFromModel(subject);
    subject.lessons.forEach((lesson) => {
      if (!lessonIdSet.has(lesson.id)) {
        return;
      }

      groupedSubjects[lesson.id].push(mappedSubject);
    });
  });

  return groupedSubjects;
}
