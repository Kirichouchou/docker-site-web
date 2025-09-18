# --- builder ---
FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app

# 1) manifest + prisma
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# 2) pas de generate auto
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

# 3) install
RUN pnpm install --frozen-lockfile

# 4) code
COPY . .

# 5) generate manuel
RUN pnpm prisma generate

# 6) build puis prune prod (sans scripts)
RUN pnpm build
RUN pnpm prune --prod --ignore-scripts

# --- runner ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm","start"]
