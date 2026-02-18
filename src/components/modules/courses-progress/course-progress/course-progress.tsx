import CourseProgressNavigation from "@/components/modules/courses-progress/course-progress/course-progress-navigation";
import SemesterProgress from "@/components/modules/courses-progress/semester-progress/semester-progress";
import SubjectProgress from "@/components/modules/courses-progress/subject-progress/subject-progress";
import Course from "@/types/course/course.interface";
import Semester from "@/types/course/semester.interface";

interface CourseProgressProps {
  semesterNumber: number;
  course: Course;
}

export const CourseProgress = ({ semesterNumber, course }: CourseProgressProps) => {
  const semester: Semester | undefined = course.semesters.find((semester) => semester.number === semesterNumber);
  if (!semester) {
    return null;
  }

  return (
    <div className="flex flex-col w-full space-y-8 mb-10">
      <div className="flex flex-col w-full items-center space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          {course.name}
        </h2>
        <CourseProgressNavigation
          activeSemesterNumber={semesterNumber}
          course={course}
        />
      </div>
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-6">
          <SemesterProgress semesterNumber={semesterNumber} course={course} />
          <div className="grid grid-cols-1 gap-3">
            {semester.subjects.map((subject) => (
              <SubjectProgress
                key={subject.id}
                semesterNumber={semesterNumber}
                subjectNumber={subject.number}
                course={course}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
