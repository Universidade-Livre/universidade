"use client";

import { trpc } from "@/lib/trpc";
import useUserLessonProgressStore from "@/stores/user-lesson-progress-store";
import { UserLessonProgress } from "@/types/user-progress/user-lesson-progress.interface";
import { useShallow } from "zustand/react/shallow";

const toggleLessonIdInProgress = (progress: UserLessonProgress, lessonId: string): UserLessonProgress => {
  const lessons: string[] = progress.lessons.includes(lessonId)
    ? progress.lessons.filter((id) => id !== lessonId)
    : [...progress.lessons, lessonId];

  return { lessons };
};

export const useUserLessonProgress = () => {
  const trpcUtils = trpc.useUtils();
  const { data: serverProgress, isLoading, error: serverProgressError } = trpc.userProgress.get.useQuery(undefined, {
    retry: false,
  });

  const isServerProgressUnauthorized: boolean = serverProgressError?.data?.code === "UNAUTHORIZED";
  const shouldUseServerProgress: boolean = !isServerProgressUnauthorized;
  const serverToggleLessonProgress = trpc.userProgress.toggleLessonProgress.useMutation({
    onMutate: async ({ lessonId }) => {
      await trpcUtils.userProgress.get.cancel();
      const previousProgress: UserLessonProgress | undefined = trpcUtils.userProgress.get.getData();
      trpcUtils.userProgress.get.setData(
        undefined,
        (currentProgress): UserLessonProgress => toggleLessonIdInProgress(
          currentProgress ?? previousProgress ?? { lessons: [] },
          lessonId,
        ),
      );

      return { previousProgress };
    },
    onError: (_error, _variables, context) => {
      trpcUtils.userProgress.get.setData(undefined, context?.previousProgress);
    },
    onSettled: () => {
      trpcUtils.userProgress.get.invalidate();
    },
  });

  const [localProgress, localToggleLessonProgress] = useUserLessonProgressStore(
    useShallow((state) => [
      state.progress,
      state.toggleLessonProgress
    ]),
  );

  return {
    progress: shouldUseServerProgress
      ? (serverProgress ?? { lessons: [] })
      : localProgress,
    toggleLessonProgress: async (lessonId: string) => shouldUseServerProgress
      ? await serverToggleLessonProgress.mutateAsync({ lessonId })
      : localToggleLessonProgress(lessonId),
    isLoading: shouldUseServerProgress && isLoading,
  };
};

export default useUserLessonProgress;
