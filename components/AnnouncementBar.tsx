export default function AnnouncementBar() {
  return (
    <div
      className="w-full bg-[#0c2f4b] text-sm text-white"
      aria-live="polite"
    >
      <div className="mx-auto flex h-10 max-w-5xl items-center justify-center gap-2 px-4 text-center">
        <span className="font-medium text-white/80">Offre limitée :</span>
        <span className="rounded-full bg-white/10 px-3 py-1 font-semibold tracking-wide text-white">
          4 places
        </span>
        <span className="font-medium text-white/80">restantes ce mois-ci</span>
      </div>
    </div>
  );
}
