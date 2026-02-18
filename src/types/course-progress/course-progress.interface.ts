import SemesterProgress from "@/types/course-progress/semester-progress.interface";

export default interface CourseProgress {
  slug: string;
  semesters: SemesterProgress[];
}
