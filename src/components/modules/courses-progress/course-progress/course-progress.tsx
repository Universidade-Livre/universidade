import CourseProgressNavigation from "@/components/modules/courses-progress/course-progress/course-progress-navigation";
import SemesterProgress from "@/components/modules/courses-progress/semester-progress/semester-progress";
import SubjectProgress from "@/components/modules/courses-progress/subject-progress/subject-progress";
import { Semester } from "@/types/course/semester.interface";

interface CourseProgressProps {
  semester: Semester;
  semesters: Semester[];
}

export const CourseProgress = ({ semester, semesters }: CourseProgressProps) => {
  return (
    <div className="flex flex-col w-full space-y-8 mb-10">
      <div className="flex flex-col w-full items-center space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          {semester.info.course.name}
        </h2>
        <CourseProgressNavigation
          activeSemesterNumber={semester.number}
          semesters={semesters}
        />
      </div>
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-6">
          <SemesterProgress semester={semester} />
          <div className="grid grid-cols-1 gap-3">
            {semester.subjects.map((subject) => (
              <SubjectProgress
                key={subject.id}
                subject={subject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
