import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export const HomeProgressSkeleton = () => {
  return (
    <div className="mx-auto mb-8 max-w-7xl px-6 sm:mb-10 sm:px-10 md:mb-16 lg:mb-20 lg:px-14">
      <Card className="w-full border-0 bg-card p-10 sm:p-14">
        <CardHeader className="p-0 pb-2">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle className="w-full text-4xl sm:text-5xl md:w-auto md:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.03em]">
              <Skeleton className="h-[1.05em] w-64 max-w-full sm:w-80 md:w-120" />
            </CardTitle>
            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
          <CardDescription className="mt-3 text-base sm:text-lg text-zinc-200/90 font-light leading-relaxed">
            <Skeleton className="h-[1.25em] w-full max-w-xs sm:max-w-md" />
          </CardDescription>
        </CardHeader>
        <ScrollArea className="h-60" viewportClassName="overscroll-y-contain">
          <div className="grid grid-cols-1 items-start gap-6 pt-0 pr-3 sm:grid-cols-2 sm:pr-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="text-left p-6 flex min-h-56 flex-col gap-3">
                <CardHeader className="p-0 space-y-1">
                  <CardDescription className="font-semibold text-gray-400 leading-tight line-clamp-2 sm:min-h-10 lg:min-h-0">
                    <div className="space-y-1">
                      <Skeleton className="h-[1.05em] w-full max-w-44" />
                      <Skeleton className="h-[1.05em] w-3/4 max-w-32" />
                    </div>
                  </CardDescription>
                  <CardTitle className="p-0 text-left text-xl text-white font-semibold leading-tight line-clamp-1">
                    <Skeleton className="h-[1.1em] w-3/4 max-w-40" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-auto p-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-base text-gray-400">
                    <Skeleton className="h-[1.1em] w-20" />
                    <Skeleton className="h-[1.1em] w-10" />
                  </div>
                  <Skeleton className="mb-3 h-2 w-full bg-zinc-700/70" />
                  <Skeleton className="h-10 w-full bg-zinc-300/25" />
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default HomeProgressSkeleton;
