# Script de configuration automatique du fichier .env pour Fynora
# Exécutez ce script : .\setup-env.ps1

Write-Host "🚀 Configuration de Fynora - Création du fichier .env" -ForegroundColor Cyan
Write-Host ""

# Vérifier si .env existe déjà
if (Test-Path ".env") {
    Write-Host "⚠️  Le fichier .env existe déjà !" -ForegroundColor Yellow
    $response = Read-Host "Voulez-vous le remplacer ? (o/N)"
    if ($response -ne "o" -and $response -ne "O") {
        Write-Host "❌ Opération annulée." -ForegroundColor Red
        exit
    }
}

# Copier le template
Write-Host "📄 Création du fichier .env..." -ForegroundColor Green
Copy-Item "ENV_CONFIG_FYNORA.txt" ".env"

Write-Host "✅ Fichier .env créé avec succès !" -ForegroundColor Green
Write-Host ""

# Demander le mot de passe Gmail
Write-Host "📧 Configuration SMTP Gmail" -ForegroundColor Cyan
Write-Host "Vous devez créer un mot de passe d'application Gmail :" -ForegroundColor Yellow
Write-Host "  1. Allez sur https://myaccount.google.com/apppasswords" -ForegroundColor Yellow
Write-Host "  2. Créez un nouveau mot de passe d'application" -ForegroundColor Yellow
Write-Host "  3. Copiez le mot de passe généré" -ForegroundColor Yellow
Write-Host ""

$smtpPass = Read-Host "Entrez votre mot de passe d'application Gmail (ou appuyez sur Entrée pour configurer plus tard)"

if ($smtpPass) {
    # Remplacer le placeholder dans le fichier .env
    (Get-Content ".env") -replace 'VOTRE_MOT_DE_PASSE_APPLICATION_GMAIL_ICI', $smtpPass | Set-Content ".env"
    Write-Host "✅ Mot de passe SMTP configuré !" -ForegroundColor Green
} else {
    Write-Host "⚠️  N'oubliez pas de configurer SMTP_PASS dans le fichier .env" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ CONFIGURATION TERMINÉE !" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 PROCHAINES ÉTAPES :" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Partagez votre Google Calendar avec :" -ForegroundColor White
Write-Host "   fynora-eppe@fynora-calendar.iam.gserviceaccount.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "2️⃣  Démarrez le serveur :" -ForegroundColor White
Write-Host "   pnpm dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "3️⃣  Testez sur http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📖 Pour plus de détails, consultez : DEMARRAGE_RAPIDE.md" -ForegroundColor Yellow
Write-Host ""

