"use client";

import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCourseProgress from "@/hooks/use-course-progress";
import useCourseProgressStore from "@/stores/course-progress-store";
import CourseProgress from "@/types/course-progress/course-progress.interface";
import LessonProgress from "@/types/course-progress/lesson-progress.interface";
import SubjectProgress from "@/types/course-progress/subject-progress.interface";
import Lesson from "@/types/course/lesson.interface";
import { useParams, useRouter } from "next/navigation";
import SubjectProgressSidebarItem from "./subject-progress-sidebar-item";

interface SubjectProgressSidebarProps {
  currentLesson?: Lesson;
  lessons: Lesson[];
}

export const SubjectProgressSidebar = ({ currentLesson, lessons}: SubjectProgressSidebarProps) => {
  const router = useRouter();
  const params = useParams();
  const courseSlug: string = params.courseSlug as string;
  const semesterNumber: number = Number(params.semesterNumber);
  const subjectNumber: number = Number(params.subjectNumber);

  const toggleLessonCompletion = useCourseProgressStore((state) => state.toggleLessonCompletion);
  const courseProgress: CourseProgress = useCourseProgress({
    courseSlug,
    semesterNumber,
    subjectNumber,
    totalLessons: lessons.length,
  });

  const subjectProgress: SubjectProgress | undefined = courseProgress.semesters
    .find((semester) => semester.number === semesterNumber)
    ?.subjects.find((subject) => subject.number === subjectNumber);

  const completedLessons: LessonProgress[] = subjectProgress?.lessons ?? [];
  const completedLessonsProgress: number = subjectProgress?.progress ?? 0;

  return (
    <aside className="flex min-h-0 flex-col gap-4 p-4 sm:p-6 lg:h-full">
      <div className="flex items-center justify-between pr-2">
        <h3 className="text-lg font-semibold text-zinc-100">
          Playlist de Aulas
        </h3>
        <span className="text-sm font-semibold text-zinc-200">
          {completedLessons.length} de {lessons.length}
        </span>
      </div>
      <Progress value={completedLessonsProgress} />
      <div className="flex min-h-0 flex-1 flex-col">
        <ScrollArea type="always" className="h-[55vh] sm:h-[60vh] lg:h-full w-full overflow-hidden">
          <ul className="space-y-2 pr-4">
            {lessons.map((lesson) => (
              <SubjectProgressSidebarItem
                key={lesson.id}
                lesson={lesson}
                isSelected={currentLesson?.number === lesson.number}
                isCompleted={completedLessons
                  .map((lesson) => lesson.number)
                  .includes(lesson.number)}
                onSelect={(nextLesson) => {
                  router.push(
                    `/meu-curso/${courseSlug}/etapas/${semesterNumber}/disciplinas/${subjectNumber}/aulas/${nextLesson.number}`,
                  );
                }}
                onToggleCompletion={(lessonNumber) => {
                  toggleLessonCompletion(
                    courseSlug,
                    semesterNumber,
                    subjectNumber,
                    lessonNumber,
                  );
                }}
              />
            ))}
          </ul>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default SubjectProgressSidebar;
