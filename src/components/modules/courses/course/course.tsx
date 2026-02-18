import ViewportAnchor from "@/components/common/viewport-anchor";
import CourseHeader from "@/components/modules/courses/course/course-header";
import { Semester } from "@/components/modules/courses/semester/semester";
import CourseType from "@/types/course/course.interface";

interface CourseProps {
  course: CourseType;
}

export const Course = ({ course }: CourseProps) => {
  return (
    <ViewportAnchor className="w-full max-w-6xl px-6 sm:px-8 mb-20 mx-auto container">
      <CourseHeader course={course} />
      <ul className="space-y-4">
        {course.semesters.map((semester) => {
          return <Semester key={semester.id} semester={semester} />;
        })}
      </ul>
    </ViewportAnchor>
  );
};

export default Course;
