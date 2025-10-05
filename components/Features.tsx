import Reveal from "./Reveal";
import { useLanguage } from "../contexts/LanguageContext";

export default function Features() {
  const { dictionary } = useLanguage();
  const featuresCopy = dictionary?.features ?? {};
  const heading = featuresCopy.heading ?? "Atouts principaux";
  const items = Array.isArray(featuresCopy.items) ? featuresCopy.items : [];

  return (
    <section className="section bg-[#F2F5FC]" aria-labelledby="features">
      <div className="container mx-auto px-4">
        <h2 id="features" className="sr-only">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {items.map((label: string, index: number) => (
            <Reveal key={label} delay={index * 120} className="w-full max-w-xs">
              <div className="inline-flex w-full items-center justify-center rounded-full px-8 py-3 bg-[#0A304E] hover:bg-[#0C3D66] text-white font-semibold text-sm sm:text-base border border-[#0A304E] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] transition-colors">
                <span>{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



