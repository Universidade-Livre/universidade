import { createTRPCRouter, publicProcedure } from "@/server/trpc/trpc";
import { getCourse } from "@/services/course.service";
import { getLessons } from "@/services/lesson.service";
import Course from "@/types/course/course.interface";
import Lesson from "@/types/course/lesson.interface";
import Semester from "@/types/course/semester.interface";
import Subject from "@/types/course/subject.interface";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const lessonRouter = createTRPCRouter({
  bySubject: publicProcedure
    .input(
      z.object({
        courseSlug: z.string().min(1),
        semesterNumber: z.number().int().positive(),
        subjectNumber: z.number().int().positive(),
      }),
    )
    .query(async ({ input }): Promise<Lesson[]> => {
      const course: Course | undefined = await getCourse(input.courseSlug);
      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Curso não encontrado.",
        });
      }

      const semester: Semester | undefined = course.semesters.find((semester) => semester.number === input.semesterNumber);
      const subject: Subject | undefined = semester?.subjects.find((subject) => subject.number === input.subjectNumber);
      if (!subject) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Disciplina não encontrada.",
        });
      }

      const lessons: Lesson[] | undefined = await getLessons(input.courseSlug, input.semesterNumber, subject.id);
      if (!lessons) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Aulas não encontradas.",
        });
      }

      return lessons;
    }),
});
