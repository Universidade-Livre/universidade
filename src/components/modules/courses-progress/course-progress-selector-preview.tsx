import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface CourseProgressSelectorPreviewProps {
  course: {
    slug: string;
    name: string;
    description: string;
    icon: LucideIcon;
    accentText: string;
    accentBorder: string;
    accentBackground: string;
  };
}

export const CourseProgressSelectorPreview = ({ course }: CourseProgressSelectorPreviewProps) => {
  return (
    <Link
      href={`/meu-curso/${course.slug}`}
      className={cn(
        "group relative flex h-full min-h-60 flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 p-5 shadow-lg shadow-black/35 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zinc-500/70 hover:shadow-xl hover:shadow-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 sm:p-6",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-zinc-950/30" />
      <div className="relative z-10 mt-2 flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative mb-5">
          <div
            className={cn(
              "pointer-events-none absolute -inset-3 rounded-full opacity-90 blur-lg transition-opacity duration-200 group-hover:opacity-100",
              course.accentBackground,
            )}
          />
          <div
            className={cn(
              "relative grid h-20 w-20 place-items-center rounded-full border-2 shadow-lg ring-1 ring-white/12 transition-transform duration-200 group-hover:scale-[1.03]",
              course.accentBorder,
              course.accentBackground,
            )}
          >
            <course.icon className={cn("h-8 w-8", course.accentText)} />
          </div>
        </div>

        <h2 className="text-[1.3rem] leading-tight font-semibold tracking-tight text-zinc-100 md:text-[1.45rem]">
          {course.name}
        </h2>
        <p className="mt-2 max-w-[30ch] text-sm leading-6 text-zinc-300 md:text-[0.98rem]">
          {course.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-end pt-4">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold tracking-wide",
            course.accentText,
          )}
        >
          <span>Selecionar</span>
          <ArrowRight className={course.accentText} />
        </span>
      </div>
    </Link>
  );
};

export default CourseProgressSelectorPreview;
