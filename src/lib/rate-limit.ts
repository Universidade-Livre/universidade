import "server-only";

import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

export interface RateLimit {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterInSeconds: number;
  resetAtUnix: number;
}

const limiterMap = new Map<string, RateLimiterMemory>();

export const rateLimitIdentifier = (headers: Pick<Headers, "get">): string => {
  const forwardedFor: string | undefined = headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  const realIp: string | undefined = headers.get("x-real-ip")?.trim();
  return forwardedFor ?? realIp ?? "unknown";
};

export const rateLimit = async (
  options: {
    namespace: string;
    identifier: string;
    limit: number;
    windowInSeconds: number;
  },
): Promise<RateLimit> => {
  const limiterKey: string = `${options.namespace}:${options.limit}:${options.windowInSeconds}`.toLowerCase();
  let limiter: RateLimiterMemory | undefined = limiterMap.get(limiterKey);
  if (!limiter) {
    limiter = new RateLimiterMemory({
      keyPrefix: `rate-limit:${options.namespace}`,
      points: options.limit,
      duration: options.windowInSeconds,
    });

    limiterMap.set(limiterKey, limiter);
  }

  try {
    const result: RateLimiterRes = await limiter.consume(options.identifier);
    const msBeforeNext: number = Math.max(result.msBeforeNext ?? options.windowInSeconds * 1000, 0);
    return {
      allowed: true,
      limit: options.limit,
      remaining: Math.max(result.remainingPoints ?? 0, 0),
      retryAfterInSeconds: 0,
      resetAtUnix: Math.floor((Date.now() + msBeforeNext) / 1000),
    };
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      const msBeforeNext: number = Math.max(error.msBeforeNext ?? options.windowInSeconds * 1000, 0);
      return {
        allowed: false,
        limit: options.limit,
        remaining: Math.max(error.remainingPoints ?? 0, 0),
        retryAfterInSeconds: Math.max(Math.ceil(msBeforeNext / 1000), 1),
        resetAtUnix: Math.floor((Date.now() + msBeforeNext) / 1000),
      };
    }

    return {
      allowed: true,
      limit: options.limit,
      remaining: options.limit,
      retryAfterInSeconds: 0,
      resetAtUnix: Math.floor(Date.now() / 1000) + options.windowInSeconds,
    };
  }
};

export const buildRateLimitResponse = (response: Response, ratelimit: RateLimit): Response => {
  const responseWithHeaders: Response = new Response(response.body, response);
  responseWithHeaders.headers.set("X-RateLimit-Limit", String(ratelimit.limit));
  responseWithHeaders.headers.set("X-RateLimit-Remaining", String(ratelimit.remaining));
  responseWithHeaders.headers.set("X-RateLimit-Reset", String(ratelimit.resetAtUnix));
  return responseWithHeaders;
};

export const buildRateLimitErrorResponse = (ratelimit: RateLimit): Response => {
  const headers: Headers = new Headers();
  headers.set("X-RateLimit-Limit", String(ratelimit.limit));
  headers.set("X-RateLimit-Remaining", String(ratelimit.remaining));
  headers.set("X-RateLimit-Reset", String(ratelimit.resetAtUnix));
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Retry-After", String(Math.max(ratelimit.retryAfterInSeconds, 1)));

  return new Response(
    JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns instantes." }),
    { status: 429, headers },
  );
};
