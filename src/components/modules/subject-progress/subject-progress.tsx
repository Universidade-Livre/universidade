import LessonProgress from "@/components/modules/subject-progress/lesson-progress/lesson-progress";
import SubjectProgressSidebar from "@/components/modules/subject-progress/subject-progress-sidebar";
import Course from "@/types/course/course.interface";
import Lesson from "@/types/course/lesson.interface";
import Subject from "@/types/course/subject.interface";

interface SubjectProgressProps {
  course: Course;
  subject: Subject;
  lessons: Lesson[];
  currentLesson: Lesson;
}

export const SubjectProgress = ({ course, subject, lessons, currentLesson }: SubjectProgressProps) => {
  return (
    <div className="min-h-[calc(100dvh-3.5rem)] h-auto lg:h-[calc(100vh-3.5rem)] overflow-x-hidden overflow-y-auto lg:overflow-y-hidden">
      <div className="w-full min-h-0 py-6 px-4 sm:px-6 max-w-360 mx-auto h-auto lg:h-full">
        <div className="min-h-0 rounded-lg border border-zinc-800/80 bg-card p-3 shadow-2xl shadow-black/45 ring-1 ring-zinc-700/40 sm:p-4 lg:h-full">
          <div className="min-h-0 grid grid-cols-1 gap-0 items-stretch lg:h-full lg:grid-cols-[minmax(0,5fr)_minmax(0,2fr)]">
            <LessonProgress
              course={course}
              subject={subject}
              lesson={currentLesson}
            />
            <SubjectProgressSidebar
              currentLesson={currentLesson}
              lessons={lessons}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectProgress;
