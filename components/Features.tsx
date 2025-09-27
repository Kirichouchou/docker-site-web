export default function Features() {
  const items = [
    { title: "Design responsive", desc: "" },
    { title: "E-commerce intégré", desc: "" },
    { title: "Optimisation SEO", desc: "" },
  ];

  return (
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
        </div>
      </div>
    </section>
  );
}
