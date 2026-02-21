import "server-only";

import { toSubjectFromModel } from "@/server/mappers/subject.mapper";
import { getSubjectModelsByLessonIds } from "@/server/repositories/subject.repository";
import { Subject } from "@/types/course/subject.interface";
import { SubjectModel } from "@/server/models/subject.model";

export async function getSubjectsByLessonIds(lessonIds: string[]): Promise<Subject[]> {
  if (lessonIds.length === 0) {
    return [];
  }

  const subjects: SubjectModel[] = await getSubjectModelsByLessonIds(Array.from(new Set(lessonIds)));
  return subjects.map(toSubjectFromModel);
}
