import CourseProgress from "@/types/course-progress/course-progress.interface";
import SubjectProgress from "@/types/course-progress/subject-progress.interface";
import SubjectWithProgress from "@/types/course-with-progress/subject-with-progress.interface";
import Course from "@/types/course/course.interface";
import Semester from "@/types/course/semester.interface";
import Subject from "@/types/course/subject.interface";

export function toSubjectProgress(
  subject: Pick<Subject, "number" | "lessons">,
  subjectProgress: number[],
): SubjectProgress {
  return {
    number: subject.number,
    lessons: subjectProgress.map((lessonNumber) => ({ number: lessonNumber })),
    progress: subject.lessons
      ? Math.round((subjectProgress.length / subject.lessons) * 100)
      : 0,
  };
}

export function toSubjectsWithProgress(courses: Course[], coursesProgress: CourseProgress[]): SubjectWithProgress[] {
  const result: SubjectWithProgress[] = [];
  for (const courseProgress of coursesProgress) {
    const course: Course | undefined = courses.find((course) => course.slug === courseProgress.slug);
    if (!course) {
      continue;
    }

    for (const semesterProgress of courseProgress.semesters) {
      const semester: Semester | undefined = course.semesters.find((semester) => semester.number === semesterProgress.number);
      if (!semester) {
        continue;
      }

      for (const subjectProgress of semesterProgress.subjects) {
        if (!subjectProgress.progress) {
          continue;
        }

        const subject: Subject | undefined = semester.subjects.find((subject) => subject.number === subjectProgress.number);
        if (!subject) {
          continue;
        }

        result.push({
          ...subject,
          courseSlug: course.slug,
          courseName: course.name,
          courseAlternativeName: course.alternativeName,
          semesterNumber: semester.number,
          progress: subjectProgress.progress,
        });
      }
    }
  }

  return result;
}
