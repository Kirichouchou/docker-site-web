import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#F2F5FC] py-24" aria-labelledby="cta-title">
      <div className="container relative mx-auto px-4">
        <Reveal
          delay={120}
          overshoot
          className="mx-auto max-w-3xl rounded-[48px] border border-[#0A304E]/30 bg-[#0A304E]/90 p-10 text-center text-white backdrop-blur-lg shadow-[0_50px_140px_-70px_rgba(10,48,78,0.55)]"
        >
          <p
            id="cta-title"
            className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70"
          >
            On s'occupe de tout.
          </p>
          <h2 className="mt-4 text-3xl md:text-[2.75rem] font-extrabold leading-tight">
            Vous vous concentrez sur vos clients.
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/80">
            Nous orchestrons la conception, le pilotage et l'optimisation afin que vous puissiez vous focaliser sur l'essentiel : votre cœur de métier.
          </p>

          <div className="mt-8 flex justify-center">
            <Reveal delay={200} className="inline-flex">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white transition hover:bg-white/15 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.45)]"
              >
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold">Réserver un appel</span>
                </span>
                <span className="ml-2 text-lg text-white/70 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

