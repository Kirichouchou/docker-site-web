# --- builder ---
FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app

# 1) copier manifest + prisma avant install
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# 2) installer deps (le postinstall prisma peut tourner car le schema est là)
RUN pnpm install --frozen-lockfile

# 3) copier le reste du code
COPY . .

# 4) générer prisma (utile si tu as PRISMA_SKIP_POSTINSTALL_GENERATE=true)
RUN pnpm prisma generate || true

# 5) build app + prune prod
RUN pnpm build && pnpm prune --prod

# --- runner ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm","start"]
