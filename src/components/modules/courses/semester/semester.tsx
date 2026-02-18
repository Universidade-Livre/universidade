import SemesterHeader from "@/components/modules/courses/semester/semester-header";
import Subject from "@/components/modules/courses/subject/subject";
import { cn } from "@/lib/utils";
import SemesterType from "@/types/course/semester.interface";

interface SemesterProps {
  semester: SemesterType;
}

export const Semester = ({ semester }: SemesterProps) => {
  return (
    <li id={`${semester.id}`}>
      <details
        className={cn(
          "group relative rounded-xl overflow-hidden shadow-lg shadow-black duration-400 transition-all ease-in-out hover:bg-zinc-800/80 hover:translate-x-2 flex flex-col bg-card",
        )}
      >
        <summary className="list-none cursor-pointer focus-visible:outline-none">
          <SemesterHeader semester={semester} />
        </summary>
        <ul className="flex flex-col border-t border-white/10 bg-zinc-800/80 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300 ease-in">
          {semester.subjects.map((subject, semesterIndex) => (
            <Subject key={semesterIndex} subject={subject} index={semesterIndex} />
          ))}
        </ul>
      </details>
    </li>
  );
};
