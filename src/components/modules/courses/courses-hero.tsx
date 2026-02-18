import bannerStudyImg from "@/assets/bannerStudy.jpeg";
import Image from "next/image";

export const CoursesHero = () => {
  return (
    <main className="relative mb-8 flex min-h-72 w-full items-center justify-center overflow-hidden shadow-lg sm:min-h-88 md:min-h-112">
      <div className="absolute inset-0">
        <Image
          src={bannerStudyImg}
          alt="Estudantes estudando em sala de aula"
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 w-full px-6 py-10 text-center sm:px-10">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Sua jornada começa aqui
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-base font-light text-white sm:text-lg md:text-xl">
          Descubra a liberdade de aprender com nossos cursos online gratuitos,
          desenvolvidos para todos os níveis de conhecimento. Aprenda no seu
          ritmo, onde e quando quiser.
        </p>
      </div>
    </main>
  );
};

export default CoursesHero;
