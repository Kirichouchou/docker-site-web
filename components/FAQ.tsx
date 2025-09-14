export default function FAQ() {
  const items = [
    {
      q: "Combien de temps pour voir des résultats ?",
      a: "La plupart des clients observent un impact en 2 à 4 semaines grâce aux quick wins et aux itérations guidées.",
    },
    {
      q: "Puis-je annuler ?",
      a: "Oui, sans engagement. Notre approche est partenariat-first : restez si la valeur est là.",
    },
    {
      q: "Proposez-vous un accompagnement ?",
      a: "Oui, nous incluons des points réguliers et des feedbacks asynchrones pour garder le rythme.",
    },
  ];
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <h2 id="faq-title" className="text-3xl font-bold mb-6">Questions fréquentes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <details key={i} className="rounded-lg border border-border p-4 bg-white">
              <summary className="cursor-pointer font-semibold">{it.q}</summary>
              <p className="mt-2 text-black/70">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

