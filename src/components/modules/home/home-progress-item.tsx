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
import { UserActiveSubject } from "@/types/user-progress/user-active-subject.interface";
import Link from "next/link";

interface HomeProgressItemProps {
  activeSubject: UserActiveSubject;
}

export const HomeProgressItem = ({ activeSubject }: HomeProgressItemProps) => {
  return (
    <Card
      key={activeSubject.subject.id}
      className="text-left hover:border-zinc-700/80 p-6 flex flex-col gap-3"
    >
      <CardHeader className="p-0 space-y-1">
        <CardDescription className="font-semibold text-gray-400 leading-tight line-clamp-2 sm:min-h-10 lg:min-h-0">
          {activeSubject.course.alternativeName || activeSubject.course.name} -
          Etapa {activeSubject.semester.number}
        </CardDescription>
        <CardTitle className="p-0 text-left text-xl text-white font-semibold leading-tight line-clamp-1">
          <Tooltip>
            <TooltipTrigger className="p-0 text-left text-xl text-white font-semibold line-clamp-1">
              {activeSubject.subject.name}
            </TooltipTrigger>
            <TooltipContent>
              <p>{activeSubject.subject.name}</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1">
        <div className="flex items-center justify-between text-gray-400 text-base">
          <span>Progresso</span>
          <span className="font-medium text-gray-300">
            {activeSubject.subjectProgress.percentage}%
          </span>
        </div>
        <Progress
          value={activeSubject.subjectProgress.percentage}
          className="bg-zinc-700 h-2 mb-3"
        />
        <Button
          asChild
          variant="secondary"
          className="w-full h-10 bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
        >
          <Link
            href={`/meu-curso/${activeSubject.course.slug}/etapas/${activeSubject.semester.number}/disciplinas/${activeSubject.subject.number}`}
          >
            Retomar
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeProgressItem;
