import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthHighlightProps {
  className?: string;
  topGlowClassName?: string;
  bottomGlowClassName?: string;
  children: ReactNode;
};

export const AuthHighlight = ({
  className,
  topGlowClassName,
  bottomGlowClassName,
  children,
}: AuthHighlightProps) => {
  return (
    <section
      className={cn(
        "relative hidden overflow-hidden p-10 md:flex md:flex-col md:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute h-56 w-56 rounded-full blur-3xl",
          topGlowClassName,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute h-56 w-56 rounded-full blur-3xl",
          bottomGlowClassName,
        )}
      />
      {children}
    </section>
  );
};

export default AuthHighlight;
