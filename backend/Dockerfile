FROM node:22-alpine AS base
RUN npm install -g corepack@latest
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base as runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV MONGODB_URI=mongodb://localhost:27017/tindev

EXPOSE 3333

CMD pnpm start
