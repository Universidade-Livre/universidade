import { getTheme } from "@/components/common/courses/semester/semester-card";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";

interface CourseNodeProps {
  data: {
    name: string;
    semester: number;
    isSelected?: boolean;
    isClicked?: boolean;
    hasActiveSelection?: boolean;
  };
}

const CourseNode = ({ data }: CourseNodeProps) => {
  const theme = getTheme(data.semester);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-zinc-900/90 px-4 py-3 shadow-none",
        "transition-colors duration-200 ease-out hover:bg-zinc-900",
        theme.border,
        data.isClicked && "ring-2 ring-amber-400/80 border-amber-300/70",
        !data.isClicked && data.isSelected && "ring-1 ring-amber-300/70 border-amber-200/60",
        data.hasActiveSelection && !data.isClicked && !data.isSelected && "opacity-40 grayscale",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-60",
          theme.glow,
        )}
      />
      <div className="relative flex h-20 w-56 flex-col justify-center gap-2">
        <div className="line-clamp-2 text-lg font-light leading-tight text-white tracking-tight">
          {data.name}
        </div>
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-semibold tracking-normal",
            theme.text,
          )}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          <span>Etapa {data.semester}</span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="h-1.5 w-10 rounded-full border border-ubl-green/60 bg-ubl-green/80"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="h-1.5 w-10 rounded-full border border-ubl-green/60 bg-ubl-green/80"
      />
    </div>
  );
};

export default CourseNode;
