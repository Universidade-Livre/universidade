import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const CourseProgressSkeleton = () => {
  return (
    <div className="mb-10 flex w-full flex-col space-y-8">
      <div className="flex w-full flex-col items-center space-y-4">
        <Skeleton className="h-10 w-64 max-w-full sm:w-80 md:w-96" />
        <div className="w-full">
          <div className="mx-auto w-max min-w-full lg:min-w-0">
            <div className="flex w-max min-w-full gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-1 backdrop-blur-sm lg:min-w-0">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative flex h-9 items-center rounded-lg border px-3 sm:h-10 sm:px-4 md:px-6",
                    index === 1
                      ? "border-zinc-700 bg-zinc-800 shadow-lg shadow-black/20"
                      : "border-transparent",
                  )}
                >
                  <Skeleton
                    className={cn(
                      "h-3 rounded-sm",
                      index % 3 === 0
                        ? "w-14 sm:w-[3.9rem]"
                        : index % 3 === 1
                          ? "w-[3.8rem] sm:w-[4.2rem]"
                          : "w-[3.65rem] sm:w-16",
                      index === 1 ? "bg-zinc-300/30" : "bg-zinc-400/20",
                    )}
                  />
                  {index === 1 ? (
                    <span className="absolute -bottom-px left-1/2 h-0.5 w-1/3 -translate-x-1/2 rounded-full bg-blue-500/70" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border bg-zinc-900/80 p-5 sm:p-6 md:p-8">
            <div className="relative z-10 flex w-full flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:items-end">
              <div className="space-y-3">
                <Skeleton className="h-4 w-40 bg-zinc-700/75" />
                <Skeleton className="h-10 w-36 bg-zinc-300/20 sm:w-44" />
              </div>
              <div className="flex w-full flex-col gap-4 rounded-xl border border-white/5 bg-zinc-950/30 p-4 backdrop-blur-md sm:w-auto sm:flex-row sm:items-center">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-7 w-7 rounded-md bg-zinc-700/75" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-2.5 w-16 bg-zinc-700/75" />
                    <Skeleton className="h-4 w-8 bg-zinc-300/20" />
                  </div>
                </div>
                <div className="h-px w-full bg-zinc-800 sm:h-8 sm:w-px" />
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-7 w-7 rounded-md bg-zinc-700/75" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-2.5 w-12 bg-zinc-700/75" />
                    <Skeleton className="h-4 w-24 bg-zinc-300/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="flex flex-col items-start gap-4 border border-zinc-600/75 bg-zinc-900/70 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
              >
                <Skeleton className="h-12 w-12 rounded-lg border border-zinc-600/70 bg-zinc-800/80 sm:h-14 sm:w-14" />
                <div className="w-full flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Skeleton className="h-6 w-48 max-w-full bg-zinc-300/20" />
                    <Skeleton className="hidden h-7 w-24 rounded-full bg-zinc-300/25 sm:flex" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3.5 w-24 bg-zinc-300/25" />
                      <Skeleton className="h-3.5 w-10 bg-zinc-300/25" />
                    </div>
                    <Skeleton className="h-1.5 w-full rounded-full bg-zinc-700/70" />
                    <Skeleton className="h-3.5 w-44 max-w-full bg-zinc-300/20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressSkeleton;
