import sectionIllustrationImg from "@/assets/sectionIllustration.png";
import sectionIllustrationAltImg from "@/assets/sectionIllustrationAlt.png";
import HomeHero from "@/components/modules/home/home-hero";
import HomeProgress from "@/components/modules/home/home-progress";
import { HomeSection } from "@/components/modules/home/home-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessagesSquare } from "lucide-react";

export const HomePage = () => {
  return (
    <div className="min-h-full h-full bg-transparent text-zinc-100 font-sans">
      <HomeHero />
      <HomeProgress />
      <HomeSection
        title="Customize sua trilha"
        description="Nós organizamos uma completa biblioteca de conteúdos bem avaliados, para então você escolher o jeito que mais combina com seu estilo de aprendizado."
        imageSrc={sectionIllustrationImg}
        imageAlt=""
        className="bg-card"
      />

      <HomeSection
        title="Nossa comunidade pronta para ajudar"
        description="Una-se a outros estudantes e compartilhe suas dúvidas e conhecimentos no nosso Discord."
        imageSrc={sectionIllustrationAltImg}
        imageAlt=""
        imageReverse
        className="bg-accent"
      >
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="cursor-pointer mt-6 mb-6 h-12 bg-zinc-200 text-zinc-900 hover:bg-zinc-300 sm:mb-0"
        >
          <a
            href="https://discord.com/invite/eXUBTY6HAu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MessagesSquare className="w-4 h-4" />
            <span>Entrar no Discord</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </HomeSection>
    </div>
  );
};

export default HomePage;
