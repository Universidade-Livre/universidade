import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SubjectWithProgress from "@/types/course-with-progress/subject-with-progress.interface";
import Link from "next/link";

interface HomeProgressItemProps {
  subjectWithProgress: SubjectWithProgress;
}

export const HomeProgressItem = ({ subjectWithProgress }: HomeProgressItemProps) => {
  return (
    <Card
      key={subjectWithProgress.id}
      className="text-left hover:border-zinc-700/80 p-6 flex flex-col gap-3"
    >
      <CardHeader className="p-0 space-y-1">
        <CardDescription className="font-semibold text-gray-400 leading-tight line-clamp-2 sm:min-h-10 lg:min-h-0">
          {subjectWithProgress.courseAlternativeName} - Etapa{" "}
          {subjectWithProgress.semesterNumber}
        </CardDescription>
        <CardTitle className="p-0 text-left text-xl text-white font-semibold leading-tight line-clamp-1">
          <Tooltip>
            <TooltipTrigger className="p-0 text-left text-xl text-white font-semibold line-clamp-1">
              {subjectWithProgress.name}
            </TooltipTrigger>
            <TooltipContent>
              <p>{subjectWithProgress.name}</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1">
        <div className="flex items-center justify-between text-gray-400 text-base">
          <span>Progresso</span>
          <span className="font-medium text-gray-300">
            {subjectWithProgress.progress}%
          </span>
        </div>
        <Progress
          value={subjectWithProgress.progress}
          className="bg-zinc-700 h-2 mb-3"
        />
        <Button
          asChild
          variant="secondary"
          className="w-full h-10 bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
        >
          <Link
            href={`/meu-curso/${subjectWithProgress.courseSlug}/etapas/${subjectWithProgress.semesterNumber}/disciplinas/${subjectWithProgress.number}`}
          >
            Retomar
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeProgressItem;
