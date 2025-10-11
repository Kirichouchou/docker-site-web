"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { useContactOverlay } from "./ContactOverlayProvider";

export default function ServicesBridge() {
  const { openContact } = useContactOverlay();

  return (
    <section className="bg-[#F2F5FC] py-12" aria-labelledby="sales-bridge">
      <div className="container mx-auto px-4">
        <Reveal className="relative mx-auto max-w-[1156px] overflow-hidden rounded-[48px] bg-gradient-to-br from-[#0A304E] via-[#0C3D66] to-[#061F36] px-8 py-6 text-white shadow-[0_60px_120px_-60px_rgba(5,15,35,0.85)]">
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/60">
              Nous orchestrons vos pages de vente
            </p>
            <h2 id="sales-bridge" className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
              Conception de pages de vente
            </h2>
            <p className="mt-1 max-w-2xl text-base text-white/70 md:text-lg">
              Nous designons et developpons des pages optimisees pour transformer vos visiteurs en clients, avec un parcours fluide et efficace.
            </p>

            <div className="mt-4 w-full max-w-[54.88rem]">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.8)]">
                <div className="pt-[46.4%] bg-gradient-to-br from-white/10 via-white/5 to-white/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8">
                  <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                    Apercu projet
                  </span>
                  <p className="max-w-md text-sm text-white/70">
                    Illustration d une maquette que nous adaptons a votre offre pour stimuler la conversion.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={openContact}
                className="inline-flex items-center gap-3 rounded-full border border-[#0A304E] bg-[#0A304E] px-8 py-3 text-white font-semibold text-sm transition-transform hover:-translate-y-0.5 hover:bg-[#0C3D66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                data-cta="services_bridge"
              >
                Reserver un appel
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute -left-5 top-1/4 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-4 bottom-8 h-44 w-44 rounded-full bg-[#0EA5E9]/20 blur-3xl" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

