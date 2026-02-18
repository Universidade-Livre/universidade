import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthCardProps {
  formTitle: string;
  formDescription: string;
  formClassName?: string;
  gridClassName?: string;
  highlight: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export const AuthCard = ({
  formTitle,
  formDescription,
  highlight,
  footer,
  gridClassName,
  formClassName,
  children,
}: AuthCardProps) => {
  return (
    <main className="relative flex min-h-[calc(100vh-7rem)] w-full items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
      <Card className="w-full max-w-5xl overflow-hidden border-border/60 bg-card/80 py-0 shadow-2xl shadow-black/20 backdrop-blur">
        <CardContent className={cn("grid p-0", gridClassName)}>
          <section className={cn("p-7 sm:p-9", formClassName)}>
            <div className="mb-8 space-y-3">
              <h1 className="text-3xl font-semibold tracking-[-0.015em] text-foreground">
                {formTitle}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {formDescription}
              </p>
            </div>

            {children}
            {footer}
          </section>
          {highlight}
        </CardContent>
      </Card>
    </main>
  );
};

export default AuthCard;
