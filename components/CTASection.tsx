import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container mx-auto px-4">
        <div className="rounded-lg border border-border p-6 md:p-8 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 id="cta-title" className="text-2xl md:text-3xl font-extrabold tracking-tight">Prêt à démarrer ?</h2>
            <p className="text-black/70 mt-1">Invitons-nous à réussir ensemble. Zéro friction, focus résultats.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              href="/offres"
              className="flex-1 md:flex-none inline-flex justify-center items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold hover:opacity-90"
              data-cta="cta_bottom_primary"
            >
              Démarrer ensemble
            </Link>
            <Link
              href="/contact"
              className="flex-1 md:flex-none inline-flex justify-center items-center rounded-lg px-6 py-3 min-h-12 bg-white border border-border font-semibold hover:bg-muted"
              data-cta="cta_bottom_secondary"
            >
              Planifier un appel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

