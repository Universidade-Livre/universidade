"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useCourseProgress from "@/hooks/use-course-progress";
import { cn } from "@/lib/utils";
import CourseProgress from "@/types/course-progress/course-progress.interface";
import SubjectProgressType from "@/types/course-progress/subject-progress.interface";
import Course from "@/types/course/course.interface";
import Subject from "@/types/course/subject.interface";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

interface SubjectProgressProps {
  semesterNumber: number;
  subjectNumber: number;
  course: Course;
}

export const getTheme = (progress: number) => {
  if (progress === 100)
    return {
      color: "text-emerald-300",
      iconColor: "text-emerald-400",
      border: "group-hover:border-emerald-500/30 border-emerald-400/40",
      background: "bg-linear-to-r from-emerald-900/10 to-emerald-700/35",
      icon: CheckCircle2,
    };
  else if (progress > 0)
    return {
      color: "text-blue-100/85",
      iconColor: "text-amber-500",
      border: "group-hover:border-blue-600/45 border-blue-500/45",
      background: "bg-linear-to-r from-blue-950/35 to-blue-900/40",
      icon: CheckCircle2,
    };
  else
    return {
      color: "text-zinc-300",
      iconColor: "text-zinc-300",
      border: "group-hover:border-zinc-400/80 border-zinc-600/75",
      background: "bg-zinc-900/70",
      icon: Circle,
    };
};

export const SubjectProgress = ({ semesterNumber, subjectNumber, course }: SubjectProgressProps) => {
  const courseProgress: CourseProgress = useCourseProgress({ course });
  const subjectProgress: SubjectProgressType | undefined = courseProgress.semesters
    .find((semester) => semester.number === semesterNumber)
    ?.subjects.find((subject) => subject.number === subjectNumber);

  const subject: Subject | undefined = course.semesters
    .find((semester) => semester.number === semesterNumber)
    ?.subjects.find((subject) => subject.number === subjectNumber);

  if (!subjectProgress || !subject) {
    return null;
  }

  const theme = getTheme(subjectProgress.progress);
  return (
    <Link
      href={`/meu-curso/${course.slug}/etapas/${semesterNumber}/disciplinas/${subjectNumber}`}
      className="group block"
    >
      <Card
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 border transition-all duration-300 ease-out hover:bg-zinc-800/75 hover:translate-x-1 hover:shadow-lg p-4 sm:p-6",
          theme.border,
          theme.background,
        )}
      >
        <div className="relative shrink-0">
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-zinc-600/70 bg-zinc-900/80 shadow-inner text-2xl sm:text-3xl font-semibold leading-none tracking-tight text-zinc-200">
            {subject.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 rounded-full border border-zinc-600/70 bg-zinc-900 p-0.5">
            {<theme.icon className={theme.iconColor} />}
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-2 w-full">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base sm:text-lg font-medium text-zinc-200 group-hover:text-white truncate pr-4">
              {subject.name}
            </h3>
            <div
              className={cn(
                "hidden sm:flex items-center gap-2 text-xs font-medium transition-colors border rounded-full px-3 py-1 cursor-pointer",
                subjectProgress.progress === 100
                  ? "border-emerald-300/40 bg-emerald-500/10 text-emerald-100/90"
                  : subjectProgress.progress > 0
                    ? "border-blue-400/35 bg-blue-950/30 text-blue-200/85"
                    : "border-zinc-500/40 bg-zinc-800/30 text-zinc-300/90",
              )}
            >
              {subjectProgress.progress === 100
                ? "Revisar"
                : subjectProgress.progress > 0
                  ? "Continuar"
                  : "Iniciar"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-zinc-300">
              <span>
                {subjectProgress.progress === 100
                  ? "Concluído"
                  : subjectProgress.progress > 0
                    ? "Progresso"
                    : "Comece a assistir"}
              </span>
              <span className={theme.color}>{subjectProgress.progress}%</span>
            </div>

            {subjectProgress.progress > 0 && (
              <div className="h-1.5 w-full overflow-hidden rounded-full border border-zinc-600/60 bg-zinc-900/80">
                <div className="h-full w-full">
                  <Progress value={subjectProgress.progress} />
                </div>
              </div>
            )}

            <div className="pt-0.5 text-xs text-zinc-400">
              {subjectProgress.lessons.length} de {subject.lessons} aulas
              concluídas
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SubjectProgress;
