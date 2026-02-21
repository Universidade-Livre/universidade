"use client";

import { UserLessonProgress } from "@/types/user-progress/user-lesson-progress.interface";
import z from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const progressSchema: z.ZodType<UserLessonProgress> = z.object({
  lessons: z.array(z.string()),
});

interface UserLessonProgressStore {
  progress: UserLessonProgress;
  toggleUserLessonProgress: (lessonId: string) => void;
}

export const useUserLessonProgressStore = create<UserLessonProgressStore>()(
  persist(
    immer((set) => ({
      progress: { lessons: [] },
      toggleLessonProgress: (lessonId) => {
        set((state) => {
          const lessons: string[] = state.progress.lessons;
          state.progress.lessons = lessons.includes(lessonId)
            ? lessons.filter((id) => id !== lessonId)
            : [...lessons, lessonId];
        });
      },
    })),
    {
      name: "user-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ progress: state.progress }),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          return;
        }

        const progress = progressSchema.safeParse(state.progress);
        if (!progress.success) {
          console.error("O progresso salvo no Local Storage está corrompido ou em formato inválido.");
          state.progress = { lessons: [] };
          return;
        }

        state.progress = progress.data;
      },
    },
  ),
);

export default useUserLessonProgressStore;
