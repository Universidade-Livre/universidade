# Base Image
FROM node:22-alpine AS base

# Deps Stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json .
RUN npm ci && npm i -g --prefix=/opt/prisma --save-exact "prisma@$(node -p "require('./package.json').devDependencies.prisma")"

# Build Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY . .
RUN npx prisma generate && npm run build

# Runtime Stage
FROM base AS runtime
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --from=deps --chown=nextjs:nodejs /opt/prisma /opt/prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/.next/static .next/static
COPY --from=builder --chown=nextjs:nodejs /app/public public
COPY --from=builder --chown=nextjs:nodejs /app/prisma prisma

USER nextjs
EXPOSE 3000 5555
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    PATH=/opt/prisma/bin:${PATH} \
    CHECKPOINT_DISABLE=1

CMD ["sh", "-c", "prisma migrate deploy && (prisma studio --hostname 0.0.0.0 --port 5555 &) && node server.js"]
