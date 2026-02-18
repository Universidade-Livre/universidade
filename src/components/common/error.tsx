import errorIllustration from "@/assets/error.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ErrorProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export const Error = ({ title, description, eyebrow }: ErrorProps) => {
  return (
    <main className="relative flex min-h-[calc(100vh-7rem)] w-full items-center justify-center overflow-hidden bg-background px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
      <Card className="relative w-full max-w-4xl overflow-hidden border-border/60 bg-card/70 shadow-2xl shadow-black/20 backdrop-blur">
        <CardContent className="grid items-center gap-7 p-7 sm:gap-8 sm:p-9 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:p-10">
          <div className="order-last space-y-2.5 text-center md:order-first">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-3xl font-semibold leading-[1.03] tracking-[-0.015em] text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
            <div className="pt-4 sm:pt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/">
                <Button className="cursor-pointer bg-white text-zinc-900 hover:bg-zinc-100 px-9 py-6 text-base sm:text-lg h-12 sm:h-13 shadow-lg shadow-black/20">
                  Voltar para o início
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-first flex items-center justify-center md:order-last">
            <Image
              src={errorIllustration}
              alt="Ilustração de erro"
              priority
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Error;
