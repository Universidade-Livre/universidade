import { Subject } from "@/types/course/subject.interface";

export interface SemesterOverview {
  id: string;
  number: number;
}

export interface Semester extends SemesterOverview {
  subjects: Subject[];
}
