import { VideoPlayer } from "@/components/common/video-player";
import LessonProgressBreadcrumb from "@/components/modules/subject-progress/lesson-progress/lesson-progress-breadcrumb";
import { Card } from "@/components/ui/card";
import { formatDuration } from "@/lib/time";
import { Lesson } from "@/types/course/lesson.interface";
import { Clock3, ListVideo } from "lucide-react";

interface LessonProgressProps {
  lesson: Lesson;
}

export const LessonProgress = ({ lesson }: LessonProgressProps) => {
  return (
    <Card className="flex min-h-0 flex-col gap-3 border-0 bg-transparent p-4 shadow-none sm:gap-4 sm:p-6 lg:h-full">
      <LessonProgressBreadcrumb lesson={lesson} />
      <div className="relative w-full aspect-video min-h-55 sm:min-h-80 lg:aspect-auto lg:flex-1 lg:min-h-0">
        <div className="h-full rounded-md overflow-hidden transition-opacity">
          <VideoPlayer key={lesson.id} url={lesson.embedUrl} />
        </div>
      </div>
      <div className="shrink-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1.5 font-medium text-zinc-300">
                <ListVideo className="h-3.5 w-3.5 text-zinc-400" />
                <span>Aula {lesson.number}</span>
              </span>
              {lesson.durationSeconds && (
                <span className="inline-flex items-center gap-1.5 border-l border-zinc-600/70 pl-2 text-zinc-300">
                  <Clock3 className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="font-medium">
                    {formatDuration(lesson.durationSeconds)}
                  </span>
                </span>
              )}
            </div>
            <h2 className="text-[1.35rem] sm:text-[1.6rem] lg:text-[1.75rem] font-semibold tracking-[-0.01em] leading-tight text-zinc-50">
              {lesson.name}
            </h2>
            <p className="text-sm text-zinc-400">
              Disciplina: <span className="text-zinc-400">{lesson.info.subject.name}</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LessonProgress;
