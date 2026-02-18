import SemesterCard from "@/components/common/courses/semester/semester-card";
import { SemesterStats } from "@/components/common/courses/semester/semester-stats";
import { cn } from "@/lib/utils";
import Semester from "@/types/course/semester.interface";
import { ChevronRight } from "lucide-react";

interface SemesterHeaderProps {
  semester: Semester;
}

export const SemesterHeader = ({ semester }: SemesterHeaderProps) => {
  return (
    <SemesterCard
      semesterNumber={semester.number}
      label="Grade Curricular"
      className="cursor-pointer rounded-xl border-0 bg-zinc-900 p-4 shadow-none sm:p-6 group-open:rounded-b-none"
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:w-auto">
        <SemesterStats semester={semester} />
        <div className="flex w-full items-center justify-between text-xs uppercase tracking-wide sm:w-auto sm:justify-end">
          <span className="px-3 py-1 leading-tight">
            <span className="block text-muted-foreground">Clique para</span>
            <span className="block text-zinc-300">
              <span className="hidden group-open:inline">Recolher</span>
              <span className="inline group-open:hidden">Expandir</span>
            </span>
          </span>
          <ChevronRight
            className={cn(
              "h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1 group-open:rotate-90",
            )}
          />
        </div>
      </div>
    </SemesterCard>
  );
};

export default SemesterHeader;
