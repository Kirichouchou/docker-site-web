<<<<<<< HEAD
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container mx-auto px-4">
        <div className="rounded-lg border border-border p-6 md:p-8 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 id="cta-title" className="text-2xl md:text-3xl font-extrabold tracking-tight">Prêt à démarrer ?</h2>
            <p className="text-black/70 mt-1">Un processus simple, un interlocuteur dédié, et des résultats concrets dès les premières semaines.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto min-w-0">
            <Link
              href="/offres"
              className="w-full inline-flex justify-center items-center rounded-lg px-4 sm:px-5 md:px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold hover:opacity-90 whitespace-normal break-words text-center text-sm sm:text-base max-w-full"
              data-cta="cta_bottom_primary"
            >
              Lancer mon projet
            </Link>
            <Link
              href="/contact"
              className="w-full inline-flex justify-center items-center rounded-lg px-4 sm:px-5 md:px-6 py-3 min-h-12 bg-white border border-border font-semibold hover:bg-muted whitespace-normal break-words text-center text-sm sm:text-base max-w-full"
              data-cta="cta_bottom_secondary"
            >
              Parler à un expert
=======
﻿import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#F2F5FC] py-24" aria-labelledby="cta-title">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-[48px] border border-[#0A304E]/20 bg-gradient-to-br from-[#0A304E]/90 via-[#1663A5]/80 to-[#0A304E]/70 p-10 text-center text-white backdrop-blur-xl shadow-[0_50px_140px_-70px_rgba(10,48,78,0.55)]">
          <p id="cta-title" className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70">
            On s'occupe de tout.
          </p>
          <h2 className="mt-4 text-3xl md:text-[2.75rem] font-extrabold leading-tight">
            Vous vous concentrez sur vos clients.
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/80">
            Nous orchestrons la conception, le pilotage et l'optimisation afin que vous puissiez vous focaliser sur l'essentiel : votre coeur de metier.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-[999px] border border-white/30 bg-white/15 px-6 py-3 text-left text-white transition hover:bg-white/20 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.45)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7f57] via-[#d55cff] to-[#5aa8ff] text-lg font-bold text-white shadow-[0_12px_30px_-15px_rgba(255,127,87,0.6)]">
                {"\u2197"}
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.18em] text-white/70">Je veux developper mon business</span>
                <span className="text-sm font-semibold">Reserver un appel</span>
              </span>
              <span className="ml-6 text-lg text-white/70 transition group-hover:translate-x-1">{"\u2192"}</span>
>>>>>>> 991b4c6 (Ylan le negre)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
