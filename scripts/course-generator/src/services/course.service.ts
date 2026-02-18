import { join } from "path";
import type Course from "@/types/course.interface";
import type Lesson from "@/types/lesson.interface";
import type Video from "@/types/video.interface";
import { toLessons } from "@/mappers/lesson.mapper";
import { save } from "@/utils/file";
import YoutubeService from "@/services/youtube.service";

let lastSubjectId: number = 0;

export default class CourseService {
  private readonly youtubeService: YoutubeService;

  constructor(youtubeService: YoutubeService) {
    this.youtubeService = youtubeService;
  }

  public async *iterateLessons(course: Course): AsyncGenerator<{
    semesterIndex: number;
    subjectIndex: number;
    lessons: Lesson[];
  }> {
    console.log(`Grade curricular: ${course.name.toUpperCase()}`);
    for (let semesterIndex = 0; semesterIndex < course.semesters.length; semesterIndex++) {
      const semester = course.semesters[semesterIndex];
      console.log(`> Etapa ${semesterIndex + 1} (Total: ${semester.subjects.length} playlists)`);

      for (let subjectIndex = 0; subjectIndex < semester.subjects.length; subjectIndex++) {
        const subject = semester.subjects[subjectIndex];
        console.log(`>> Disciplina ${subjectIndex + 1}: ${subject.url} (Nome: ${subject.name})`);

        const videos: Video[] = await this.youtubeService.getVideos(this.youtubeService.getPlaylistId(subject.url));
        const videoDurations: Map<string, string> = await this.youtubeService.getVideoDurations(videos.map(video => video.contentDetails.videoId));
        const lessons: Lesson[] = toLessons(videos, videoDurations);
        subject.lessons = lessons.length;

        yield {
          semesterIndex: semesterIndex,
          subjectIndex: subjectIndex,
          lessons: lessons
        };
      }
    }
  }

  public async generate(directory: string, course: Course): Promise<void> {
    for await (const { semesterIndex, subjectIndex, lessons } of this.iterateLessons(course)) {
      const semester = course.semesters[semesterIndex];
      const subject = semester.subjects[subjectIndex];
      subject.duration = lessons.reduce((total, lesson) => total + (lesson.duration ?? 0), 0);

      save(
        join(directory, course.slug.toLowerCase(), "semesters", String(semester.number)),
        `${++lastSubjectId}.json`,
        lessons
      );
    }

    save(
      join(directory, course.slug.toLowerCase()),
      "index.json",
      course
    );
  }
}
