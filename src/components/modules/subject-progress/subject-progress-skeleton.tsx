import { Skeleton } from "@/components/ui/skeleton";

export const SubjectProgressSkeleton = () => {
  return (
    <div className="h-auto min-h-[calc(100dvh-3.5rem)] overflow-x-hidden overflow-y-auto lg:h-[calc(100vh-3.5rem)] lg:overflow-y-hidden">
      <div className="mx-auto h-auto w-full max-w-360 min-h-0 px-4 py-6 sm:px-6 lg:h-full">
        <div className="min-h-0 rounded-lg border border-zinc-800/80 bg-card p-3 shadow-2xl shadow-black/45 ring-1 ring-zinc-700/40 sm:p-4 lg:h-full">
          <div className="grid min-h-0 grid-cols-1 items-stretch gap-0 lg:h-full lg:grid-cols-[minmax(0,5fr)_minmax(0,2fr)]">
            <div className="flex min-h-0 flex-col gap-3 border-b border-zinc-800/80 p-4 sm:gap-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-4 w-4 rounded-sm bg-zinc-300/25" />
                <Skeleton className="h-3 w-20 bg-zinc-300/25 sm:w-24" />
                <Skeleton className="h-3 w-14 bg-zinc-300/20 sm:w-20" />
                <Skeleton className="h-3 w-24 max-w-[35vw] bg-zinc-300/20 sm:w-32" />
              </div>
              <div className="relative h-full w-full min-h-55 aspect-video rounded-md sm:min-h-80 lg:min-h-0 lg:aspect-auto">
                <Skeleton className="h-full w-full rounded-md bg-zinc-700/65" />
              </div>
              <div className="shrink-0 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-4 w-16 rounded-sm bg-zinc-300/25" />
                  <Skeleton className="h-4 w-20 rounded-sm bg-zinc-300/20" />
                </div>
                <Skeleton className="h-8 w-4/5 max-w-3xl bg-zinc-300/25 sm:h-9" />
                <Skeleton className="h-4 w-48 max-w-full bg-zinc-300/20" />
              </div>
            </div>
            <aside className="flex min-h-0 flex-col gap-4 p-4 sm:p-6 lg:h-full">
              <div className="flex items-center justify-between pr-2">
                <Skeleton className="h-7 w-44 max-w-full bg-zinc-300/25" />
                <Skeleton className="h-4 w-16 rounded-sm bg-zinc-300/25" />
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/80">
                <Skeleton className="h-full w-2/5 rounded-full bg-zinc-300/30" />
              </div>
              <div className="flex min-h-0 flex-1 flex-col">
                <ul className="h-[55vh] w-full space-y-2 overflow-hidden pr-4 sm:h-[60vh] lg:h-full">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index}>
                      <div className="flex min-h-[4.6rem] w-full items-start gap-3 rounded-lg border border-zinc-700/80 bg-zinc-900 px-3 py-2.5 shadow-sm shadow-black/20">
                        <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-[0.2rem] bg-zinc-400/25" />
                        <div className="flex w-full flex-col items-start gap-1.5">
                          <Skeleton className="h-4 w-[78%] bg-zinc-300/25" />
                          <Skeleton className="h-3.5 w-20 bg-zinc-300/20" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectProgressSkeleton;
