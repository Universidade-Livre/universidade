import CourseProgress from "@/components/modules/courses-progress/course-progress/course-progress";
import { getCourseBySlug } from "@/server/services/course.service";
import { Course } from "@/types/course/course.interface";
import { Semester } from "@/types/course/semester.interface";
import { notFound } from "next/navigation";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string().min(1),
  semesterNumber: z.coerce.number().int().positive(),
});

export const CourseProgressPage = async ({ params: rawParams }: { params: Promise<z.input<typeof paramsSchema>> }) => {
  const params = paramsSchema.safeParse(await rawParams);
  if (!params.success) {
    notFound();
  }

  const { courseSlug, semesterNumber } = params.data;
  const course: Course | null = await getCourseBySlug(courseSlug);
  const semester: Semester | undefined = course?.semesters.find((semester) => semester.number === semesterNumber);
  if (!course || !semester) {
    notFound();
  }

  return <CourseProgress semester={semester} semesters={course.semesters} />;
};

export default CourseProgressPage;
