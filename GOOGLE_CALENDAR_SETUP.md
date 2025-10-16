# Configuration Google Calendar

Ce guide vous explique comment configurer l'intégration Google Calendar pour que les réservations d'appels soient automatiquement ajoutées à votre agenda.

## 📋 Prérequis

- Un compte Google
- Accès à Google Cloud Console

## 🔧 Étapes de Configuration

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Notez l'ID de votre projet

### 2. Activer l'API Google Calendar

1. Dans le menu de gauche, allez dans **APIs & Services** > **Library**
2. Recherchez "Google Calendar API"
3. Cliquez sur **Enable**

### 3. Créer un compte de service

1. Allez dans **APIs & Services** > **Credentials**
2. Cliquez sur **Create Credentials** > **Service Account**
3. Donnez un nom au compte (ex: "calendar-booking")
4. Cliquez sur **Create and Continue**
5. Donnez le rôle **Editor** (ou créez un rôle personnalisé)
6. Cliquez sur **Done**

### 4. Générer une clé pour le compte de service

1. Dans la liste des comptes de service, cliquez sur le compte que vous venez de créer
2. Allez dans l'onglet **Keys**
3. Cliquez sur **Add Key** > **Create new key**
4. Choisissez le format **JSON**
5. Téléchargez le fichier JSON (gardez-le en sécurité !)

### 5. Partager votre calendrier avec le compte de service

1. Allez sur [Google Calendar](https://calendar.google.com/)
2. Dans la liste des calendriers à gauche, cliquez sur les 3 points à côté de votre calendrier
3. Sélectionnez **Settings and sharing**
4. Descendez jusqu'à **Share with specific people**
5. Cliquez sur **Add people**
6. Entrez l'email du compte de service (vous le trouverez dans le fichier JSON téléchargé, c'est le champ `client_email`)
7. Donnez le rôle **Make changes to events**
8. Cliquez sur **Send**

### 6. Récupérer l'ID de votre calendrier

1. Toujours dans les paramètres du calendrier
2. Descendez jusqu'à **Integrate calendar**
3. Copiez la valeur de **Calendar ID** (généralement votre email ou quelque chose comme `xxxxx@group.calendar.google.com`)

## 🔐 Variables d'environnement

Ajoutez ces variables à votre fichier `.env` (ou `.env.local`) :

```bash
# Google Calendar Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL="votre-compte-service@votre-projet.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVOTRE_CLE_PRIVEE\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="votre-email@gmail.com"
```

### Comment remplir ces variables :

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL** : 
   - Ouvrez le fichier JSON téléchargé
   - Copiez la valeur du champ `client_email`

2. **GOOGLE_PRIVATE_KEY** :
   - Ouvrez le fichier JSON téléchargé
   - Copiez la valeur du champ `private_key`
   - ⚠️ Assurez-vous de garder les `\n` dans la clé
   - Mettez toute la clé entre guillemets

3. **GOOGLE_CALENDAR_ID** :
   - Utilisez l'ID de calendrier que vous avez copié à l'étape 6

## ✅ Test de l'intégration

1. Redémarrez votre serveur de développement :
   ```bash
   pnpm dev
   ```

2. Allez sur votre site et remplissez le formulaire de réservation

3. Vérifiez votre Google Calendar - un nouvel événement devrait apparaître !

## 🔍 Débogage

### Erreur "Configuration Google Calendar manquante"

- Vérifiez que toutes les variables d'environnement sont bien définies
- Redémarrez votre serveur après avoir modifié le `.env`

### Erreur "Insufficient Permission"

- Vérifiez que vous avez bien partagé le calendrier avec le compte de service
- Assurez-vous que le rôle donné est "Make changes to events" ou supérieur

### L'événement n'apparaît pas dans le calendrier

- Vérifiez les logs du serveur pour voir les messages d'erreur
- Assurez-vous que le GOOGLE_CALENDAR_ID correspond bien à votre calendrier
- Vérifiez que l'API Google Calendar est bien activée

## 📝 Format des événements créés

Chaque réservation créera un événement avec :

- **Titre** : "Appel avec [Nom du client]"
- **Description** : Le message du formulaire + les coordonnées du client
- **Durée** : 1 heure par défaut
- **Participant** : Le client sera ajouté comme participant et recevra une invitation
- **Rappels** : 
  - Email 24h avant
  - Notification 30 min avant

## 🔒 Sécurité

⚠️ **IMPORTANT** :

1. Ne commitez JAMAIS le fichier JSON du compte de service dans Git
2. Ne commitez JAMAIS le fichier `.env` contenant les clés
3. Ajoutez `*.json` et `.env` à votre `.gitignore`
4. En production, utilisez des variables d'environnement sécurisées (pas de fichier .env)

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs du serveur
2. Assurez-vous que toutes les étapes ont été suivies
3. Vérifiez que l'API Google Calendar est bien activée
4. Testez les credentials avec l'outil de test Google

