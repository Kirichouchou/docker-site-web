# --- builder : build l'app et le client Prisma ---
FROM node:20-alpine AS builder
WORKDIR /app

# pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@10.17.0 --activate

# 1) Manifests + Prisma (nécessaire pour le postinstall/generate)
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# 2) Empêcher les scripts postinstall auto pendant l'install
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

# 3) Install des deps (prod+dev pour builder)
RUN pnpm install --frozen-lockfile

# 4) Code de l'app
COPY . .

# 5) Générer Prisma Client
RUN pnpm prisma generate

# 6) Build Next en mode standalone (image finale ultra-légère)
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# --- runner : contient juste ce qu'il faut pour exécuter l'app ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Sharp/Next: compatibilité glibc (souvent utile)
RUN apk add --no-cache libc6-compat

# On copie le bundle standalone (inclut les node_modules nécessaires)
COPY --from=builder /app/.next/standalone ./
# Les assets statiques de Next
COPY --from=builder /app/.next/static ./.next/static
# Le dossier public (si tu l'utilises)
COPY --from=builder /app/public ./public

# Expose et CMD
EXPOSE 3000
CMD ["node","server.js"]
