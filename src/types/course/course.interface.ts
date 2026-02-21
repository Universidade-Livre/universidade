import { Semester } from "@/types/course/semester.interface";

export interface Course {
  id: string;
  slug: string;
  name: string;
  alternativeName: string | null;
  semesters: Semester[];
}
