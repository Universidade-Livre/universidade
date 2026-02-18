import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AuthHighlightContentProps {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  iconClassName: string;
};

export const AuthHighlightContent = ({
  title,
  description,
  items,
  icon: Icon,
  iconClassName,
}: AuthHighlightContentProps) => {
  return (
    <>
      <div className="relative space-y-6">
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.015em] text-zinc-100">
          {title}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-zinc-300">
          {description}
        </p>
      </div>

      <ul className="relative space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200"
          >
            <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconClassName)} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AuthHighlightContent;
