import CourseProgressSelectorPreview from "@/components/modules/courses-progress/course-progress-selector-preview";
import { LucideIcon } from "lucide-react";

interface CourseProgressSelectorProps {
  courses: {
    slug: string;
    name: string;
    description: string;
    icon: LucideIcon;
    accentText: string;
    accentBorder: string;
    accentBackground: string;
  }[];
}

export const CourseProgressSelector = ({ courses }: CourseProgressSelectorProps) => {
  return (
    <section className="relative mx-auto grid min-h-90 w-full max-w-7xl gap-6 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 p-6 before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-blue-400/10 before:via-transparent before:to-ubl-green/10 before:opacity-50 sm:min-h-95 sm:p-8 md:min-h-100 md:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-8 lg:min-h-110 lg:p-11">
      <header className="relative z-10 space-y-3 lg:pr-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Escolha sua trilha
        </p>
        <h1 className="text-3xl font-semibold leading-[1.04] tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-[3.1rem]">
          O que você quer aprender hoje?
        </h1>
        <p className="max-w-xl text-base leading-6 text-zinc-300 md:text-lg md:leading-7">
          Selecione uma área para montar sua jornada com foco, ritmo e progresso
          visível.
        </p>
      </header>
      <div className="relative z-10 grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseProgressSelectorPreview key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseProgressSelector;
