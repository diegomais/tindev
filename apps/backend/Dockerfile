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
RUN pnpm install --frozen-lockfile --filter ./apps/backend...

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/mobile/package.json apps/mobile/package.json
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN pnpm run build

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3333
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/mobile/package.json apps/mobile/package.json
RUN pnpm install --frozen-lockfile --prod --filter ./apps/backend...
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express
COPY --from=builder --chown=express:nodejs /app/apps/backend/dist ./apps/backend/dist
WORKDIR /app/apps/backend
USER express
EXPOSE 3333
CMD ["node", "dist/server.js"]
