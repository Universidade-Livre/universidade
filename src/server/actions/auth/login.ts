"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const MIN_PASSWORD_LENGTH: number = 8;
const MAX_EMAIL_LENGTH: number = 254;
const MAX_PASSWORD_LENGTH: number = 128;

const formSchema = z.object({
  email: z
    .email({ message: "Email inválido." })
    .max(MAX_EMAIL_LENGTH, { message: `O email deve ter no máximo ${MAX_EMAIL_LENGTH} caracteres.` }),
  password: z.string().trim()
    .min(MIN_PASSWORD_LENGTH, { message: `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.` })
    .max(MAX_PASSWORD_LENGTH, { message: `A senha deve ter no máximo ${MAX_PASSWORD_LENGTH} caracteres.` }),
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
      errorMessages: messages.length > 0
        ? messages
        : ["Não foi possível validar os dados informados. Verifique os campos e tente novamente."],
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
      errorMessages: ["Não foi possível validar os dados informados. Verifique os campos e tente novamente."],
    };
  }

  if (!response.ok) {
    return {
      errorMessages: ["Ocorreu um erro inesperado ao entrar na sua conta. Tente novamente mais tarde."],
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  redirect("/");
}
