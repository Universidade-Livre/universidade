import CourseProgressSelector from "@/components/modules/courses-progress/course-progress-selector";
import { Binary, Calculator } from "lucide-react";

export const courses = [
  {
    slug: "matematica",
    name: "Matemática",
    description: "Fundamentos e modelos para resolver problemas complexos.",
    icon: Calculator,
    accentText: "text-blue-300",
    accentBorder: "border-blue-400/35",
    accentBackground: "bg-blue-400/10",
  },
  {
    slug: "ciencia-da-computacao",
    name: "Ciência da Computação",
    description: "Algoritmos, dados e sistemas para construir software.",
    icon: Binary,
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-400/35",
    accentBackground: "bg-emerald-400/10",
  },
];

export const CourseProgressSelectorPage = () => {
  return <CourseProgressSelector courses={courses} />;
};

export default CourseProgressSelectorPage;
