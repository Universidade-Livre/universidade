import { toSeconds } from "@/lib/time";
import type { Lesson } from "@/types/lesson.interface";
import type { Video } from "@/types/video.interface";

export default class LessonMapper {
  static toLessonsData(videos: Video[], videoDurations: Map<string, string>): Lesson[] {
    return videos.map((video, index) => {
      const durationISO: string | undefined = videoDurations.get(video.contentDetails.videoId);
      const durationSeconds: number | undefined = durationISO
        ? toSeconds(durationISO)
        : undefined;

      return {
        number: index + 1,
        name: video.snippet.title,
        durationSeconds: durationSeconds,
        embedUrl: `https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`,
      };
    });
  }
}
