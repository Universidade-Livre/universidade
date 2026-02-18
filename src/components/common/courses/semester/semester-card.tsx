import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface SemesterCardProps {
  semesterNumber: number;
  label: string;
  className?: string;
  children?: ReactNode;
}

export const getTheme = (number: number) => {
  switch (number) {
    case 1:
      return {
        text: "text-blue-400",
        border: "border-blue-400",
        glow: "from-blue-500/10 via-transparent",
      };
    case 2:
      return {
        text: "text-emerald-400",
        border: "border-emerald-400",
        glow: "from-emerald-500/10 via-transparent",
      };
    case 3:
      return {
        text: "text-violet-400",
        border: "border-violet-400",
        glow: "from-violet-500/10 via-transparent",
      };
    case 4:
      return {
        text: "text-rose-400",
        border: "border-rose-400",
        glow: "from-rose-500/10 via-transparent",
      };
    case 5:
      return {
        text: "text-amber-400",
        border: "border-amber-400",
        glow: "from-amber-500/10 via-transparent",
      };
    case 6:
      return {
        text: "text-cyan-400",
        border: "border-cyan-400",
        glow: "from-cyan-500/10 via-transparent",
      };
    case 7:
      return {
        text: "text-indigo-400",
        border: "border-indigo-400",
        glow: "from-indigo-500/10 via-transparent",
      };
    default:
      return {
        text: "text-zinc-400",
        border: "border-zinc-400",
        glow: "from-zinc-500/10 via-transparent",
      };
  }
};

export const SemesterCard = ({ semesterNumber, label, className, children }: SemesterCardProps) => {
  const theme = getTheme(semesterNumber);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-zinc-900/80 p-5 sm:p-6",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-50",
          theme.glow,
        )}
      />
      <div className="relative z-10 flex flex-col gap-6 w-full sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:items-end">
        <div className="space-y-2">
          <div
            className={cn(
              "flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] sm:text-xs",
              theme.text,
            )}
          >
            <Sparkles className="h-3 w-3" />
            <span>{label}</span>
          </div>
          <div className="text-3xl text-white tracking-tight whitespace-nowrap sm:text-4xl">
            Etapa {semesterNumber}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SemesterCard;
