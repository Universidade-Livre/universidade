"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } finally {
    redirect("/");
  }
}
