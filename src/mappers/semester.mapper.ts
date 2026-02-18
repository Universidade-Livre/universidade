import SemesterProgress from "@/types/course-progress/semester-progress.interface";
import Semester from "@/types/course/semester.interface";
import { toSubjectProgress } from "@/mappers/subject.mapper";

export function toSemesterProgress(
  semester: Semester,
  semesterProgressStore: { [subjectNumber: number]: number[] } = {},
): SemesterProgress {
  return {
    number: semester.number,
    subjects: semester.subjects.map((subject) => {
      const subjectProgress = semesterProgressStore?.[subject.number] ?? [];
      return toSubjectProgress(subject, subjectProgress);
    }),
  };
}
