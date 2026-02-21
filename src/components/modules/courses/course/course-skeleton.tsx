import ViewportAnchor from "@/components/common/viewport-anchor";
import { Skeleton } from "@/components/ui/skeleton";

export const CourseSkeleton = () => {
  return (
    <ViewportAnchor className="mx-auto mb-20 w-full max-w-6xl container px-6 sm:px-8">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md sm:h-12 sm:w-12 md:h-14 md:w-14" />
          <Skeleton className="h-8 w-52 max-w-full sm:h-9 sm:w-72" />
        </div>
        <div className="hidden h-1.5 flex-1 self-center rounded-full bg-zinc-700/70 md:block" />
        <Skeleton className="h-12 w-full rounded-md bg-zinc-300/25 md:w-52 lg:w-56" />
      </div>

      <ul className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="overflow-hidden rounded-xl bg-card shadow-lg shadow-black"
          >
            <div className="rounded-xl bg-zinc-900 p-4 sm:p-6">
              <div className="flex w-full flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:items-end">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-44 bg-zinc-700/75 sm:w-48" />
                  <Skeleton className="h-11 w-40 bg-zinc-300/20 sm:w-48" />
                </div>

                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
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

                  <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end">
                    <div className="space-y-1 px-3 py-1">
                      <Skeleton className="h-2.5 w-14 bg-zinc-700/75" />
                      <Skeleton className="h-3 w-16 bg-zinc-300/20" />
                    </div>
                    <Skeleton className="h-5 w-5 rounded-full bg-zinc-400/30" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ViewportAnchor>
  );
};

export default CourseSkeleton;
