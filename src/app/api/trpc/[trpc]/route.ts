import { buildRateLimitErrorResponse, buildRateLimitResponse, rateLimitIdentifier, rateLimit } from "@/lib/rate-limit";
import { createTRPCContext } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const RATE_LIMITS: Record<"GET" | "POST", { limit: number; windowInSeconds: number }> = {
  GET: { limit: 100, windowInSeconds: 60 },
  POST: { limit: 50, windowInSeconds: 60 },
} as const;

const handler = async (req: Request, method: "GET" | "POST"): Promise<Response> => {
  const ratelimit = await rateLimit({
    namespace: `route:api:trpc:${method.toLowerCase()}`,
    identifier: rateLimitIdentifier(req.headers),
    ...RATE_LIMITS[method],
  });

  if (!ratelimit.allowed) {
    return buildRateLimitErrorResponse(ratelimit);
  }

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req,
    router: appRouter,
    createContext: createTRPCContext,
  });

  return buildRateLimitResponse(response, ratelimit);
};

export const GET = (req: Request) => handler(req, "GET");
export const POST = (req: Request) => handler(req, "POST");
