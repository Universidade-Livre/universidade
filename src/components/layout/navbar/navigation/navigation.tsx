import NavigationIcon from "@/components/layout/navbar/navigation/navigation-icon";
import { NavigationItem } from "@/components/layout/navbar/navigation/navigation-item";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookMarked, Home, Map } from "lucide-react";

interface NavigationProps {
  mobile?: boolean;
  className?: string;
}

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Grade Curricular", href: "/grade-curricular", icon: Map },
  { label: "Meu Curso", href: "/meu-curso", icon: BookMarked },
];

export const Navigation = ({
  mobile = false,
  className,
}: NavigationProps) => {
  return (
    <NavigationMenu
      className={cn(
        "justify-self-center",
        mobile && "w-full max-w-none justify-start",
        className,
      )}
    >
      <NavigationMenuList
        className={cn("gap-6 font-mono", mobile && "flex-col items-start")}
      >
        {items.map((item) => (
          <NavigationItem key={item.href} href={item.href}>
            <NavigationIcon icon={item.icon} />
            <span>{item.label}</span>
          </NavigationItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
