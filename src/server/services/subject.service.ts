import "server-only";

import { toSubjectFromModel } from "@/server/mappers/subject.mapper";
import { getSubjectModelsByLessonIds } from "@/server/repositories/subject.repository";
import { Subject } from "@/types/course/subject.interface";
import { SubjectModel } from "@/server/models/subject.model";

export async function getSubjectsGroupedByLessonIds(lessonIds: string[]): Promise<
  {
    courseName: string;
    semesterNumber: number;
    lessonIds: string[];
    subject: Subject;
  }[]
> {
  if (lessonIds.length === 0) {
    return [];
  }

  const uniqueLessonIds: string[] = Array.from(new Set(lessonIds));
  const subjects: SubjectModel[] = await getSubjectModelsByLessonIds(uniqueLessonIds);
  return subjects.map((subject) => {
    const subjectLessonIds: string[] = uniqueLessonIds.filter((lessonId) =>
      subject.lessons.some((lesson) => lesson.id === lessonId),
    );

    return subjectLessonIds.length
      ? {
        
      }
      : null;
  });
}
