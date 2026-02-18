"use client";

import CourseGraph from "@/components/modules/courses/course/node-graphs/course-graph";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type Course from "@/types/course/course.interface";
import { Network, X } from "lucide-react";
import { useState } from "react";

interface CourseGraphDialogProps {
  course: Course;
}

const CourseGraphDialog = ({ course }: CourseGraphDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        size="lg"
        className="cursor-pointer h-10 w-full justify-center rounded-lg border-white/10 bg-zinc-950/40 px-4 text-xs font-semibold uppercase tracking-wide text-zinc-200 hover:bg-zinc-800/70 hover:text-white md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        <Network className="h-4 w-4 text-ubl-green" />
        <span className="whitespace-nowrap">Visualizar como grafo</span>
      </Button>
      <DialogContent
        showCloseButton={false}
        className="flex h-[90vh] w-[90vw] max-w-none flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-0 shadow-xl sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 py-2.5">
          <DialogTitle className="truncate text-xl font-semibold text-white sm:text-2xl">
            {course.name}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              size="icon"
              className="cursor-pointer h-12 w-12 rounded-full border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>
        </div>
        <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
          <CourseGraph course={course} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseGraphDialog;
