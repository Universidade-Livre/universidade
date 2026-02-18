import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import type { ReactNode } from "react";

interface HomeSectionProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  imageReverse?: boolean;
  children?: ReactNode;
  className?: string;
}

export const HomeSection = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imageReverse = false,
  children,
  className,
}: HomeSectionProps) => {
  return (
    <section
      className={cn(
        className,
        "flex items-center justify-center px-6 sm:px-10 lg:px-14 py-4 sm:py-6 lg:py-8",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center max-w-6xl w-full mx-auto",
          imageReverse ? "md:[&>div:first-child]:order-2" : "",
        )}
      >
        <div className="space-y-4">
          <h2 className="mb-4 text-4xl sm:text-5xl md:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.03em] bg-clip-text text-transparent bg-linear-to-br from-zinc-100 via-zinc-300 to-zinc-400">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-200/90 font-light leading-relaxed">
            {description}
          </p>
          {children}
        </div>
        <div
          className={cn(
            "flex items-center justify-center order-first md:order-0",
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-40 sm:max-w-xs md:max-w-sm lg:max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
};
