import SemesterCard from "@/components/common/courses/semester/semester-card";
import { SemesterStats } from "@/components/common/courses/semester/semester-stats";
import Course from "@/types/course/course.interface";

interface SemesterProgressProps {
  semesterNumber: number;
  course: Course;
}

export const SemesterProgress = ({ semesterNumber, course }: SemesterProgressProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <SemesterCard
        semesterNumber={semesterNumber}
        label="Progresso da Etapa"
        className="md:p-8"
      >
        <SemesterStats semesterNumber={semesterNumber} course={course} />
      </SemesterCard>
    </div>
  );
};

export default SemesterProgress;
