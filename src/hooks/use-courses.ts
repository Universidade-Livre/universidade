"use client";

import { trpc } from "@/lib/trpc";

export const useCourses = (courseSlugs: string[]) => {
  return trpc.useQueries((t) =>
    courseSlugs.map((courseSlug) =>
      t.course.bySlug(
        { courseSlug: courseSlug },
        {
          staleTime: Infinity,
          gcTime: Infinity,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        },
      ),
    ),
  );
};

export default useCourses;
