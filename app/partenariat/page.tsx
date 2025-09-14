import Link from "next/link";

export default function PartenariatPage() {
  return (
    <div className="section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Partenariat, pas simple prestation</h1>
        <p className="mt-4 text-lg text-black/70 max-w-2xl">
          Nous alignons nos incitations sur vos objectifs. Nous priorisons les outcomes, pas la liste de tâches. La collaboration est cadencée et mesurée.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { title: "Objectifs communs", desc: "KPIs partagés, focus impact" },
            { title: "Cadence agile", desc: "Sprints courts, feedback rapide" },
            { title: "Transparence", desc: "Reporting clair et actionnable" },
          ].map((c) => (
            <div key={c.title} className="rounded-lg border border-border p-6 bg-white">
              <h3 className="font-bold text-xl">{c.title}</h3>
              <p className="text-black/70 mt-2">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/contact" className="inline-flex items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold">Planifier un appel</Link>
          <Link href="/offres" className="inline-flex items-center rounded-lg px-6 py-3 min-h-12 border border-border font-semibold bg-white">Voir les offres</Link>
        </div>
      </div>
    </div>
  );
}

