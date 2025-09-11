# Mini Boutique — Next.js 14 + Stripe + Auth JWT + Prisma

Mini-boutique avec 2 produits, paiement Stripe Checkout, gating de la page `/formation` après achat, design arrondi, responsive, et CTA visible. Authentification par e-mail + mot de passe (JWT) et endpoints Admin pour gérer les accès.

## Installation

1) Cloner le repo
2) Installer les dépendances: `pnpm install`
3) Configurer `.env` (voir section Vars)
4) Générer Prisma Client, migrer et seed:

```bash
pnpm prisma:generate
pnpm db:migrate
pnpm db:seed
```

5) Démarrer en dev: `pnpm dev` (http://localhost:3000)

## Variables d'environnement

- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (si NextAuth utilisé)
- `JWT_SECRET` (auth personnalisée JWT)
- `PRICE_ID_PRODUCT_A`, `PRICE_ID_PRODUCT_B`, `PRICE_AMOUNT_PRODUCT_A`, `PRICE_AMOUNT_PRODUCT_B`
- `DATABASE_PROVIDER` (`sqlite` par défaut) et `DATABASE_URL`

## Auth & Accès

- Login `/login` (e-mail + mot de passe) — cookie HTTP-only `token` (JWT, 30 min)
- Endpoints:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/forgot`
  - `POST /api/auth/reset`
- Admin (JWT role=ADMIN):
  - `GET /api/admin/purchases`
  - `POST /api/admin/purchases/:id/toggle-access`
  - `PATCH /api/admin/users/:id/email`
  - `PATCH /api/admin/users/:id/password`

La page `/formation` vérifie que l’utilisateur possède un `Purchase` avec `accessActive = true`.

## Stripe

1) Créez 2 Prices dans Stripe et mettez leurs IDs dans `.env`
2) Webhook local: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
3) Paiement test: page d’accueil → acheter → carte 4242… → redirection

## DB & Prisma

- Modèles:
  - `User { id, email, passwordHash, role, createdAt, updatedAt }`
  - `Product { id, key, name, priceId, amount(priceCents), isActive, createdAt, updatedAt }`
  - `Purchase { id, userId, productId, paidAt, accessActive, createdAt, updatedAt }`
  - (Legacy) `Order`, `Access` conservés pour compatibilité
- Contraintes/index: uniques sur `User.email`, `Product.key`, `Purchase (userId,productId)`
- Provider piloté par `.env` (sqlite/postgresql)

## Seed

`pnpm db:seed` crée:

- 2 produits actifs
- 1 admin (admin@example.com / Admin123!)
- 2 users (alice/bob@example.com / User1234!)
- 3 achats (dont un accès désactivé)

## Scripts utiles

- `pnpm dev`, `pnpm build`, `pnpm start`
- `pnpm prisma:generate`, `pnpm db:push`, `pnpm db:migrate`, `pnpm db:seed`

## Changelog (DB & API)

- Ajout `User.passwordHash`, `User.role`
- Ajout `Purchase` + contrainte unique `(userId, productId)`
- Auth endpoints (bcrypt + JWT) et middleware d’accès côté API
- Page `/login` nettoyée: plus de produits, ajout mot de passe + lien « Mot de passe oublié »
- Webhook Stripe enrichi: création de `Purchase` + maintien de `Access` (legacy)

