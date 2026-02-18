import { Checkbox } from "@/components/ui/checkbox";
import { formatDuration } from "@/lib/time";
import { cn } from "@/lib/utils";
import Lesson from "@/types/course/lesson.interface";

interface SubjectProgressSidebarItemProps {
  lesson: Lesson;
  isSelected: boolean;
  isCompleted: boolean;
  onSelect: (lesson: Lesson) => void;
  onToggleCompletion: (lessonNumber: number) => void;
}

export const SubjectProgressSidebarItem = ({
  lesson,
  isSelected,
  isCompleted,
  onSelect,
  onToggleCompletion,
}: SubjectProgressSidebarItemProps) => {
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        onClick={() => onSelect(lesson)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(lesson);
          }
        }}
        className={cn(
          "w-full flex items-start gap-3 rounded-md border border-zinc-700/80 bg-zinc-900 px-3 py-2 shadow-sm shadow-black/20 cursor-pointer transition-colors duration-150 hover:border-zinc-500 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/50",
          isSelected && "border-blue-400/70 bg-blue-500/15 text-zinc-50 hover:border-blue-300/80 hover:bg-blue-500/20",
        )}
      >
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggleCompletion(lesson.number)}
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="
            mt-0.5
            data-[state=checked]:text-white
            data-[state=checked]:bg-ubl-green
            dark:data-[state=checked]:bg-ubl-green
            data-[state=checked]:border-ubl-green
          "
        />
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-sm font-medium leading-tight text-zinc-100">
            {lesson.name}
          </span>
          {lesson.duration && (
            <span className="text-xs text-zinc-300">
              {formatDuration(lesson.duration)}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default SubjectProgressSidebarItem;
