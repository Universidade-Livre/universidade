import { Semester } from "@/types/course/semester.interface";

export interface CourseOverview {
  id: string;
  slug: string;
  name: string;
  alternativeName: string | null;
}

export interface Course extends CourseOverview {
  semesters: Semester[];
}
