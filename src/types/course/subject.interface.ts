import { CourseInfo } from "@/types/course-info/course-info.interface";
import { SemesterInfo } from "@/types/course-info/semester-info.interface";
import { SubjectBook } from "@/types/course/subject-book.interface";

export interface Subject {
  id: string;
  name: string;
  number: number;
  lessons: number;
  lessonsDurationSeconds: number;
  books: SubjectBook[];
  prerequisites: Array<Pick<Subject, "id" | "name" | "number">>;
  info: {
    course: CourseInfo;
    semester: SemesterInfo;
  };
}
