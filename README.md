# Site Next.js 14 orienté conversion (UX/CRO)

Architecture App Router (TypeScript + Tailwind), mobile-first, avec design system conversion-first, analytics d’événements (CTA, scroll, offres) et heatmap intégrée.

## Arborescence

- `app/` pages App Router: `page.tsx` (Home), `offres/`, `partenariat/`, `contact/`, `blog/` (optionnel), `api/analytics` (POST)
- `components/` composants UI: `Navbar`, `Hero`, `OfferCard`, `PricingToggle`, `FAQ`, `CTASection`, `AnnouncementBar`, `AnalyticsProvider`, `ScrollTracker`
- `lib/` utilitaires (ex: `analytics.ts`)
- `public/` assets

## Design system (Tailwind)

- Police: Pretendard (via `@fontsource/pretendard` + `font-display: swap`)
- Couleurs: `--brand` bleu accessible (`text on brand` ≥ 4.5:1), foreground/background/muted/border
- Radius: `rounded-lg` (8px), ombre douce `shadow-soft`
- Grille: container centré max 1200px
- Spacing: sections avec `py-10` (40px)
- Focus: `:focus-visible` visible et contrasté

Voir `tailwind.config.ts` et `styles/globals.css`.

## IA des pages

Home: Hero → Preuve → Offres (3 plans max, recommandation) → FAQ → CTA final. Offres: liste détaillée + toggle mensuel/annuel. Partenariat: approche orientée outcomes. Contact: formulaire simple (mailto).

## Analytics & Heatmap

- Heatmap: Microsoft Clarity via `NEXT_PUBLIC_CLARITY_ID` (script chargé dans `AnalyticsProvider`)
- Événements: clics CTA et sélection d’offre (`data-cta` / `data-event`), scroll 25/50/75/100 via `ScrollTracker`
- Endpoint: `POST /api/analytics` (log server-side)

## Accessibilité & perf

- Landmarks sémantiques, focus visible, boutons ≥ 44px de haut, contrastes AA/AAA
- `next/image` pour visuels, font swap, sections espacées uniformément

## Installation

1. `pnpm install`
2. (Optionnel) Configurer la heatmap dans `.env.local`:
   - `NEXT_PUBLIC_CLARITY_ID="XXXXXXXX"`
3. `pnpm dev` puis http://localhost:3000

Build & run:

```
pnpm build
pnpm start
```

## A/B testing (bref)

- Variez `H1`: valeur vs prix dans `Hero`
- Variez CTA: “Démarrer ensemble” vs “Parler à un expert” via `data-cta` et analyse des conversions

## Checklist QA

- Nav: sticky, contraste, indicateur de page active
- CTA visible immédiatement dans le Hero (au-dessus de la ligne de flottaison)
- Prix non dominant: bénéfices avant tarifs ; carte “Recommandé” présente
- Spacing inter-sections = 40px ; transitions douces ; pas de coupures
- Boutons centrés, min-height ≥ 44px ; focus visibles
- Mobile ≤ 360px: nav accessible, cartes stackées, CTA full-width
- LCP < 2.5s sur connexion 4G simulée ; Lighthouse ≥ 90 (Perf/SEO/Best/Access)
- Événements analytics OK: CTA, toggle pricing, scroll
- Heatmap chargée (si ID présent)

## Personnalisation

Remplacez les placeholders: `[NOM_MARQUE]`, `[BÉNÉFICES_CLÉS]`. Couleurs: ajustez `--brand` dans `styles/globals.css`.

## Notes

Le projet contient des modules optionnels (auth/stripe/prisma) non requis pour le site de conversion. Ils n’interfèrent pas avec les pages livrées.

