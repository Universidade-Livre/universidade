# Base Images
FROM node:22-trixie-slim AS base
FROM gcr.io/distroless/nodejs22-debian13:nonroot AS base-distroless

# Deps Stage
FROM base AS deps
WORKDIR /app
COPY package*.json .
RUN npm ci

# Build Stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY . .
ENV SKIP_ENV_VALIDATION=true
RUN npx prisma generate && npm run build

# Runtime Stage
FROM base-distroless AS runtime
WORKDIR /app
COPY --from=build --chown=nonroot:nonroot /app/.next/standalone .
COPY --from=build --chown=nonroot:nonroot /app/.next/static .next/static
COPY --from=build --chown=nonroot:nonroot /app/public public

EXPOSE 3000
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    CHECKPOINT_DISABLE=1

CMD ["server.js"]
