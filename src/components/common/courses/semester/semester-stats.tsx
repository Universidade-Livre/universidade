import { formatDuration } from "@/lib/time";
import { Semester } from "@/types/course/semester.interface";
import { BookOpen, Clock } from "lucide-react";

interface SemesterStatsProps {
  semester: Semester;
}

export const SemesterStats = ({ semester }: SemesterStatsProps) => {
  const semesterDuration: string = formatDuration(
    semester.subjects.reduce(
      (acc, subject) => acc + (subject.lessonsDurationSeconds ?? 0),
      0,
    ),
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-zinc-400 bg-zinc-950/30 p-4 rounded-xl border border-white/5 backdrop-blur-md w-full sm:w-auto">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-zinc-800 rounded-md">
          <BookOpen className="w-4 h-4 text-zinc-300" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase font-bold">
            Disciplinas
          </span>
          <span className="text-zinc-200 font-medium">
            {semester.subjects.length}
          </span>
        </div>
      </div>
      <div className="h-px w-full bg-zinc-800 sm:w-px sm:h-8" />
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-zinc-800 rounded-md">
          <Clock className="w-4 h-4 text-zinc-300" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase font-bold">
            Tempo
          </span>
          <span className="text-zinc-200 font-medium">{semesterDuration}</span>
        </div>
      </div>
    </div>
  );
};
