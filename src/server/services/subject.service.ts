import "server-only";

import { toSubjectFromModel } from "@/server/mappers/subject.mapper";
import { SubjectModel } from "@/server/models/subject.model";
import { getSubjectModelsByLessonIds } from "@/server/repositories/subject.repository";
import { Subject } from "@/types/course/subject.interface";

type SubjectModelWithSemester = SubjectModel & {
  semester: NonNullable<SubjectModel["semester"]>;
};

function hasSemesterInfo(subject: SubjectModel): subject is SubjectModelWithSemester {
  return !!subject.semester;
}

export async function getSubjectsByLessonIds(lessonIds: string[]): Promise<Subject[]> {
  if (lessonIds.length === 0) {
    return [];
  }

  const subjects = await getSubjectModelsByLessonIds(Array.from(new Set(lessonIds)));
  return subjects
    .filter(hasSemesterInfo)
    .map((subject) =>
      toSubjectFromModel(subject, {
        course: subject.semester.course,
        semester: {
          id: subject.semester.id,
          number: subject.semester.number,
        },
      }),
    );
}
