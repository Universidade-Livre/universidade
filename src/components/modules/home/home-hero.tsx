import bannerSimpleImg from "@/assets/bannerSimple.png";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight, BookOpen, Map, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HomeHero = () => {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-10 sm:gap-12 sm:px-10 sm:py-12 md:min-h-[calc(100svh-3.5rem)] md:flex-row md:gap-16 md:py-0 lg:px-14">
      <div className="flex order-last flex-1 flex-col items-center text-center md:order-0 md:items-start md:text-left">
        <h1 className="mb-6 sm:mb-7 text-[3rem] sm:text-5xl md:text-[5.1rem] lg:text-[5.6rem] font-semibold leading-none sm:leading-[0.95] tracking-[-0.03em] bg-clip-text text-transparent bg-linear-to-br from-ubl-green to-ubl-blue">
          Universidade{" "}
          <span className="whitespace-nowrap">Brasileira Livre</span>
        </h1>

        <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-100/90 sm:text-xl md:text-2xl">
          Uma plataforma{" "}
          <span className="font-semibold text-zinc-50">
            sem fins lucrativos
          </span>{" "}
          de apoio de estudantes e conhecimentos em torno de diferentes
          currículos de código aberto.
        </p>

        <div className="mt-6 sm:mt-8">
          <TypewriterEffect
            words={[
              { text: "Planeje," },
              { text: "acompanhe" },
              { text: "e" },
              { text: "aprenda." },
            ]}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-left"
            cursorClassName="bg-ubl-blue h-4 sm:h-5 md:h-7 lg:h-9"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full mt-8 sm:mt-10 max-w-2xl mx-auto md:mx-0">
          <Button
            asChild
            size={"lg"}
            className="h-12 bg-zinc-800/95 text-zinc-100 shadow-lg shadow-black/30 hover:bg-zinc-800/80 sm:h-14"
          >
            <a
              href="https://github.com/Universidade-Livre"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span className="text-base sm:text-xl">Sobre nós</span>
            </a>
          </Button>

          <Button
            asChild
            size={"lg"}
            className="h-12 bg-ubl-blue/80 text-white hover:bg-ubl-blue/90 sm:h-14"
          >
            <Link href="/grade-curricular" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span className="text-base sm:text-xl">Explorar Grade</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            asChild
            size={"lg"}
            className="col-span-1 h-12 bg-ubl-green/80 text-white hover:bg-ubl-green/90 sm:col-span-2 sm:h-14"
          >
            <Link href="/meu-curso" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-base sm:text-xl">Começar a Estudar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex order-first w-full flex-1 items-center justify-center md:order-0">
        <Image
          src={bannerSimpleImg}
          alt="Banner UBL"
          priority
          className="w-full max-w-48 sm:max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain"
        />
      </div>
    </main>
  );
};

export default HomeHero;
