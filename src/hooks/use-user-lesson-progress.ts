"use client";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc";
import useUserLessonProgressStore from "@/stores/user-lesson-progress-store";
import { UserLessonProgress } from "@/types/user-progress/user-lesson-progress.interface";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useUserLessonProgress = () => {
  const { data: session, isPending, refetch } = authClient.useSession();
  const isAuthenticated: boolean = !!session?.user?.id;

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const { data: serverProgress, isLoading, isError } = trpc.userLessonProgress.get.useQuery(undefined, {
    enabled: !isPending && isAuthenticated,
  });

  const trpcUtils = trpc.useUtils();
  const serverToggleUserLessonProgress = trpc.userLessonProgress.toggleLessonProgress.useMutation({
    onMutate: async ({ lessonId }) => {
      await trpcUtils.userLessonProgress.get.cancel();
      const previousData: UserLessonProgress | undefined = trpcUtils.userLessonProgress.get.getData();
      trpcUtils.userLessonProgress.get.setData(
        undefined,
        (currentData) => {
          const progress: UserLessonProgress = currentData ?? previousData ?? { lessons: [] };
          return {
            lessons: progress.lessons.includes(lessonId)
              ? progress.lessons.filter((id) => id !== lessonId)
              : [...progress.lessons, lessonId],
          };
        },
      );

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      trpcUtils.userLessonProgress.get.setData(undefined, context?.previousData);
    },
    onSettled: () => {
      trpcUtils.userLessonProgress.get.invalidate();
    },
  });

  const [localProgress, localToggleUserLessonProgress] = useUserLessonProgressStore(
    useShallow((state) => [
      state.progress,
      state.toggleUserLessonProgress
    ]),
  );

  return {
    progress: isAuthenticated
      ? (serverProgress ?? { lessons: [] })
      : localProgress,
    toggleUserLessonProgress: async (lessonId: string) => isAuthenticated
      ? await serverToggleUserLessonProgress.mutateAsync({ lessonId })
      : localToggleUserLessonProgress(lessonId),
    isLoading: isPending || (isAuthenticated && isLoading),
    isError: isAuthenticated && isError,
  };
};

export default useUserLessonProgress;
