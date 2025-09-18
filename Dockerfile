# --- builder ---
FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app

# 1) Copier manifest + prisma
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# 2) Empêcher prisma generate auto pendant install/prune
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

# 3) Installer deps
RUN pnpm install --frozen-lockfile

# 4) Copier le reste
COPY . .

# 5) Générer Prisma client (manuellement)
RUN pnpm prisma generate

# 6) Build puis prune prod (toujours avec le skip actif)
RUN pnpm build
RUN pnpm prune --prod

# --- runner ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm","start"]
