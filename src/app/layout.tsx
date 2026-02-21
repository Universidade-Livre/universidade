import Providers from "@/app/providers";
import BackgroundGrid from "@/components/layout/background-grid";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Exo_2, Roboto } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode } from "react";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Universidade Brasileira Livre",
  description: "Uma plataforma sem fins lucrativos de apoio de estudantes e conhecimentos em torno de diferentes currículos de código aberto.",
};

export const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="pt-BR" className={cn("dark", exo2.variable, roboto.variable)}>
      <body className="min-h-screen">
        <Providers key={session?.user?.id}>
          <BackgroundGrid />
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
