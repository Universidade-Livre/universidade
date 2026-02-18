"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.email({ message: "Email inválido." }),
  password: z.string().trim().min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
  rememberMe: z.preprocess((value) => value === "true", z.boolean()),
});

export const loginAction = async (
  _prevState: { errorMessages: string[] },
  formData: FormData,
): Promise<{ errorMessages: string[] }> => {
  const data = formSchema.safeParse(Object.fromEntries(formData));
  if (!data.success) {
    const messages: string[] = Array.from(
      new Set(data.error.issues.map((issue) => issue.message)),
    );

    return {
      errorMessages: messages.length > 0 ? messages : ["Dados inválidos."],
    };
  }

  const { email, password, rememberMe } = data.data;
  const response = await auth.api.signInEmail({
    body: { email, password, rememberMe },
    headers: await headers(),
    asResponse: true,
  });

  if (response.status === 401) {
    return {
      errorMessages: ["E-mail ou senha inválidos."],
    };
  }

  if (!response.ok) {
    return {
      errorMessages: [
        "Ocorreu um erro inesperado ao entrar na sua conta. Tente novamente mais tarde.",
      ],
    };
  }

  redirect("/");
}
