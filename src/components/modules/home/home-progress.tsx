"use client";

import HomeProgressItem from "@/components/modules/home/home-progress-item";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSubjectsWithProgress, {
  SubjectWithProgressOrder,
} from "@/hooks/use-subjects-with-progress";

export const HomeProgress = () => {
  const { subjectsWithProgress, orderBy, setOrderBy, isLoading, isError } = useSubjectsWithProgress();
  if (!subjectsWithProgress || subjectsWithProgress.length === 0 || isLoading || isError) {
    return null;
  }

  return (
    <div className="mx-auto mb-8 max-w-7xl px-6 sm:mb-10 sm:px-10 md:mb-16 lg:mb-20 lg:px-14">
      <Card className="w-full border-0 bg-card p-10 sm:p-14">
        <CardHeader className="p-0 pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.03em] bg-clip-text text-transparent bg-linear-to-br from-zinc-100 via-zinc-300 to-zinc-400">
              Continue onde parou
            </CardTitle>
            <div className="flex items-center gap-3">
              <span className="uppercase text-xs text-zinc-400">
                Ordenar por
              </span>
              <Select
                value={orderBy}
                onValueChange={(value) =>
                  setOrderBy(value as SubjectWithProgressOrder)
                }
              >
                <SelectTrigger className="w-32 cursor-pointer">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(SubjectWithProgressOrder).map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="cursor-pointer"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription className="mt-3 text-base sm:text-lg text-zinc-200/90 font-light leading-relaxed">
            Retome rapidamente os cursos em andamento.
          </CardDescription>
        </CardHeader>

        <ScrollArea className="h-60">
          <div className="pt-0 pr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {subjectsWithProgress.map((subjectWithProgress) => (
              <HomeProgressItem
                key={subjectWithProgress.id}
                subjectWithProgress={subjectWithProgress}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default HomeProgress;
