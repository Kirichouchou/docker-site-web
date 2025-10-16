# Variables d'Environnement Requises

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

## 📧 Configuration Email (SMTP)

```bash
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="votre-email@example.com"
SMTP_PASS="votre-mot-de-passe-app"
COMMANDE_TO="destinataire@example.com"
SUPPORT_TO="support@example.com"
```

## 📅 Google Calendar (NOUVELLES VARIABLES)

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL="votre-compte-service@votre-projet.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVOTRE_CLE_PRIVEE\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="votre-email@gmail.com"
```

**⚠️ Important** : Consultez [GOOGLE_CALENDAR_SETUP.md](./GOOGLE_CALENDAR_SETUP.md) pour les instructions détaillées.

## 🗄️ Base de Données

```bash
DATABASE_URL="file:./prisma/dev.db"
```

## 🔐 NextAuth

```bash
NEXTAUTH_SECRET="generer-une-cle-secrete-aleatoire-ici"
NEXTAUTH_URL="http://localhost:3000"
```

Pour générer une clé secrète :
```bash
openssl rand -base64 32
```

## 💳 Stripe (Optionnel)

```bash
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 🏠 Hébergement

```bash
NEXT_PUBLIC_HOSTING_FEE="5"
```

---

## 🚀 Démarrage Rapide

1. Copiez ce template dans un nouveau fichier `.env`
2. Remplissez vos vraies valeurs
3. **Ne commitez JAMAIS le fichier .env**
4. Pour Google Calendar, suivez [GOOGLE_CALENDAR_SETUP.md](./GOOGLE_CALENDAR_SETUP.md)

