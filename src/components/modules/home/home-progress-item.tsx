import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Subject } from "@/types/course/subject.interface";
import { UserSubjectLessonProgress } from "@/types/user-progress/user-subject-lesson-progress.interface";
import Link from "next/link";

interface HomeProgressItemProps {
  subject: Subject;
  subjectProgress: UserSubjectLessonProgress;
}

export const HomeProgressItem = ({ subject, subjectProgress }: HomeProgressItemProps) => {
  return (
    <Card
      key={subject.id}
      className="text-left hover:border-zinc-700/80 p-6 flex flex-col gap-3 min-h-56"
    >
      <CardHeader className="p-0 space-y-1">
        <CardDescription className="font-semibold text-gray-400 leading-tight line-clamp-2 sm:min-h-10 lg:min-h-0">
          {subject.info.course.alternativeName || subject.info.course.name} -
          Etapa {subject.info.semester.number}
        </CardDescription>
        <CardTitle className="p-0 text-left text-xl text-white font-semibold leading-tight line-clamp-1">
          <Tooltip>
            <TooltipTrigger className="p-0 text-left text-xl text-white font-semibold line-clamp-1">
              {subject.name}
            </TooltipTrigger>
            <TooltipContent>
              <p>{subject.name}</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1">
        <div className="flex items-center justify-between text-gray-400 text-base">
          <span>Progresso</span>
          <span className="font-medium text-gray-300">
            {subjectProgress.percentage}%
          </span>
        </div>
        <Progress
          value={subjectProgress.percentage}
          className="bg-zinc-700 h-2 mb-3"
        />
        <Button
          asChild
          variant="secondary"
          className="w-full h-10 bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
        >
          <Link
            href={`/meu-curso/${subject.info.course.slug}/etapas/${subject.info.semester.number}/disciplinas/${subject.number}`}
          >
            Retomar
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeProgressItem;
