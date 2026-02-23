import { prisma } from "@/lib/prisma";
import type { Course as CourseData } from "@/types/course.interface";
import type { Subject as SubjectData } from "@/types/subject.interface";
import type {
  Course as CourseModel,
  Semester as SemesterModel,
  Subject as SubjectModel,
} from "@prisma/client";

export default class CourseRepository {
  static async create(courseData: CourseData): Promise<void> {
    return prisma.$transaction(async (tx) => {
      const courseModel: CourseModel = await tx.course.create({
        data: {
          slug: courseData.slug,
          name: courseData.name,
          alternativeName: courseData.alternativeName ?? null,
        },
      });

      const subjectMap = new Map<string, { data: SubjectData; model: SubjectModel }>();
      for (const semesterData of courseData.semesters) {
        const semesterModel: SemesterModel = await tx.semester.create({
          data: {
            number: semesterData.number,
            courseId: courseModel.id,
          },
        });

        for (const subjectData of semesterData.subjects) {
          const subjectModel: SubjectModel = await tx.subject.create({
            data: {
              number: subjectData.number,
              name: subjectData.name,
              url: subjectData.url,
              books: {
                create: subjectData.books.map((book) => ({
                  name: book.name,
                  url: book.url,
                })),
              },
              semesterId: semesterModel.id,
            },
          });

          subjectMap.set(subjectData.name, {
            data: subjectData,
            model: subjectModel,
          });
        }
      }

      await Promise.all(
        Array.from(subjectMap.values()).map(
          async ({ data: subjectData, model: subjectModel }) => {
            if (subjectData.prerequisites.length === 0) {
              return;
            }

            await tx.subjectPrerequisite.createMany({
              data: subjectData.prerequisites.map((name) => {
                const prerequisite = subjectMap.get(name);
                if (!prerequisite) {
                  throw new Error(`Pré-requisito "${name}" não encontrado`);
                }

                return {
                  dependentId: subjectModel.id,
                  prerequisiteId: prerequisite.model.id,
                };
              }),
            });
          },
        ),
      );
    });
  }
}
