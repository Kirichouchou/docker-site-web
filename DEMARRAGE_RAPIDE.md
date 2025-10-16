# 🚀 Démarrage Rapide - Fynora Calendar

## ✅ Étape 1 : Créer le fichier .env

```bash
# Dans le terminal, à la racine du projet :
cp ENV_CONFIG_FYNORA.txt .env
```

Ou manuellement :
1. Renommez `ENV_CONFIG_FYNORA.txt` en `.env`
2. Ouvrez le fichier `.env`

## ⚠️ Étape 2 : Configurer le mot de passe Gmail (OBLIGATOIRE)

### Pour que les emails fonctionnent :

1. Allez sur https://myaccount.google.com/apppasswords
2. Connectez-vous avec `fynora.pro@gmail.com`
3. Créez un nouveau mot de passe d'application :
   - Nom : "Fynora Website"
   - Cliquez sur "Créer"
4. **Copiez** le mot de passe généré (16 caractères)
5. Ouvrez votre fichier `.env`
6. Remplacez `VOTRE_MOT_DE_PASSE_APPLICATION_GMAIL_ICI` par le mot de passe copié

**Exemple :**
```bash
SMTP_PASS="abcd efgh ijkl mnop"  # ← Remplacez par votre vrai mot de passe
```

## 📅 Étape 3 : Partager le calendrier (OBLIGATOIRE)

### Pour que Google Calendar fonctionne :

1. Ouvrez https://calendar.google.com/
2. Connectez-vous avec `fynora.pro@gmail.com`
3. Dans la liste des calendriers à gauche, cliquez sur les **3 points** à côté de votre calendrier
4. Sélectionnez **"Paramètres et partage"**
5. Descendez jusqu'à **"Partager avec des personnes spécifiques"**
6. Cliquez sur **"Ajouter des personnes"**
7. Entrez cet email : `fynora-eppe@fynora-calendar.iam.gserviceaccount.com`
8. Donnez le rôle : **"Apporter des modifications aux événements"**
9. Cliquez sur **"Envoyer"**

✅ **C'est fait !** Le compte de service peut maintenant créer des événements dans votre calendrier.

## 🎯 Étape 4 : Tester l'intégration

```bash
# 1. Démarrez le serveur
pnpm dev

# 2. Ouvrez votre navigateur sur http://localhost:3000
# 3. Cliquez sur "Réserver un appel"
# 4. Remplissez le formulaire :
#    - Prénom, Nom
#    - Email (utilisez votre email perso pour recevoir l'invitation)
#    - Téléphone
#    - Projet
#    - Date (choisissez demain)
#    - Heure (ex: 14:00)
# 5. Cliquez sur "Envoyer"
```

### ✅ Vérifications après l'envoi :

1. **Dans les logs du serveur**, vous devriez voir :
   ```
   ✅ Événement Google Calendar créé: https://calendar.google.com/...
   ```

2. **Dans votre Google Calendar** :
   - Allez sur https://calendar.google.com/
   - Vous devriez voir le nouvel événement "Appel avec [Nom]"
   - La description contient toutes les infos du client (email, téléphone, projet)

## 🎉 C'est terminé !

Si tout fonctionne, votre système de réservation est **opérationnel** !

Chaque réservation créera automatiquement :
- ✅ Un événement dans votre Google Calendar avec toutes les infos du client
- ✅ Un email de notification envoyé à vous
- ✅ Des rappels configurés automatiquement
- ℹ️ Note : Le client ne reçoit pas d'invitation automatique (vous pouvez l'inviter manuellement depuis Google Calendar)

## 🐛 Problèmes courants

### "Configuration Google Calendar manquante"
- Vérifiez que le fichier s'appelle bien `.env` (et non `.env.txt`)
- Redémarrez le serveur après avoir modifié le `.env`

### "Insufficient Permission"
- Vérifiez que vous avez bien partagé le calendrier avec `fynora-eppe@fynora-calendar.iam.gserviceaccount.com`
- Le rôle doit être "Apporter des modifications aux événements"

### Les emails ne sont pas envoyés
- Vérifiez que vous avez bien configuré le mot de passe d'application Gmail
- Le mot de passe doit être entre guillemets dans le .env
- Pas d'espaces avant ou après le mot de passe

## 📞 Support

Si vous avez besoin d'aide, vérifiez :
1. Les logs du serveur (dans le terminal)
2. La console du navigateur (F12)
3. Votre Google Calendar
4. Vos emails

---

**Prêt à commencer ?** Suivez les étapes ci-dessus dans l'ordre ! 🚀

