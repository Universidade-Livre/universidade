import Navigation from "@/components/layout/navbar/navigation/navigation";
import { Menu } from "lucide-react";

export const NavigationMobile = () => {
  return (
    <details className="relative flex items-center md:hidden">
      <summary className="cursor-pointer list-none">
        <Menu size={24} />
      </summary>
      <div className="absolute right-0 top-full z-40 mt-2 w-64 rounded-md border bg-card p-4 shadow-md">
        <Navigation mobile />
      </div>
    </details>
  );
};

export default NavigationMobile;
