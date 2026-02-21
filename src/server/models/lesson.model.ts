import "server-only";

import type { CourseModel } from "@/server/models/course.model";
import type { SemesterModel } from "@/server/models/semester.model";
import type { SubjectModel } from "@/server/models/subject.model";

export interface LessonModel {
  id: string;
  number: number;
  name: string;
  durationSeconds: number | null;
  embedUrl: string;
  subject: Pick<SubjectModel, "id" | "number"> & {
    semester: Pick<SemesterModel, "id" | "number"> & {
      course: Pick<CourseModel, "slug" | "name" | "alternativeName">;
    };
  };
}
