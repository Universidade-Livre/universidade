import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Lesson } from "@/types/course/lesson.interface";
import { ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";

interface LessonProgressBreadcrumbProps {
  lesson: Lesson;
}

export const LessonProgressBreadcrumb = ({ lesson }: LessonProgressBreadcrumbProps) => {
  return (
    <Breadcrumb className="shrink-0">
      <BreadcrumbList className="min-w-0 flex-nowrap text-sm text-zinc-400">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="hover:text-zinc-200">
              <HomeIcon size={14} />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight size={14} />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="../../.." className="hover:text-zinc-200">
              {lesson.info.course.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight size={14} />
        </BreadcrumbSeparator>

        <BreadcrumbItem className="min-w-0">
          <BreadcrumbLink asChild>
            <Link href=".." className="block truncate hover:text-zinc-200">
              {lesson.info.subject.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight size={14} />
        </BreadcrumbSeparator>

        <BreadcrumbItem className="min-w-0 flex-1">
          <BreadcrumbPage className="block truncate font-normal text-zinc-400">
            {lesson.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default LessonProgressBreadcrumb;
