import "server-only";

import { LessonModel } from "@/server/models/lesson.model";
import { Lesson } from "@/types/course/lesson.interface";

export function toLessonFromModel(lesson: LessonModel): Lesson {
  return {
    id: lesson.id,
    number: lesson.number,
    name: lesson.name,
    durationSeconds: lesson.durationSeconds,
    embedUrl: lesson.embedUrl,
    info: {
      course: lesson.subject.semester.course,
      semester: {
        id: lesson.subject.semester.id,
        number: lesson.subject.semester.number,
      },
      subject: {
        id: lesson.subject.id,
        number: lesson.subject.number,
        name: lesson.subject.name,
      },
    },
  };
}
