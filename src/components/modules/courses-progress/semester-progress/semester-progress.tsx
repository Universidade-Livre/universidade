import SemesterCard from "@/components/common/courses/semester/semester-card";
import { SemesterStats } from "@/components/common/courses/semester/semester-stats";
import { Semester } from "@/types/course/semester.interface";

interface SemesterProgressProps {
  semester: Semester;
}

export const SemesterProgress = ({ semester }: SemesterProgressProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <SemesterCard
        semesterNumber={semester.number}
        label="Progresso da Etapa"
        className="md:p-8"
      >
        <SemesterStats semester={semester} />
      </SemesterCard>
    </div>
  );
};

export default SemesterProgress;
