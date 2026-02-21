import "server-only";

export interface LessonModel {
  id: string;
  number: number;
  name: string;
  durationSeconds: number | null;
  embedUrl: string;
}
