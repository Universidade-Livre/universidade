export default interface Subject {
  id: number;
  number: number;
  name: string;
  prerequisites: string[];
  url: string;
  duration?: number;
  lessons: number;
  books: {
    name: string;
    url: string;
  }[];
}
