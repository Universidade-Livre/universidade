"use client";

import SubjectProgressSidebarItem from "@/components/modules/subject-progress/subject-progress-sidebar-item";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import useUserSubjectLessonProgress from "@/hooks/use-user-subject-lesson-progress";
import { Lesson } from "@/types/course/lesson.interface";
import { UserSubjectLessonProgress } from "@/types/user-progress/user-subject-lesson-progress.interface";
import { useRouter } from "next/navigation";

interface SubjectProgressSidebarProps {
  currentLesson: Lesson;
  lessons: Lesson[];
}

const SubjectProgressSidebar = ({ currentLesson, lessons }: SubjectProgressSidebarProps) => {
  const router = useRouter();
  const { getSubjectLessonProgress, toggleLessonProgress, isLoading } = useUserSubjectLessonProgress();

  const subjectProgress: UserSubjectLessonProgress = getSubjectLessonProgress(
    currentLesson.info.subject.id,
    lessons.length,
  );

  return (
    <aside className="flex min-h-0 flex-col gap-4 p-4 sm:p-6 lg:h-full">
      <div className="flex items-center justify-between pr-2">
        <h3 className="text-lg font-semibold text-zinc-100">
          Playlist de Aulas
        </h3>
        <span className="text-sm font-semibold text-zinc-200">
          {isLoading ? (
            <Skeleton className="h-4 w-20 rounded-sm bg-zinc-300/25" />
          ) : (
            `${subjectProgress.completed} de ${subjectProgress.total}`
          )}
        </span>
      </div>
      <Progress value={subjectProgress.percentage} />
      <div className="flex min-h-0 flex-1 flex-col">
        <ScrollArea
          type="always"
          className="h-[55vh] sm:h-[60vh] lg:h-full w-full overflow-hidden"
          viewportClassName="overscroll-y-contain"
        >
          <ul className="space-y-2 pr-4">
            {lessons.map((lesson) => (
              <SubjectProgressSidebarItem
                key={lesson.id}
                lesson={lesson}
                isSelected={currentLesson.number === lesson.number}
                isCompleted={subjectProgress.completedIds.includes(lesson.id)}
                isToggleDisabled={isLoading}
                onSelect={(nextLesson) => {
                  router.push(
                    `/meu-curso/${nextLesson.info.course.slug}/etapas/${nextLesson.info.semester.number}/disciplinas/${nextLesson.info.subject.number}/aulas/${nextLesson.number}`,
                  );
                }}
                onToggleUserLessonProgress={(lessonId) =>
                  toggleLessonProgress(lessonId)
                }
              />
            ))}
          </ul>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default SubjectProgressSidebar;
