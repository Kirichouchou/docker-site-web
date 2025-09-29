<<<<<<< HEAD
export default function Features() {
=======
﻿export default function Features() {
>>>>>>> 991b4c6 (Ylan le negre)
  const items = [
    { title: "Design responsive", desc: "" },
    { title: "E-commerce intégré", desc: "" },
    { title: "Optimisation SEO", desc: "" },
  ];

  return (
<<<<<<< HEAD
    <section className="section" aria-labelledby="features">
      <div className="container mx-auto px-4">
        <h2 id="features" className="sr-only">Atouts principaux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {items.map((it) => {
            const compact = !it.desc; // ne changer que la hauteur (pas la largeur)
            return (
              <div
                key={it.title}
                className={`${compact ? "w-full max-w-xs h-16 px-6 flex items-center justify-center" : "w-full max-w-xs p-6"} text-center rounded-xl border border-border bg-white shadow-soft`}
                role="listitem"
              >
                <div className="text-lg font-semibold">{it.title}</div>
                {it.desc ? (
                  <p className="mt-1 text-sm text-black/70">{it.desc}</p>
                ) : null}
              </div>
            );
          })}
=======
    <section className="section bg-[#F2F5FC]" aria-labelledby="features">
      <div className="container mx-auto px-4">
        <h2 id="features" className="sr-only">
          Atouts principaux
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {items.map((it) => (
            <div key={it.title} className="w-full max-w-xs">
              <div className="inline-flex w-full items-center justify-center rounded-full px-8 py-3 bg-[#0A304E] hover:bg-[#0C3D66] text-white font-semibold text-sm sm:text-base border border-[#0A304E] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] transition-colors">
                <span>{it.title}</span>
              </div>
            </div>
          ))}
>>>>>>> 991b4c6 (Ylan le negre)
        </div>
      </div>
    </section>
  );
}
