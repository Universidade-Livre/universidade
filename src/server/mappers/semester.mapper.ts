import "server-only";

import { toSubjectFromModel } from "@/server/mappers/subject.mapper";
import { SemesterModel } from "@/server/models/semester.model";
import { CourseInfo } from "@/types/course-info/course-info.interface";
import { Semester } from "@/types/course/semester.interface";

export function toSemesterFromModel(semester: SemesterModel): Semester {
  const courseInfo: CourseInfo = {
    slug: semester.course.slug,
    name: semester.course.name,
    alternativeName: semester.course.alternativeName,
  };

  return {
    id: semester.id,
    number: semester.number,
    subjects: semester.subjects.map((subject) =>
      toSubjectFromModel(subject, {
        course: courseInfo,
        semester: {
          id: semester.id,
          number: semester.number,
        },
      }),
    ),
    info: {
      course: courseInfo,
    },
  };
}
