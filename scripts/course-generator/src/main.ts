import { join } from "path";
import { courseCC } from "@/data/courseCC";
import { courseMath } from "@/data/courseMath";
import CourseService from "@/services/course.service";
import YoutubeService from "@/services/youtube.service";

async function main() {
  const [, , youtubeApiKey] = process.argv;
  if (!youtubeApiKey) {
    throw new Error("Use: node main.ts <YOUTUBE_API_KEY>");
  }

  const directory: string = join("output");
  const youtubeService: YoutubeService = new YoutubeService(youtubeApiKey);
  const courseService: CourseService = new CourseService(youtubeService);
  for (const course of [courseCC, courseMath]) {
    await courseService.generate(directory, course);
  }
}

main();
