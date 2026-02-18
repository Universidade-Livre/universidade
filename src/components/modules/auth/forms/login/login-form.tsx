"use client";

import { AuthFormErrorAlert } from "@/components/modules/auth/forms/auth-form-error-alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/server/actions/auth/login";
import { ArrowRight } from "lucide-react";
import { useActionState, useState } from "react";

export const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(loginAction, {
    errorMessages: [],
  });

  return (
    <form action={formAction} className="space-y-4">
      <AuthFormErrorAlert
        title="Não foi possível entrar na sua conta."
        messages={state.errorMessages}
        className="-mt-4"
      />

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-zinc-200">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-zinc-200">
          Senha
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Digite sua senha"
          minLength={8}
          required
        />
      </div>

      <Label
        htmlFor="rememberMe"
        className="inline-flex cursor-pointer items-center gap-2 text-sm text-zinc-300"
      >
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
        />
        <input
          type="hidden"
          name="rememberMe"
          value={rememberMe ? "true" : "false"}
        />
        <span>Manter sessão ativa neste dispositivo</span>
      </Label>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full cursor-pointer bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
      >
        {isPending ? "Entrando..." : "Entrar"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default LoginForm;
