import courseCC from "@/data/courseCC";
import courseMath from "@/data/courseMath";
import { prisma } from "@/lib/prisma";
import CourseService from "@/services/course.service";
import YoutubeService from "@/services/youtube.service";

async function main() {
  const youtubeApiKey: string | undefined = process.env.YOUTUBE_API_KEY;
  if (!youtubeApiKey) {
    throw new Error("A variável de ambiente do YouTube não foi definida.");
  }

  try {
    const youtubeService: YoutubeService = new YoutubeService(youtubeApiKey);
    const courseService: CourseService = new CourseService(youtubeService);
    for (const course of [courseCC, courseMath]) {
      await courseService.create(course);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (e) => {
  console.error(e)
  process.exit(1)
})
