import type Lesson from "@/types/lesson.interface";
import type Video from "@/types/video.interface";
import { toSeconds } from "@/utils/time";

let lastLessonId: number = 0;

export function toLessons(videos: Video[], videoDurations: Map<string, string>): Lesson[] {
  return videos.map((video, index) => {
    const durationISO: string | undefined = videoDurations.get(video.contentDetails.videoId);
    const duration: number | undefined = durationISO ? toSeconds(durationISO) : undefined;
    return {
      id: ++lastLessonId,
      number: index + 1,
      name: video.snippet.title,
      duration: duration,
      embedUrl: `https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`,
    };
  });
}
