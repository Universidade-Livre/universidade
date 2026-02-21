import "server-only";

import { toSubjectFromModel } from "@/server/mappers/subject.mapper";
import { SemesterModel } from "@/server/models/semester.model";
import { Semester } from "@/types/course/semester.interface";

export function toSemesterFromModel(semester: SemesterModel): Semester {
  return {
    id: semester.id,
    number: semester.number,
    subjects: semester.subjects.map(toSubjectFromModel),
  };
}
