export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[hsl(var(--brand))] py-2 text-sm text-[hsl(var(--brand-foreground))]" aria-live="polite">
      <div className="container mx-auto px-4 text-center">
        Offre limitée : <strong>4 places</strong> restantes ce mois-ci
      </div>
    </div>
  );
}
