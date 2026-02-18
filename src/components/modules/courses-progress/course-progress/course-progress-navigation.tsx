import CourseProgressNavigationItem from "@/components/modules/courses-progress/course-progress/course-progress-navigation-item";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ScrollBar } from "@/components/ui/scroll-area";
import Course from "@/types/course/course.interface";
import Semester from "@/types/course/semester.interface";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

interface CourseProgressNavigationProps {
  activeSemesterNumber: number;
  course: Course;
}

export const CourseProgressNavigation = ({
  activeSemesterNumber,
  course,
}: CourseProgressNavigationProps) => {
  const semesters: Semester[] = [...course.semesters].sort(
    (a, b) => a.number - b.number,
  );
  return (
    <ScrollAreaPrimitive.Root className="w-full">
      <ScrollAreaPrimitive.Viewport className="w-full">
        <NavigationMenu
          viewport={false}
          className="w-max min-w-full lg:min-w-0 mx-auto"
        >
          <NavigationMenuList className="flex w-max min-w-full lg:min-w-0 gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-1 backdrop-blur-sm">
            {semesters.map((semester) => (
              <CourseProgressNavigationItem
                key={semester.id}
                activeSemesterNumber={activeSemesterNumber}
                semester={semester}
                course={course}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

export default CourseProgressNavigation;
