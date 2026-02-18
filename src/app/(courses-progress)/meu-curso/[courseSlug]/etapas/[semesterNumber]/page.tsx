import CourseProgress from "@/components/modules/courses-progress/course-progress/course-progress";
import { getAllCourses, getCourse } from "@/services/course.service";
import Course from "@/types/course/course.interface";
import { notFound } from "next/navigation";
import { z } from "zod";

const paramsSchema = z.object({
  courseSlug: z.string().min(1),
  semesterNumber: z.coerce.number().int().positive(),
});

export const generateStaticParams = async () => {
  const courses: Course[] = await getAllCourses();
  return courses.flatMap((course) =>
    course.semesters.map((semester) => ({
      courseSlug: course.slug,
      semesterNumber: String(semester.number),
    })),
  );
};

export const CourseProgressPage = async ({ params: rawParams }: { params: Promise<z.input<typeof paramsSchema>> }) => {
  const params = paramsSchema.safeParse(await rawParams);
  if (!params.success) {
    notFound();
  }

  const { courseSlug, semesterNumber } = params.data;
  const course: Course | undefined = await getCourse(courseSlug);
  if (!course || !course.semesters.map((semester) => semester.number).includes(semesterNumber)) {
    notFound();
  }

  return <CourseProgress semesterNumber={semesterNumber} course={course} />;
};

export default CourseProgressPage;
