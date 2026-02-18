import { getCourseBySlug } from "@/server/services/course.service";
import { getLessonsBySubjectId } from "@/server/services/lesson.service";
import { Course } from "@/types/course/course.interface";
import { Lesson } from "@/types/course/lesson.interface";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string().min(1),
  semesterNumber: z.coerce.number().int().positive(),
  subjectNumber: z.coerce.number().int().positive(),
});

export const SubjectPage = async ({ params: rawParams }: { params: Promise<z.input<typeof paramsSchema>> }) => {
  const params = paramsSchema.safeParse(await rawParams);
  if (!params.success) {
    notFound();
  }

  const { courseSlug, semesterNumber, subjectNumber } = params.data;
  const course: Course | null = await getCourseBySlug(courseSlug);
  const subject = course?.semesters
    .find((semester) => semester.number === semesterNumber)
    ?.subjects.find((subject) => subject.number === subjectNumber);

  if (!course || !subject) {
    notFound();
  }

  const lessons: Lesson[] | undefined = await getLessonsBySubjectId(subject.id);
  if (!lessons || lessons.length === 0) {
    notFound();
  }

  const firstLessonNumber: number = Math.min(...lessons.map((lesson) => lesson.number));
  redirect(`/meu-curso/${courseSlug}/etapas/${semesterNumber}/disciplinas/${subjectNumber}/aulas/${firstLessonNumber}`);
};

export default SubjectPage;
