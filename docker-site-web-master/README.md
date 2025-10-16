# Site Vitrine Next.js 14 - Orienté Conversion (UX/CRO)

Site vitrine moderne avec Next.js 14 App Router, TypeScript, Tailwind CSS, optimisé pour la conversion avec analytics et animations fluides.

## 🚀 Fonctionnalités

- ✅ **Design moderne** : Interface responsive mobile-first
- ✅ **Animations fluides** : GSAP + Lenis pour un scroll smooth
- ✅ **Formulaires de contact** : Envoi d'emails via SMTP
- ✅ **Analytics** : Suivi des événements et heatmap (Microsoft Clarity)
- ✅ **SEO optimisé** : Sitemap, métadonnées, performance
- ✅ **Accessibilité** : Contrastes AA/AAA, navigation au clavier

## 📁 Structure du projet

```
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── offres/               # Page des offres
│   ├── commande/             # Page de commande/contact
│   ├── blog/                 # Blog (optionnel)
│   ├── mentions-legales/     # Mentions légales
│   └── api/
│       ├── contact/          # API formulaire de contact
│       ├── commande/         # API formulaire de commande
│       └── analytics/        # API tracking événements
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── Hero.tsx              # Section hero
│   ├── OfferCard.tsx         # Cartes d'offres
│   ├── ProductCard.tsx       # Cartes de produits
│   ├── FAQ.tsx               # Questions fréquentes
│   ├── ContactForm.tsx       # Formulaire de contact
│   └── ...
├── lib/
│   ├── analytics.ts          # Utilitaires analytics
│   ├── mail.ts               # Configuration email
│   └── validation.ts         # Validation formulaires
└── styles/
    ├── globals.css           # Styles globaux
    └── reveal.css            # Animations d'apparition
```

## 🛠️ Installation

### 1. Cloner et installer les dépendances

```bash
pnpm install
# ou
npm install
# ou
yarn install
```

### 2. Configurer les variables d'environnement

Copiez le fichier `.env.example` vers `.env` et remplissez les valeurs :

```bash
cp .env.example .env
```

**Configuration minimale requise :**

```env
# SMTP pour les formulaires de contact
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASS="votre-mot-de-passe-application"
SUPPORT_TO="support@example.com"
COMMANDE_TO="commande@example.com"

# URL du site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

#### 📧 Configuration Gmail (recommandé)

1. Activez la validation en 2 étapes : https://myaccount.google.com/security
2. Générez un mot de passe d'application : https://myaccount.google.com/apppasswords
3. Utilisez ce mot de passe de 16 caractères dans `SMTP_PASS`

#### 📊 Analytics (optionnel)

Pour activer Microsoft Clarity (heatmap gratuite) :

```env
NEXT_PUBLIC_CLARITY_ID="votre_id_clarity"
```

Obtenez votre ID sur : https://clarity.microsoft.com

### 3. Lancer le serveur de développement

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build et déploiement

### Build de production

```bash
pnpm build
pnpm start
```

### Déploiement

Le site peut être déployé sur :
- **Vercel** (recommandé) : `vercel deploy`
- **Netlify** : Configuration automatique
- **Docker** : Utilisez le `Dockerfile` et `docker-compose.yml` fournis

## 🎨 Personnalisation

### Couleurs et design

Modifiez les couleurs dans `styles/globals.css` :

```css
:root {
  --brand: 220 90% 56%;        /* Couleur principale */
  --foreground: 222 47% 11%;   /* Texte principal */
  --background: 0 0% 100%;     /* Fond */
  --muted: 210 40% 96%;        /* Fond secondaire */
  --border: 214 32% 91%;       /* Bordures */
}
```

### Contenu

Remplacez les placeholders dans les composants :
- `[NOM_MARQUE]` → Votre nom de marque
- `[BÉNÉFICES_CLÉS]` → Vos avantages
- Images dans `/public/`

## 📊 Analytics et tracking

### Événements trackés automatiquement

- Clics sur les CTA (boutons d'action)
- Sélection d'offres
- Scroll (25%, 50%, 75%, 100%)
- Soumission de formulaires

### Ajouter un événement personnalisé

```tsx
<button data-cta="nom-du-cta" onClick={handleClick}>
  Mon bouton
</button>
```

## ♿ Accessibilité

- Navigation au clavier complète
- Contrastes WCAG AA/AAA
- Landmarks sémantiques
- Focus visible
- Support `prefers-reduced-motion`

## 🎭 Animations

Utilisez le composant `Reveal` pour les animations d'apparition :

```tsx
import Reveal from "@/components/Reveal";

<Reveal direction="up" delay={0}>
  <h2>Mon titre animé</h2>
</Reveal>
```

Options :
- `direction`: `up`, `down`, `left`, `right`
- `delay`: délai en ms (0, 120, 240...)
- `overshoot`: animation avec rebond

## 📝 Checklist avant mise en production

- [ ] Configurer les variables d'environnement de production
- [ ] Remplacer tous les placeholders de contenu
- [ ] Ajouter vos vraies images
- [ ] Tester les formulaires de contact
- [ ] Configurer le domaine personnalisé
- [ ] Activer HTTPS
- [ ] Tester sur mobile
- [ ] Vérifier Lighthouse (score > 90)
- [ ] Ajouter Google Analytics / Clarity

## 🐛 Dépannage

### Les emails ne s'envoient pas

1. Vérifiez vos identifiants SMTP
2. Pour Gmail, utilisez un mot de passe d'application (pas votre mot de passe normal)
3. Vérifiez les logs dans la console

### Erreurs de build

```bash
# Nettoyer le cache
rm -rf .next node_modules
pnpm install
pnpm build
```

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Support

Pour toute question, contactez-nous via le formulaire de contact du site.
