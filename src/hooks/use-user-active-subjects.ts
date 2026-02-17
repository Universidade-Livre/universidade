"use client";

import useCourses from "@/hooks/use-courses";
import useUserProgressStore from "@/stores/user-progress-store";
import { Course } from "@/types/course/course.interface";
import { UserActiveSubject } from "@/types/user-progress/user-active-subject.interface";
import { useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export enum UserActiveSubjectOrder {
  Progress = "progresso",
  Semester = "etapa",
  Course = "curso",
}

export const useUserActiveSubjects = () => {
  const [orderBy, setOrderBy] = useState<UserActiveSubjectOrder>(UserActiveSubjectOrder.Progress);
  const [progress, getSubjectProgress] = useUserProgressStore(
    useShallow((state) => [
      state.progress,
      state.getSubjectProgress,
    ]),
  );

  const courseQueries = useCourses(progress?.courses?.map((course) => course.slug) ?? []);
  const unorderedActiveSubjects: UserActiveSubject[] = useMemo<UserActiveSubject[]>(() => {
    return courseQueries
      .map((query) => query.data)
      .filter((course): course is Course => course != null)
      .flatMap((course) =>
        course.semesters.flatMap((semester) =>
          semester.subjects.map((subject) => ({
            course: course,
            semester: semester,
            subject: subject,
            subjectProgress: getSubjectProgress(
              subject.id,
              subject.lessons
            ),
          })),
        ),
      )
      .filter(({ subjectProgress }) => subjectProgress.completed > 0);
  }, [courseQueries, getSubjectProgress]);

  const orderedActiveSubjects: UserActiveSubject[] = useMemo<UserActiveSubject[]>(() => {
    return [...unorderedActiveSubjects].sort((a, b) => {
      switch (orderBy) {
        case UserActiveSubjectOrder.Progress:
          return b.subjectProgress.percentage - a.subjectProgress.percentage;
        case UserActiveSubjectOrder.Semester:
          return a.semester.number - b.semester.number;
        case UserActiveSubjectOrder.Course:
          return a.course.name.localeCompare(b.course.name);
        default:
          return 0;
      }
    });
  }, [orderBy, unorderedActiveSubjects]);

  return {
    activeSubjects: orderedActiveSubjects,
    orderBy: orderBy,
    setOrderBy: setOrderBy,
    isLoading: courseQueries.some((query) => query.isLoading),
    isError: courseQueries.some((query) => query.isError),
  };
};

export default useUserActiveSubjects;
