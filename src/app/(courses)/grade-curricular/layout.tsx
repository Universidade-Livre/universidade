import { courses } from "@/app/(courses)/grade-curricular/page";
import CourseSelector from "@/components/modules/courses/course-selector";
import CoursesHero from "@/components/modules/courses/courses-hero";
import { ReactNode } from "react";

export const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center space-y-4">
      <CoursesHero />
      <CourseSelector courses={courses} />
      {children}
    </div>
  );
};

export default Layout;
