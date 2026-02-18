"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";

interface SubjectBooksToggleProps {
  children: ReactNode;
}

export const SubjectBooksToggle = ({ children }: SubjectBooksToggleProps) => {
  const [showBooks, setShowBooks] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowBooks((prev) => !prev)}
        className="mt-4 flex w-full items-center justify-center gap-2 border-white/20 bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/20 sm:mt-0 sm:ml-4 sm:w-auto"
      >
        <BookOpen className="h-4 w-4" />
        <span className="hidden sm:inline cursor-pointer">Recomendações</span>
        <span className="flex items-center">
          {showBooks ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </Button>
      {showBooks && <div className="w-full sm:order-last">{children}</div>}
    </>
  );
};

export default SubjectBooksToggle;
