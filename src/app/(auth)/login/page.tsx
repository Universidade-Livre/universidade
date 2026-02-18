import { LoginForm } from "@/components/modules/auth/forms/login/login-form";
import { AuthCard } from "@/components/modules/auth/auth-card";
import { AuthFooter } from "@/components/modules/auth/auth-footer";
import { AuthHighlight } from "@/components/modules/auth/auth-highlight";
import { AuthHighlightContent } from "@/components/modules/auth/auth-highlight-content";
import { BookOpenCheck } from "lucide-react";

const highlightItems = [
  "Continue exatamente do ponto onde parou.",
  "Acompanhe seu progresso por semestre e disciplina.",
  "Mantenha sua trilha de estudo organizada em um só lugar.",
];

export const LoginPage = () => {
  return (
    <AuthCard
      formTitle="Login"
      formDescription="Preencha os campos para acessar sua conta."
      formClassName="md:order-2"
      gridClassName="md:grid-cols-[1.05fr_0.95fr]"
      highlight={
        <AuthHighlight
          className="bg-linear-to-br from-ubl-blue/35 via-blue-500/20 to-sky-500/10 border-r border-border/60 md:order-1"
          topGlowClassName="-right-16 top-12 bg-blue-400/20"
          bottomGlowClassName="-left-16 bottom-12 bg-ubl-green/20"
        >
          <AuthHighlightContent
            title="Entre para continuar sua jornada de estudos."
            description="Faça login para acessar sua trilha personalizada e seguir com seus estudos de forma consistente."
            items={highlightItems}
            icon={BookOpenCheck}
            iconClassName="text-blue-200"
          />
        </AuthHighlight>
      }
      footer={
        <AuthFooter
          text="Ainda não tem conta?"
          linkHref="/sign-up"
          linkLabel="Criar conta"
          linkClassName="hover:text-blue-300"
        />
      }
    >
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
