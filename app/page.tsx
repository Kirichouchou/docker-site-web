"use client";

import Hero from "../components/Hero";
import Features from "../components/Features";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { useLanguage } from "../contexts/LanguageContext";

type Pillar = {
  title: string;
  description: string;
  stack: string[];
};

type ServicesHighlight = {
  eyebrow: string;
  title: string;
  subtitle: string;
  pillars: Pillar[];
};

function resolveServicesHighlight(dictionary: ReturnType<typeof useLanguage>["dictionary"]): ServicesHighlight {
  const data = dictionary?.homepage?.servicesHighlight ?? {};
  const fallbackPillars: Pillar[] = [
    {
      title: "Design & Expérience",
      description:
        "Conception de sites élégants et performants, pensés pour offrir une expérience fluide et convertir vos visiteurs en clients.",
      stack: ["Design responsive"],
    },
    {
      title: "Analyse & Performance",
      description:
        "Des tableaux de bord clairs et actionnables pour piloter votre acquisition et identifier les prochaines priorités.",
      stack: ["GA4", "Looker Studio", "Tag Manager"],
    },
  ];

  const pillars = Array.isArray(data.pillars) && data.pillars.length > 0 ? data.pillars : fallbackPillars;

  return {
    eyebrow: data.eyebrow ?? "Nos services",
    title: data.title ?? "Des sites pensés pour la conversion",
    subtitle:
      data.subtitle ??
      "Nous concevons des landing pages et sites sur mesure conçus pour maximiser vos ventes et votre visibilité en ligne.",
    pillars: pillars as Pillar[],
  };
}

export default function HomePage() {
  const { dictionary } = useLanguage();
  const servicesHighlight = resolveServicesHighlight(dictionary);

  return (
    <>
      <Hero />
      <Features />

      <section className="section pb-32 bg-[#F2F5FC]" aria-labelledby="services">
        <div className="container relative mx-auto px-4 pb-16">
          <div className="relative z-10 overflow-hidden rounded-[48px] bg-gradient-to-br from-[#102B45] via-[#0A304E] to-[#051D33] shadow-[0_60px_120px_-45px_rgba(10,48,78,0.55)] text-white">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.08), transparent 50%)",
              }}
              aria-hidden="true"
            />
            <div className="relative grid gap-10 px-6 py-12 sm:px-10 md:px-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-12 lg:px-16 lg:py-16">
              <Reveal as="header" className="max-w-xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70">
                  {servicesHighlight.eyebrow}
                </p>
                <h2 id="services" className="text-3xl md:text-4xl font-extrabold leading-snug">
                  {servicesHighlight.title}
                </h2>
                <p className="text-base md:text-lg text-white/80">
                  {servicesHighlight.subtitle}
                </p>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2">
                {servicesHighlight.pillars.map((pillar, index) => (
                  <Reveal
                    as="article"
                    key={`${pillar.title}-${index}`}
                    delay={index * 120}
                    className="group relative overflow-hidden rounded-[32px] border border-white/15 bg-white/10 px-6 py-7 sm:px-8 sm:py-9 backdrop-blur-xl shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-1"
                  >
                    <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl transition-opacity group-hover:opacity-90" aria-hidden="true" />
                    <div className="relative space-y-4">
                      <h3 className="text-xl font-semibold">{pillar.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/70">
                        {pillar.stack.map((tool) => (
                          <span key={tool} className="rounded-full border border-white/25 bg-white/10 px-3 py-1">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mt-14">
            <CTASection embedded />
          </div>
        </div>
      </section>
    </>
  );
}



