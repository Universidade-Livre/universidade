export default interface Course {
  id: number;
  slug: string;
  name: string;
  alternativeName: string;
  semesters: {
    id: number;
    number: number,
    subjects: {
      id: number;
      number: number;
      name: string;
      url: string;
      prerequisites: string[];
      duration?: number;
      lessons?: number;
      books: {
        name: string;
        url: string;
      }[];
    }[];
  }[];
}
