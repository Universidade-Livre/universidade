export type CourseSlug = string;
export type LessonNumber = number;
export type SubjectNumber = number;
export type SemesterNumber = number;

export default interface CourseProgressStore {
  [courseSlug: CourseSlug]: {
    [semesterNumber: SemesterNumber]: {
      [subjectNumber: SubjectNumber]: LessonNumber[];
    };
  };
}
