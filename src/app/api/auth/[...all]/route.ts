import { auth } from "@/lib/auth";
import { buildRateLimitErrorResponse, buildRateLimitResponse, rateLimit, rateLimitIdentifier } from "@/lib/rate-limit";
import { toNextJsHandler } from "better-auth/next-js";

const RATE_LIMITS: Record<"GET" | "POST", { limit: number; windowInSeconds: number }> = {
  GET: { limit: 80, windowInSeconds: 60 },
  POST: { limit: 12, windowInSeconds: 60 },
} as const;

const authRouteHandlers = toNextJsHandler(auth);
const handler = async (request: Request, method: "GET" | "POST"): Promise<Response> => {
  const ratelimit = await rateLimit({
    namespace: `route:api:auth:${method.toLowerCase()}`,
    identifier: rateLimitIdentifier(request.headers),
    ...RATE_LIMITS[method],
  });

  if (!ratelimit.allowed) {
    return buildRateLimitErrorResponse(ratelimit);
  }

  const response = method === "GET"
    ? await authRouteHandlers.GET(request)
    : await authRouteHandlers.POST(request);

  return buildRateLimitResponse(response, ratelimit);
};

export const GET = (request: Request) => handler(request, "GET");
export const POST = (request: Request) => handler(request, "POST");
