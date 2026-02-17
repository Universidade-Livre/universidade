import { CourseOverview } from "@/types/course/course.interface";
import { SemesterOverview } from "@/types/course/semester.interface";
import { SubjectOverview } from "@/types/course/subject.interface";
import { UserSubjectProgress } from "@/types/user-progress/user-subject-progress.interface";

export interface UserActiveSubject {
  course: CourseOverview;
  semester: SemesterOverview;
  subject: SubjectOverview;
  subjectProgress: UserSubjectProgress;
}
