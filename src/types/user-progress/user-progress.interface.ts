export interface UserProgress {
  courses: {
    slug: string;
    semesters: {
      id: string;
      subjects: {
        id: string;
        lessons: string[];
      }[];
    }[];
  }[];
}
