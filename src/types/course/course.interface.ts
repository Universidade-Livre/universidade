import Semester from "@/types/course/semester.interface";

export default interface Course {
  id: number;
  slug: string;
  name: string;
  alternativeName: string;
  semesters: Semester[];
}
