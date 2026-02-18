import SubjectProgress from "@/components/modules/subject-progress/subject-progress";
import { getCourseBySlug } from "@/server/services/course.service";
import { getLessonsBySubjectId } from "@/server/services/lesson.service";
import { Course } from "@/types/course/course.interface";
import { Lesson } from "@/types/course/lesson.interface";
import { Semester } from "@/types/course/semester.interface";
import { Subject } from "@/types/course/subject.interface";
import { notFound } from "next/navigation";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string().min(1),
  semesterNumber: z.coerce.number().int().positive(),
  subjectNumber: z.coerce.number().int().positive(),
  lessonNumber: z.coerce.number().int().positive(),
});

export const LessonPage = async ({ params: rawParams }: { params: Promise<z.input<typeof paramsSchema>> }) => {
  const params = paramsSchema.safeParse(await rawParams);
  if (!params.success) {
    notFound();
  }

  const { courseSlug, semesterNumber, subjectNumber, lessonNumber } = params.data;
  const course: Course | null = await getCourseBySlug(courseSlug);
  const semester: Semester | undefined = course?.semesters.find((semester) => semester.number === semesterNumber);
  const subject: Subject | undefined = semester?.subjects.find((subject) => subject.number === subjectNumber);
  if (!course || !semester || !subject) {
    notFound();
  }

  const lessons: Lesson[] | undefined = await getLessonsBySubjectId(subject.id);
  const lesson: Lesson | undefined = lessons?.find((currentLesson) => currentLesson.number === lessonNumber);
  if (!lessons || !lesson) {
    notFound();
  }

  return (
    <SubjectProgress
      course={course}
      semester={semester}
      subject={subject}
      lessons={lessons}
      currentLesson={lesson}
    />
  );
};

export default LessonPage;
