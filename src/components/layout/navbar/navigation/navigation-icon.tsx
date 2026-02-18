import { LucideIcon } from "lucide-react";

interface NavigationIconProps {
  icon: LucideIcon;
}

export const NavigationIcon = ({
  icon: Icon,
}: NavigationIconProps) => {
  return (
    <Icon
      className="
      text-zinc-400
        transition-colors
        group-hover/nav-item:text-blue-400
        group-focus/nav-item:text-blue-400
        group-focus-visible/nav-item:text-blue-400
        group-aria-[current=page]/nav-item:text-blue-400
      "
    />
  );
};

export default NavigationIcon;
