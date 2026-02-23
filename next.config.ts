import { env } from "@/env";
import type { NextConfig } from "next";

const buildContentSecurityPolicyHeader = (frameSources?: string[]): string => {
  return `
      default-src 'self';
      script-src 'self' 'unsafe-inline'${env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      frame-src ${frameSources ? frameSources.join(" ") : "'none'"};
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();
};

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicyHeader(),
          },
          {
            key: "Permissions-Policy",
            value: "camera=(); battery=(); geolocation=(); microphone=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source:  "/meu-curso/:courseSlug/etapas/:semesterNumber/disciplinas/:subjectNumber/aulas/:lessonId",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicyHeader(["https://www.youtube.com"]),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
