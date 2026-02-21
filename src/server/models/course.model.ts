import "server-only";

import type { SemesterModel } from "@/server/models/semester.model";

export interface CourseModel {
  id: string;
  slug: string;
  name: string;
  alternativeName: string | null;
  semesters: SemesterModel[];
}
