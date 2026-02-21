"use client";

import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUserLessonProgressStore from "@/stores/user-lesson-progress-store";
import { CourseOverview } from "@/types/course/course.interface";
import { Lesson } from "@/types/course/lesson.interface";
import { SemesterOverview } from "@/types/course/semester.interface";
import { Subject } from "@/types/course/subject.interface";
import { UserSubjectLessonProgress } from "@/types/user-progress/user-subject-lesson-progress.interface";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import SubjectProgressSidebarItem from "./subject-progress-sidebar-item";

interface SubjectProgressSidebarProps {
  course: CourseOverview;
  semester: SemesterOverview;
  subject: Subject;
  currentLesson?: Lesson;
  lessons: Lesson[];
}

export const SubjectProgressSidebar = ({
  course,
  semester,
  subject,
  currentLesson,
  lessons,
}: SubjectProgressSidebarProps) => {
  const router = useRouter();
  const [, toggleLessonCompletion, getSubjectProgress] = useUserLessonProgressStore(
    useShallow((state) => [
      state.progress,
      state.toggleLessonProgress,
      state.getSubjectProgress,
    ]),
  );

  const subjectProgress: UserSubjectLessonProgress = getSubjectProgress(
    subject.id,
    subject.lessons,
  );

  return (
    <aside className="flex min-h-0 flex-col gap-4 p-4 sm:p-6 lg:h-full">
      <div className="flex items-center justify-between pr-2">
        <h3 className="text-lg font-semibold text-zinc-100">
          Playlist de Aulas
        </h3>
        <span className="text-sm font-semibold text-zinc-200">
          {subjectProgress.completed} de {subjectProgress.totalLessons}
        </span>
      </div>
      <Progress value={subjectProgress.percentage} />
      <div className="flex min-h-0 flex-1 flex-col">
        <ScrollArea
          type="always"
          className="h-[55vh] sm:h-[60vh] lg:h-full w-full overflow-hidden"
        >
          <ul className="space-y-2 pr-4">
            {lessons.map((lesson) => (
              <SubjectProgressSidebarItem
                key={lesson.id}
                lesson={lesson}
                isSelected={currentLesson?.number === lesson.number}
                isCompleted={subjectProgress.completedIds.includes(lesson.id)}
                onSelect={(nextLesson) => {
                  router.push(
                    `/meu-curso/${course.slug}/etapas/${semester.number}/disciplinas/${subject.number}/aulas/${nextLesson.number}`,
                  );
                }}
                onToggleCompletion={(lessonId) =>
                  toggleLessonCompletion(
                    course.slug,
                    semester.id,
                    subject.id,
                    lessonId,
                  )
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
