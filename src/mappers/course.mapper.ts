import { toSemesterProgress } from "@/mappers/semester.mapper";
import { toSubjectProgress } from "@/mappers/subject.mapper";
import CourseProgressStore from "@/types/course-progress/course-progress-store.interface";
import CourseProgress from "@/types/course-progress/course-progress.interface";
import SubjectProgress from "@/types/course-progress/subject-progress.interface";
import Course from "@/types/course/course.interface";

export function toCourseProgress(
  course: Course,
  progressStore: CourseProgressStore,
): CourseProgress {
  const courseProgress = progressStore?.[course.slug] ?? {};
  return {
    slug: course.slug,
    semesters: course.semesters.map((semester) => {
      const semesterProgress = courseProgress?.[semester.number] ?? {};
      return toSemesterProgress(semester, semesterProgress);
    }),
  };
}

export function toCourseProgressFromSubjectParams(
  courseSlug: string,
  semesterNumber: number,
  subjectNumber: number,
  totalLessons: number,
  progressStore: CourseProgressStore,
): CourseProgress {
  const completedLessons: number[] = progressStore?.[courseSlug]?.[semesterNumber]?.[subjectNumber] ?? [];
  const subjectProgress: SubjectProgress = toSubjectProgress(
    { number: subjectNumber, lessons: totalLessons },
    completedLessons,
  );

  return {
    slug: courseSlug,
    semesters: [
      {
        number: semesterNumber,
        subjects: [subjectProgress],
      },
    ],
  };
}
