"use server";

import { auth } from "@/lib/auth";
import { rateLimitIdentifier, rateLimit } from "@/lib/rate-limit";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const RATE_LIMIT = {
  limit: 5,
  windowInSeconds: 300
} as const;

const MIN_NAME_LENGTH: number = 3;
const MAX_NAME_LENGTH: number = 100;
const MAX_EMAIL_LENGTH: number = 254;
const MIN_PASSWORD_LENGTH: number = 8;
const MAX_PASSWORD_LENGTH: number = 128;

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(MIN_NAME_LENGTH, { message: `O nome deve ter pelo menos ${MIN_NAME_LENGTH} caracteres.` })
      .max(MAX_NAME_LENGTH, { message: `O nome deve ter no máximo ${MAX_NAME_LENGTH} caracteres.` }),
    email: z
      .email({ message: "Email inválido." })
      .max(MAX_EMAIL_LENGTH, { message: `O email deve ter no máximo ${MAX_EMAIL_LENGTH} caracteres.` }),
    password: z
      .string()
      .trim()
      .min(MIN_PASSWORD_LENGTH, { message: `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.` })
      .max(MAX_PASSWORD_LENGTH, { message: `A senha deve ter no máximo ${MAX_PASSWORD_LENGTH} caracteres.` }),
    confirmPassword: z
      .string()
      .trim()
      .min(MIN_PASSWORD_LENGTH, { message: `A confirmação de senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.` })
      .max(MAX_PASSWORD_LENGTH, { message: `A confirmação de senha deve ter no máximo ${MAX_PASSWORD_LENGTH} caracteres.` }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const signUpAction = async (
  _prevState: { errorMessages: string[] },
  formData: FormData,
): Promise<{ errorMessages: string[] }> => {
  const requestHeaders = await headers();
  const ratelimit = await rateLimit({
    namespace: "action:auth:sign-up:ip",
    identifier: rateLimitIdentifier(requestHeaders),
    ...RATE_LIMIT,
  });

  if (!ratelimit.allowed) {
    return {
      errorMessages: ["Muitas requisições. Tente novamente em alguns instantes."],
    };
  }

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

  const { name, email, password } = data.data;
  const response = await auth.api.signUpEmail({
    body: { name, email, password },
    headers: requestHeaders,
    asResponse: true,
  });

  if (response.status === 422) {
    return {
      errorMessages: ["Não foi possível validar os dados informados. Verifique os campos e tente novamente."],
    };
  }

  if (!response.ok) {
    return {
      errorMessages: ["Ocorreu um erro inesperado ao cadastrar sua conta. Tente novamente mais tarde."],
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  redirect("/");
}
