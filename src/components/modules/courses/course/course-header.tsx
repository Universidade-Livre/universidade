import CourseGraphDialog from "@/components/modules/courses/course/node-graphs/course-graph-dialog";
import { Separator } from "@/components/ui/separator";
import Course from "@/types/course/course.interface";
import { GraduationCap } from "lucide-react";

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {course.name}
        </h2>
      </div>
      <Separator className="hidden md:block flex-1 self-center bg-linear-to-r from-ubl-blue to-ubl-green rounded" />
      <CourseGraphDialog course={course} />
    </div>
  );
};

export default CourseHeader;
