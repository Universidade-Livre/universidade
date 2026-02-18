import bannerCCImg from "@/assets/bannerCC.png";
import bannerMathImg from "@/assets/bannerMath.jpeg";

export const courses = [
  {
    slug: "matematica",
    name: "Matemática",
    description: "Um caminho para a educação autodidata em Matemática.",
    image: bannerMathImg,
    className: "bg-gradient-to-r from-ubl-blue/90 via-blue-500/70 to-sky-400/70",
  },
  {
    slug: "ciencia-da-computacao",
    name: "Ciência da Computação",
    description: "Um caminho para a educação autodidata em Ciência da Computação",
    image: bannerCCImg,
    className: "bg-gradient-to-r from-ubl-green/95 via-emerald-500/85 to-green-400/80",
  },
];

export const CoursesPage = () => {
  return <></>;
};

export default CoursesPage;
