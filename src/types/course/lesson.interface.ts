import { CourseInfo } from "@/types/course-info/course-info.interface";
import { SemesterInfo } from "@/types/course-info/semester-info.interface";
import { SubjectInfo } from "@/types/course-info/subject-info.interface";

export interface Lesson {
  id: string;
  number: number;
  name: string;
  durationSeconds: number | null;
  embedUrl: string;
  info: {
    course: CourseInfo;
    semester: SemesterInfo;
    subject: SubjectInfo;
  };
}
