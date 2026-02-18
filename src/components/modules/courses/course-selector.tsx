import CourseSelectorPreview from "@/components/modules/courses/course-selector-preview";
import { StaticImageData } from "next/image";

interface CourseSelectorProps {
  courses: {
    slug: string;
    name: string;
    description: string;
    image: string | StaticImageData;
    className: string;
  }[];
}

export const CourseSelector = ({ courses }: CourseSelectorProps) => {
  return (
    <section className="mx-auto mt-4 mb-20 flex w-full max-w-6xl flex-col items-center px-6 sm:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Catálogo de Cursos
        </h2>
        <p className="text-sm text-gray-400 sm:text-base">
          Escolha um curso para explorar sua grade curricular detalhada.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {courses.map((course) => (
          <CourseSelectorPreview key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseSelector;
