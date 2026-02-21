"use client";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc";
import useUserLessonProgressStore from "@/stores/user-lesson-progress-store";
import { useShallow } from "zustand/react/shallow";

export const useUserLessonProgress = () => {
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated: boolean = !!session?.user?.id;

  const { data: serverProgress, isLoading } = trpc.userProgress.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const trpcUtils = trpc.useUtils();
  const serverToggleLessonProgress = trpc.userProgress.toggleLessonProgress.useMutation({
    onSuccess: () => {
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
    progress: isAuthenticated
      ? (serverProgress ?? { lessons: [] })
      : localProgress,
    toggleLessonProgress: async (lessonId: string) => isAuthenticated
      ? await serverToggleLessonProgress.mutateAsync({ lessonId })
      : localToggleLessonProgress(lessonId),
    isLoading: isPending || (isAuthenticated && isLoading),
  };
};

export default useUserLessonProgress;
