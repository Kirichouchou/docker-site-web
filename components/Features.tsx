export default function Features() {
  const items = [
    { title: "Design responsive", desc: "Une expérience fluide sur mobile, tablette et desktop." },
    { title: "E-commerce intégré", desc: "Paiement sécurisé Stripe, panier simple et conversions suivies." },
    { title: "Optimisation SEO", desc: "Structure sémantique, métadonnées propres et vitesse soignée." },
  ];

  return (
    <section className="section" aria-labelledby="features">
      <div className="container mx-auto px-4">
        <h2 id="features" className="sr-only">Atouts principaux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {items.map((it) => (
            <div
              key={it.title}
              className="w-full max-w-xs text-center rounded-xl border border-border bg-white p-6 shadow-soft"
              role="listitem"
            >
              <div className="text-lg font-semibold">{it.title}</div>
              <p className="mt-1 text-sm text-black/70">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

