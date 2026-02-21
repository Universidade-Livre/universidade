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

  const subjects = semester.subjects.map((subject) =>
    toSubjectFromModel({
      ...subject,
      semester: {
        id: semester.id,
        number: semester.number,
        course: courseInfo,
      },
    }),
  );

  return {
    id: semester.id,
    number: semester.number,
    subjects,
    subjectsDurationSeconds: subjects.reduce(
      (accumulator, subject) => accumulator + subject.lessonsDurationSeconds,
      0,
    ),
    info: {
      course: courseInfo,
    },
  };
}
