import LessonProgress from "@/types/course-progress/lesson-progress.interface";

export default interface SubjectProgress {
  number: number;
  progress: number;
  lessons: LessonProgress[];
}
