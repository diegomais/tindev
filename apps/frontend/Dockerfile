FROM node:22-alpine AS base
RUN npm install -g corepack@latest
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/mobile/package.json apps/mobile/package.json
RUN pnpm install --frozen-lockfile --filter ./apps/frontend...

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/mobile/package.json apps/mobile/package.json
COPY apps/frontend ./apps/frontend
WORKDIR /app/apps/frontend
RUN pnpm run build

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/mobile/package.json apps/mobile/package.json
RUN pnpm install --frozen-lockfile --prod --filter ./apps/frontend...
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/next.config.ts ./apps/frontend/next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/package.json ./apps/frontend/package.json
WORKDIR /app/apps/frontend
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["pnpm", "start"]
