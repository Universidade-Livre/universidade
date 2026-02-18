import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Asterisk } from "lucide-react";

interface SubjectPrerequisitesProps {
  prerequisites: string[];
}

export const SubjectPrerequisites = ({ prerequisites }: SubjectPrerequisitesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="secondary"
        className={cn(
          "flex items-center gap-1 px-3 py-1 bg-linear-to-r border-white/20 text-gray-100 bg-black/20",
          prerequisites.length > 0
            ? "from-purple-500/10 to-pink-800/30"
            : "border-0 bg-transparent",
        )}
      >
        <Asterisk className="h-3 w-3 text-yellow-400" />
        <span className="text-xs">
          {prerequisites.length > 0 ? "Pré-requisitos" : "Sem pré-requisitos"}
        </span>
      </Badge>
      {prerequisites.map((prereq, i) => (
        <Badge
          key={i}
          variant="outline"
          className="bg-linear-to-r from-purple-500/10 to-pink-800/20 text-purple-200 border-purple-500/30 px-2 py-1"
        >
          {prereq}
        </Badge>
      ))}
    </div>
  );
};

export default SubjectPrerequisites;
