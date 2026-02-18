import Subject from "@/types/course/subject.interface";

export default interface Semester {
  id: number;
  number: number;
  subjects: Subject[];
}
