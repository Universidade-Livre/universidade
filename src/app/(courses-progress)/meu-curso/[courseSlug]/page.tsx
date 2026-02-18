import { getAllCourses, getCourse } from "@/services/course.service";
import Course from "@/types/course/course.interface";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string().min(1),
});

export const generateStaticParams = async () => {
  const courses: Course[] = await getAllCourses();
  return courses.map((course) => ({
    courseSlug: course.slug,
  }));
};

export const CourseProgressRedirectPage = async ({ params: rawParams }: { params: Promise<z.input<typeof paramsSchema>> }) => {
  const params = paramsSchema.safeParse(await rawParams);
  if (!params.success) {
    notFound();
  }

  const { courseSlug } = params.data;
  const course: Course | undefined = await getCourse(courseSlug);
  if (!course || course.semesters.length === 0) {
    notFound();
  }

  const firstSemesterNumber: number = Math.min(...course.semesters.map((semester) => semester.number));
  redirect(`/meu-curso/${courseSlug}/etapas/${firstSemesterNumber}`);
};

export default CourseProgressRedirectPage;
