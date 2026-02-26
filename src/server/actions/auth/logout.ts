"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { rateLimit, rateLimitIdentifier } from "@/lib/rate-limit";

const RATE_LIMIT = {
  limit: 5,
  windowInSeconds: 60
} as const;

export const logoutAction = async () => {
  const requestHeaders = await headers();
  const ratelimit = await rateLimit({
    namespace: "action:auth:logout:ip",
    identifier: rateLimitIdentifier(requestHeaders),
    ...RATE_LIMIT,
  });

  try {
    if (ratelimit.allowed) {
      await auth.api.signOut({
        headers: requestHeaders,
      });
    }
  } finally {
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    redirect("/");
  }
};
