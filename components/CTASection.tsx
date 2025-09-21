import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container mx-auto px-4">
        <div className="rounded-lg border border-border p-6 md:p-8 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 id="cta-title" className="text-2xl md:text-3xl font-extrabold tracking-tight">Votre marque mérite plus qu’un simple site.</h2>
            <p className="text-black/70 mt-1">Un processus simple, un interlocuteur dédié, et des résultats concrets dès les premières semaines.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto min-w-0">
            <Link
              href="/offres"
              className="w-full inline-flex justify-center items-center rounded-lg px-4 sm:px-5 md:px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold hover:opacity-90 whitespace-normal break-words text-center text-sm sm:text-base max-w-full"
              data-cta="cta_bottom_primary"
            >
              lancer mon projet
            </Link>
            <Link
              href="/contact"
              className="w-full inline-flex justify-center items-center rounded-lg px-4 sm:px-5 md:px-6 py-3 min-h-12 bg-white border border-border font-semibold hover:bg-muted whitespace-normal break-words text-center text-sm sm:text-base max-w-full"
              data-cta="cta_bottom_secondary"
            >
              Parler à un expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
