import { CourseInfo } from "@/types/course-info/course-info.interface";
import { Subject } from "@/types/course/subject.interface";

export interface Semester {
  id: string;
  number: number;
  subjects: Subject[];
  info: {
    course: CourseInfo;
  };
}
