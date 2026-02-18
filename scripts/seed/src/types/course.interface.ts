import type Semester from "@/types/semester.interface";

export default interface Course {
  slug: string;
  name: string;
  alternativeName?: string;
  semesters: Semester[];
}
