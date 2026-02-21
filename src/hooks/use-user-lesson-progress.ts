"use client";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc";
import useUserLessonProgressStore from "@/stores/user-lesson-progress-store";
import { UserLessonProgress } from "@/types/user-progress/user-lesson-progress.interface";
import { useShallow } from "zustand/react/shallow";

export const useUserLessonProgress = () => {
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated: boolean = !!session?.user?.id;

  const { data: serverProgress, isLoading } = trpc.userLessonProgress.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const trpcUtils = trpc.useUtils();
  const serverToggleUserLessonProgress = trpc.userLessonProgress.toggleLessonProgress.useMutation({
    onMutate: async ({ lessonId }) => {
      await trpcUtils.userLessonProgress.get.cancel();
      const previousProgress: UserLessonProgress | undefined = trpcUtils.userLessonProgress.get.getData();
      trpcUtils.userLessonProgress.get.setData(
        undefined,
        (currentProgress) => {
          const progress: UserLessonProgress = currentProgress ?? previousProgress ?? { lessons: [] };
          return {
            lessons: progress.lessons.includes(lessonId)
              ? progress.lessons.filter((id) => id !== lessonId)
              : [...progress.lessons, lessonId],
          };
        },
      );

      return { previousProgress };
    },
    onError: (_error, _variables, context) => {
      trpcUtils.userLessonProgress.get.setData(undefined, context?.previousProgress);
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
    toggleLessonProgress: async (lessonId: string) => isAuthenticated
      ? await serverToggleUserLessonProgress.mutateAsync({ lessonId })
      : localToggleUserLessonProgress(lessonId),
    isLoading: isPending || (isAuthenticated && isLoading),
  };
};

export default useUserLessonProgress;
