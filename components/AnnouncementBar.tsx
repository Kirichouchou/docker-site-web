export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] text-sm py-2" aria-live="polite">
      <div className="container mx-auto px-4 text-center">
        Offre limitée: <strong>4 places</strong> restantes ce mois-ci · Priorité aux clients actifs
      </div>
    </div>
  );
}
