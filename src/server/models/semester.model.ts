import "server-only";

import type { CourseModel } from "@/server/models/course.model";
import type { SubjectModel } from "@/server/models/subject.model";

export interface SemesterModel {
  id: string;
  number: number;
  course: Pick<CourseModel, "slug" | "name" | "alternativeName">;
  subjects: SubjectModel[];
}
