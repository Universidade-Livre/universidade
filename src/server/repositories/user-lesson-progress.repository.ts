import "server-only";

import { prisma } from "@/lib/prisma";
import { UserLessonProgressModel } from "@/server/models/user-lesson-progress.model";

export async function toggleUserLessonProgressModelByUserIdAndLessonId(userId: string, lessonId: string): Promise<UserLessonProgressModel> {
  return await prisma.$transaction(async (tx): Promise<UserLessonProgressModel> => {
    const existing = await tx.userLessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
      select: { userId: true, lessonId: true },
    });

    if (existing) {
      return await tx.userLessonProgress.delete({
        where: { userId_lessonId: { userId, lessonId } },
        select: { userId: true, lessonId: true },
      });
    }

    return await tx.userLessonProgress.create({
      data: { userId, lessonId },
      select: { userId: true, lessonId: true },
    });
  });
}
