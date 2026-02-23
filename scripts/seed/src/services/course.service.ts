import LessonMapper from "@/mappers/lesson.mapper";
import CourseRepository from "@/repositories/course.repository";
import LessonRepository from "@/repositories/lesson.repository";
import YoutubeService from "@/services/youtube.service";
import type { Course } from "@/types/course.interface";
import type { Lesson } from "@/types/lesson.interface";
import type { Semester } from "@/types/semester.interface";
import type { Subject } from "@/types/subject.interface";
import type { Video } from "@/types/video.interface";

export default class CourseService {
  private readonly youtubeService: YoutubeService;

  constructor(youtubeService: YoutubeService) {
    this.youtubeService = youtubeService;
  }

  public async create(course: Course): Promise<void> {
    await CourseRepository.create(course);
    for await (const { semester, subject, lessons } of this.iterateLessons(course)) {
      await LessonRepository.create(course, semester, subject, lessons);
    }
  }

  private async *iterateLessons(course: Course): AsyncGenerator<{
    semester: Semester;
    subject: Subject;
    lessons: Lesson[];
  }> {
    console.log(`Grade Curricular: ${course.name.toUpperCase()}`);
    for (const semester of course.semesters) {
      console.log(`Etapa ${semester.number} (Total: ${semester.subjects.length} playlists)`);
      for (const subject of semester.subjects) {
        console.log(`Disciplina ${subject.number}: ${subject.url} (Nome: ${subject.name})`);
        const videos: Video[] = await this.youtubeService.getVideos(this.youtubeService.getPlaylistId(subject.url));
        const videoDurations: Map<string, string> = await this.youtubeService.getVideoDurations(videos.map(video => video.contentDetails.videoId));
        const lessons: Lesson[] = LessonMapper.toLessonsData(videos, videoDurations);
        yield {
          semester: semester,
          subject: subject,
          lessons: lessons,
        };
      }
    }

    console.log();
  }
}
