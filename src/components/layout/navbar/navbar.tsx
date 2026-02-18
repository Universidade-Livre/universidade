import NavbarAccount from "@/components/layout/navbar/navbar-account";
import Navigation from "@/components/layout/navbar/navigation/navigation";
import NavigationMobile from "@/components/layout/navbar/navigation/navigation-mobile";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="h-14 border-b border-secondary bg-card">
      <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-[auto_1fr] items-center px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center gap-2 justify-self-start">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">UBL</h1>
        </Link>
        <Navigation className="hidden md:flex" />
        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <NavbarAccount />
          <NavigationMobile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
