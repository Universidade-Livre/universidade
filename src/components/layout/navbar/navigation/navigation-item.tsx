"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavigationItem {
  href: string;
  children: ReactNode;
}

export const NavigationItem = ({
  href,
  children,
}: NavigationItem) => {
  const pathname: string = usePathname();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          aria-current={
            pathname === href ||
            (href !== "/" && pathname.startsWith(href + "/"))
              ? "page"
              : undefined
          }
          className="
            flex
            flex-row
            gap-2
            items-center
            group/nav-item
            tracking-widest
            text-zinc-400
            hover:bg-transparent
            focus:bg-transparent
            focus-visible:bg-transparent
            hover:text-blue-400
            focus:text-blue-400
            aria-[current=page]:text-blue-400
          "
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavigationItem;
