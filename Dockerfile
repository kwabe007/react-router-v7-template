FROM node:24.12.0-alpine AS base

RUN corepack enable pnpm


# Install dependencies
FROM base AS deps

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./

RUN pnpm i --frozen-lockfile


# Build source
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# Production image
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/build ./build
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./
COPY --from=builder --chown=nodejs:nodejs /app/instrument.server.mjs ./

USER nodejs

EXPOSE 3000

CMD ["pnpm", "run", "start"]