import { prisma } from "@/lib/prisma";
import type CourseData from "@/types/course.interface";
import type LessonData from "@/types/lesson.interface";
import type SemesterData from "@/types/semester.interface";
import type SubjectData from "@/types/subject.interface";

export default class LessonRepository {
  static async create(
    courseData: CourseData,
    semesterData: SemesterData,
    subjectData: SubjectData,
    lessonsData: LessonData[],
  ): Promise<void> {
    const subjectModel = await prisma.subject.findFirst({
      where: {
        number: subjectData.number,
        semester: {
          number: semesterData.number,
          course: {
            slug: courseData.slug,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (!subjectModel) {
      throw new Error(`Disciplina não encontrada: Curso ${courseData.slug}, Etapa ${semesterData.number}, Disciplina ${subjectData.number}`);
    }

    await prisma.lesson.createMany({
      data: lessonsData.map((lessonData) => ({
        number: lessonData.number,
        name: lessonData.name,
        durationSeconds: lessonData.durationSeconds ?? null,
        embedUrl: lessonData.embedUrl,
        subjectId: subjectModel.id,
      })),
      skipDuplicates: true,
    });
  }
}
