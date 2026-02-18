import { courseProgressStoreSchema } from "@/schemas/course-progress/course-progress-store.schema";
import CourseProgressStore from "@/types/course-progress/course-progress-store.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CourseProgressStoreState {
  progress: CourseProgressStore;
  toggleLessonCompletion: (courseSlug: string, semesterNumber: number, subjectNumber: number, lessonNumber: number) => void;
}

export const useCourseProgressStore = create<CourseProgressStoreState>()(
  persist(
    immer((set) => ({
      progress: {},
      toggleLessonCompletion: (courseSlug, semesterNumber, subjectNumber, lessonNumber) => {
        set((state) => {
          const course = (state.progress[courseSlug] ??= {});
          const semester = (course[semesterNumber] ??= {});
          const lessons = (semester[subjectNumber] ??= []);

          if (lessons.includes(lessonNumber)) {
            semester[subjectNumber] = lessons.filter(
              (innerLessonNumber) => innerLessonNumber !== lessonNumber,
            );
          } else {
            lessons.push(lessonNumber);
          }

          const nextLessons = semester[subjectNumber];
          if (!nextLessons || nextLessons.length === 0) {
            delete semester[subjectNumber];
          }

          if (Object.keys(semester).length === 0) {
            delete course[semesterNumber];
          }

          if (Object.keys(course).length === 0) {
            delete state.progress[courseSlug];
          }
        });
      },
    })),
    {
      name: "course-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ progress: state.progress }),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          return;
        }

        const progress = courseProgressStoreSchema.safeParse(state.progress);
        if (!progress.success) {
          console.error("Invalid course progress in storage");
          state.progress = {};
          return;
        }

        state.progress = progress.data;
      },
    },
  ),
);

export default useCourseProgressStore;
