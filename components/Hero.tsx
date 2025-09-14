"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="inline-flex items-center text-sm font-semibold text-[hsl(var(--brand))] mb-3" aria-live="polite">
              Nouveau · Places limitées ce mois-ci
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Fynora obtenez des résultats concrets, pas juste un prix bas
            </h1>
            <p className="mt-4 text-lg text-black/70">
              [BÉNÉFICES_CLÉS] : nous alignons votre réussite sur la nôtre.
              Commencez avec un plan guidé, un accompagnement humain et des livrables mesurables.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/offres"
                className="inline-flex justify-center items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold shadow-soft hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand))]"
                data-cta="hero_primary"
              >
                Démarrer ensemble
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center rounded-lg px-6 py-3 min-h-12 bg-white text-foreground border border-border font-semibold hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand))]"
                data-cta="hero_secondary"
              >
                Parler à un expert
              </Link>
            </div>
            <p className="mt-3 text-sm text-black/60">Garantie satisfaction · Annulable à tout moment · Support prioritaire</p>
          </div>

          <div className="rounded-lg overflow-hidden border border-border shadow-soft">
            <div className="aspect-video w-full bg-muted" aria-label="Aperçu vidéo / visuel" />
          </div>
        </div>
      </div>
    </section>
  );
}

