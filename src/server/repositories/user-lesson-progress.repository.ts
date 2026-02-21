import "server-only";

import { prisma } from "@/lib/prisma";
import { UserLessonProgressModel } from "@/server/models/user-lesson-progress.model";
import { Prisma } from "@prisma/client";

export async function toggleUserLessonProgressModelByUserIdAndLessonId(userId: string, lessonId: string): Promise<UserLessonProgressModel> {
  return await prisma.$transaction(async (tx): Promise<UserLessonProgressModel> => {
    try {
      return await tx.userLessonProgress.create({
        data: { userId, lessonId },
        select: { userId: true, lessonId: true },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        return await tx.userLessonProgress.delete({
          where: { userId_lessonId: { userId, lessonId } },
          select: { userId: true, lessonId: true },
        });
      }

      throw err;
    }
  });
}
