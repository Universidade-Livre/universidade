import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createTRPCContext() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
