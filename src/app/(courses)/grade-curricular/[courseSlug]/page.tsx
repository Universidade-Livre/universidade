import Course from "@/components/modules/courses/course/course";
import { getAllCourses, getCourse } from "@/services/course.service";
import CourseType from "@/types/course/course.interface";
import { notFound } from "next/navigation";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string().min(1),
});

export const generateStaticParams = async () => {
  const courses: CourseType[] = await getAllCourses();
  return courses.map((course) => ({
    courseSlug: course.slug,
  }));
};

export const CoursePage = async ({ params: rawParams }: { params: Promise<z.input<typeof paramsSchema>> }) => {
  const params = paramsSchema.safeParse(await rawParams);
  if (!params.success) {
    notFound();
  }

  const { courseSlug } = params.data;
  const course: CourseType | undefined = await getCourse(courseSlug);
  if (!course) {
    notFound();
  }

  return <Course course={course} />;
};

export default CoursePage;
