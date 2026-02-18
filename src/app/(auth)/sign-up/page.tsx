import { SignUpForm } from "@/components/modules/auth/forms/sign-up/sign-up-form";
import { AuthCard } from "@/components/modules/auth/auth-card";
import { AuthFooter } from "@/components/modules/auth/auth-footer";
import { AuthHighlight } from "@/components/modules/auth/auth-highlight";
import { AuthHighlightContent } from "@/components/modules/auth/auth-highlight-content";
import { CheckCircle2 } from "lucide-react";

const highlightItems = [
  "Organize seus estudos por trilhas e etapas.",
  "Acesse conteúdos selecionados para seu objetivo.",
  "Registre seu avanço com visão clara da jornada.",
];

export const SignUpPage = () => {
  return (
    <AuthCard
      formTitle="Criar conta"
      formDescription="Cadastre-se para salvar sua trilha e acompanhar sua evolução."
      formClassName="md:order-1"
      gridClassName="md:grid-cols-[1fr_1fr]"
      highlight={
        <AuthHighlight
          className="bg-linear-to-br from-ubl-green/30 via-emerald-500/20 to-teal-500/10 border-l border-border/60 md:order-2"
          topGlowClassName="-left-16 top-10 bg-emerald-400/20"
          bottomGlowClassName="-right-16 bottom-10 bg-teal-400/20"
        >
          <AuthHighlightContent
            title="Comece sua trilha com objetivos claros."
            description="Crie seu perfil para transformar conteúdos de qualidade em uma rotina de estudo contínua."
            items={highlightItems}
            icon={CheckCircle2}
            iconClassName="text-emerald-200"
          />
        </AuthHighlight>
      }
      footer={
        <AuthFooter
          text="Já possui conta?"
          linkHref="/login"
          linkLabel="Fazer login"
          linkClassName="hover:text-emerald-300"
        />
      }
    >
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUpPage;
