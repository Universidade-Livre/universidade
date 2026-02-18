import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";

interface LessonProgressBreadcrumbProps {
  courseAlternativeName: string;
  subjectName: string;
  lessonName: string;
}

export const LessonProgressBreadcrumb = ({ courseAlternativeName, subjectName, lessonName }: LessonProgressBreadcrumbProps) => {
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
              {courseAlternativeName}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight size={14} />
        </BreadcrumbSeparator>

        <BreadcrumbItem className="min-w-0">
          <BreadcrumbLink asChild>
            <Link href=".." className="block truncate hover:text-zinc-200">
              {subjectName}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight size={14} />
        </BreadcrumbSeparator>

        <BreadcrumbItem className="min-w-0 flex-1">
          <BreadcrumbPage className="block truncate font-normal text-zinc-400">
            {lessonName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default LessonProgressBreadcrumb;
