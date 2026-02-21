"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const logoutAction = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } finally {
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    redirect("/");
  }
}
