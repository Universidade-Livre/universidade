import type { Semester } from "@/types/semester.interface";

export interface Course {
  slug: string;
  name: string;
  alternativeName?: string;
  semesters: Semester[];
}
