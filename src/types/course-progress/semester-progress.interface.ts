import SubjectProgress from "@/types/course-progress/subject-progress.interface";

export default interface SemesterProgress {
  number: number;
  subjects: SubjectProgress[];
}
