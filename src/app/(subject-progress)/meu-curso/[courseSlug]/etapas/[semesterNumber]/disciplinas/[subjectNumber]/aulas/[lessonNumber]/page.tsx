import SubjectProgress from "@/components/modules/subject-progress/subject-progress";
import { getAllCourses, getCourse } from "@/services/course.service";
import { getLessons } from "@/services/lesson.service";
import Course from "@/types/course/course.interface";
import Lesson from "@/types/course/lesson.interface";
import Semester from "@/types/course/semester.interface";
import Subject from "@/types/course/subject.interface";
import { notFound } from "next/navigation";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string().min(1),
  semesterNumber: z.coerce.number().int().positive(),
  subjectNumber: z.coerce.number().int().positive(),
  lessonNumber: z.coerce.number().int().positive(),
});

export const generateStaticParams = async () => {
  const courses: Course[] = await getAllCourses();
  const params = await Promise.all(
    courses.flatMap((course) =>
      course.semesters.flatMap((semester) =>
        semester.subjects.map(async (subject) => {
          const lessons: Lesson[] | undefined = await getLessons(course.slug, semester.number, subject.id);
          if (!lessons || lessons.length === 0) {
            return [];
          }

          return lessons.map((lesson) => ({
            courseSlug: course.slug,
            semesterNumber: String(semester.number),
            subjectNumber: String(subject.number),
            lessonNumber: String(lesson.number),
          }));
        }),
      ),
    ),
  );

  return params.flat();
};

export const LessonPage = async ({ params: rawParams }: { params: Promise<z.input<typeof paramsSchema>> }) => {
  const params = paramsSchema.safeParse(await rawParams);
  if (!params.success) {
    notFound();
  }

  const { courseSlug, semesterNumber, subjectNumber, lessonNumber } = params.data;
  const course: Course | undefined = await getCourse(courseSlug);
  const semester: Semester | undefined = course?.semesters.find((semester) => semester.number === semesterNumber);
  const subject: Subject | undefined = semester?.subjects.find((subject) => subject.number === subjectNumber);
  if (!course || !semester || !subject) {
    notFound();
  }

  const lessons: Lesson[] | undefined = await getLessons(courseSlug, semesterNumber, subject.id);
  const lesson: Lesson | undefined = lessons?.find((currentLesson) => currentLesson.number === lessonNumber);
  if (!lessons || !lesson) {
    notFound();
  }

  return (
    <SubjectProgress
      course={course}
      subject={subject}
      lessons={lessons}
      currentLesson={lesson}
    />
  );
};

export default LessonPage;
