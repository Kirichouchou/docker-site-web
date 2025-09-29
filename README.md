# Site Next.js 14 orientÃ© conversion (UX/CRO)

Architecture App Router (TypeScript + Tailwind), mobile-first, avec design system conversion-first, analytics dâ€™Ã©vÃ©nements (CTA, scroll, offres) et heatmap intÃ©grÃ©e.

## Arborescence

- `app/` pages App Router: `page.tsx` (Home), `offres/`, `partenariat/`, `contact/`, `blog/` (optionnel), `api/analytics` (POST)
- `components/` composants UI: `Navbar`, `Hero`, `OfferCard`, `PricingToggle`, `FAQ`, `CTASection`, `AnnouncementBar`, `AnalyticsProvider`, `ScrollTracker`
- `lib/` utilitaires (ex: `analytics.ts`)
- `public/` assets

## Design system (Tailwind)

- Police: Pretendard (via `@fontsource/pretendard` + `font-display: swap`)
- Couleurs: `--brand` bleu accessible (`text on brand` â‰¥ 4.5:1), foreground/background/muted/border
- Radius: `rounded-lg` (8px), ombre douce `shadow-soft`
- Grille: container centrÃ© max 1200px
- Spacing: sections avec `py-10` (40px)
- Focus: `:focus-visible` visible et contrastÃ©

Voir `tailwind.config.ts` et `styles/globals.css`.

## IA des pages

Home: Hero â†’ Preuve â†’ Offres (3 plans max, recommandation) â†’ FAQ â†’ CTA final. Offres: liste dÃ©taillÃ©e + toggle mensuel/annuel. Partenariat: approche orientÃ©e outcomes. Contact: formulaire simple (mailto).

## Analytics & Heatmap

- Heatmap: Microsoft Clarity via `NEXT_PUBLIC_CLARITY_ID` (script chargÃ© dans `AnalyticsProvider`)
- Ã‰vÃ©nements: clics CTA et sÃ©lection dâ€™offre (`data-cta` / `data-event`), scroll 25/50/75/100 via `ScrollTracker`
- Endpoint: `POST /api/analytics` (log server-side)

## AccessibilitÃ© & perf

- Landmarks sÃ©mantiques, focus visible, boutons â‰¥ 44px de haut, contrastes AA/AAA
- `next/image` pour visuels, font swap, sections espacÃ©es uniformÃ©ment

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
- Variez CTA: â€œDÃ©marrer ensembleâ€ vs â€œParler Ã  un expertâ€ via `data-cta` et analyse des conversions

## Checklist QA

- Nav: sticky, contraste, indicateur de page active
- CTA visible immÃ©diatement dans le Hero (au-dessus de la ligne de flottaison)
- Prix non dominant: bÃ©nÃ©fices avant tarifs ; carte â€œRecommandÃ©â€ prÃ©sente
- Spacing inter-sections = 40px ; transitions douces ; pas de coupures
- Boutons centrÃ©s, min-height â‰¥ 44px ; focus visibles
- Mobile â‰¤ 360px: nav accessible, cartes stackÃ©es, CTA full-width
- LCP < 2.5s sur connexion 4G simulÃ©e ; Lighthouse â‰¥ 90 (Perf/SEO/Best/Access)
- Ã‰vÃ©nements analytics OK: CTA, toggle pricing, scroll
- Heatmap chargÃ©e (si ID prÃ©sent)

## Personnalisation

Remplacez les placeholders: `[NOM_MARQUE]`, `[BÃ‰NÃ‰FICES_CLÃ‰S]`. Couleurs: ajustez `--brand` dans `styles/globals.css`.

## Notes

Le projet contient des modules optionnels (auth/stripe/prisma) non requis pour le site de conversion. Ils nâ€™interfÃ¨rent pas avec les pages livrÃ©es.


## Animations

Les effets d'apparition sont fournis par le composant client Reveal (cf. components/Reveal.tsx) et la feuille styles/reveal.css importée globalement.

- direction: up (par défaut) | down | left | ight
- delay: délai en millisecondes (stagger recommandé: 0, 120, 240…)
- overshoot: applique l'animation adeInOvershoot
- s: élément HTML à rendre (ex.: s="h2")

Utilisez le composant sur les sections clés (Hero, cartes, CTA). Évitez nav, footer et formulaires. Pour des besoins plus fins, le hook useReveal (lib/useReveal.ts) permet d'observer des sélecteurs personnalisés.

L'animation respecte prefers-reduced-motion: reduce : les contenus s'affichent immédiatement sans transition.

