"use client";

import { UserProgress } from "@/types/user-progress/user-progress.interface";
import { UserSubjectProgress } from "@/types/user-progress/user-subject-progress.interface";
import z from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const userProgressSchema: z.ZodType<UserProgress> = z.object({
  courses: z.array(
    z.object({
      slug: z.string(),
      semesters: z.array(
        z.object({
          id: z.string(),
          subjects: z.array(
            z.object({
              id: z.string(),
              lessons: z.array(z.string()),
            }),
          ),
        }),
      ),
    }),
  ),
});

interface UserProgressStore {
  progress: UserProgress;
  getSubjectProgress: (subjectId: string, totalLessons: number) => UserSubjectProgress;
  toggleLessonCompletion: (courseSlug: string, semesterId: string, subjectId: string, lessonId: string) => void;
}

export const useUserProgressStore = create<UserProgressStore>()(
  persist(
    immer((set, get) => ({
      progress: { courses: [] },
      getSubjectProgress: (subjectId, totalLessons) => {
        const subject = get()
          .progress.courses.flatMap((course) => course.semesters)
          .flatMap((semester) => semester.subjects)
          .find((subject) => subject.id === subjectId);

        const completedIds: string[] = subject?.lessons ?? [];
        const total: number = totalLessons ?? 0;
        const completed: number = completedIds.length;
        return {
          percentage: total > 0
            ? Math.round((completed / total) * 100)
            : 0,
          completed: completed,
          completedIds: completedIds,
          total: total,
        };
      },
      toggleLessonCompletion: (courseSlug, semesterId, subjectId, lessonId) => {
        set((state) => {
          let course = state.progress.courses.find((course) => course.slug === courseSlug);
          if (!course) {
            course = { slug: courseSlug, semesters: [] };
            state.progress.courses.push(course);
          }

          let semester = course.semesters.find((semester) => semester.id === semesterId);
          if (!semester) {
            semester = { id: semesterId, subjects: [] };
            course.semesters.push(semester);
          }

          let subject = semester.subjects.find((subject) => subject.id === subjectId);
          if (!subject) {
            subject = { id: subjectId, lessons: [] };
            semester.subjects.push(subject);
          }

          subject.lessons = subject.lessons.includes(lessonId)
            ? subject.lessons.filter((id) => id !== lessonId)
            : [...subject.lessons, lessonId];
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

        const progress = userProgressSchema.safeParse(state.progress);
        if (!progress.success) {
          console.error("O progresso salvo no Local Storage está corrompido ou em formato inválido.");
          state.progress = { courses: [] };
          return;
        }

        state.progress = progress.data;
      },
    },
  ),
);

export default useUserProgressStore;
