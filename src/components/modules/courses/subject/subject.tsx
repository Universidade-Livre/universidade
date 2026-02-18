import SubjectBooks from "@/components/modules/courses/subject/subject-books";
import SubjectBooksToggle from "@/components/modules/courses/subject/subject-books-toggle";
import SubjectPrerequisites from "@/components/modules/courses/subject/subject-prerequisites";
import { cn } from "@/lib/utils";

interface SubjectProps {
  subject: {
    name: string;
    prerequisites: string[];
    books?: { name: string; url: string }[];
  };
  index: number;
}

export const Subject = ({ subject, index }: SubjectProps) => {
  return (
    <li
      key={index}
      className={cn(
        "group px-4 py-2 shadow-sm",
        index % 2 === 0 ? "bg-zinc-900/75" : "bg-zinc-800/75",
      )}
    >
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-linear-to-r from-ubl-blue to-ubl-green" />
            <h3 className="font-medium text-lg text-white tracking-tight sm:text-xl">
              {subject.name}
            </h3>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <SubjectPrerequisites prerequisites={subject.prerequisites} />
          </div>
        </div>

        <SubjectBooksToggle>
          <SubjectBooks subject={subject} />
        </SubjectBooksToggle>
      </div>
    </li>
  );
};

export default Subject;
