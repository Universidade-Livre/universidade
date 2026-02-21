import { Subject } from "@/types/course/subject.interface";

export interface Semester {
  id: string;
  number: number;
  subjects: Subject[];
}
