"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().trim().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
    email: z.email({ message: "Email inválido." }),
    password: z.string().trim().min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
    confirmPassword: z.string().trim().min(8, { message: "A confirmação de senha deve ter pelo menos 8 caracteres." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const signUpAction = async (
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

  const { name, email, password } = data.data;
  const response = await auth.api.signUpEmail({
    body: { name, email, password },
    headers: await headers(),
    asResponse: true,
  });

  if (response.status === 422) {
    return {
      errorMessages: ["Já existe uma conta cadastrada com esse e-mail."],
    };
  }

  if (!response.ok) {
    return {
      errorMessages: [
        "Ocorreu um erro inesperado ao cadastrar sua conta. Tente novamente mais tarde.",
      ],
    };
  }

  redirect("/");
}
