"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      q: "Combien de temps faut-il pour créer mon site ?",
      a: "En moyenne, votre site est prêt en 7 à 14 jours après validation de votre commande. Le délai dépend du niveau de personnalisation choisi, mais nous respectons toujours nos engagements.",
    },
    {
      q: "Est-ce que mon site sera visible sur téléphone ?",
      a: "Oui. Tous nos sites sont conçus en version responsive : ils s’adaptent automatiquement aux ordinateurs, tablettes et smartphones pour offrir une expérience optimale à vos visiteurs.",
    },
    {
      q: "Serai-je accompagné après la mise en ligne ?",
      a: "Oui. Nous restons à vos côtés même après la livraison. Vous bénéficiez d’un suivi personnalisé et d’un interlocuteur dédié pour répondre à vos questions et vous aider à faire évoluer votre site.",
    },
    {
      q: "Que se passe-t-il si j’ai un problème technique ?",
      a: "Notre support est à votre écoute par mail. Nous répondons rapidement à vos questions et intervenons pour résoudre tout souci technique afin que votre site reste toujours opérationnel.",
    },
    {
      q: "Mon site sera-t-il sécurisé et conforme au RGPD ?",
      a: "Oui. Chaque site est livré avec un certificat SSL (https) garantissant la sécurité des échanges. Nous intégrons également les éléments nécessaires au respect du RGPD afin de protéger vos données et celles de vos clients.",
    },
    {
      q: "Est-ce que mon site sera bien référencé sur Google ?",
      a: "Votre site est optimisé techniquement pour un référencement naturel efficace dès sa mise en ligne. Pour aller plus loin, nous proposons des prestations SEO avancées afin d’améliorer durablement votre visibilité.",
    },
  ];
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <h2 id="faq-title" className="text-3xl font-bold mb-6">Questions fréquentes</h2>
        {/* Mobile: 1 colonne, ordre naturel */}
        <div className="md:hidden space-y-6">
          {items.map((it, i) => {
            const isOpen = openIndex === i;
            return (
              <details key={i} open={isOpen} className="rounded-lg border border-border p-4 bg-white">
                <summary
                  className="cursor-pointer font-semibold"
                  aria-expanded={isOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenIndex((prev) => (prev === i ? null : i));
                  }}
                >
                  {it.q}
                </summary>
                <p className="mt-2 text-black/70">{it.a}</p>
              </details>
            );
          })}
        </div>

        {/* Desktop: 2 colonnes indépendantes pour éviter l'effet de ligne partagée */}
        <div className="hidden md:flex md:gap-6">
          <div className="flex-1 space-y-6">
            {items
              .map((it, idx) => ({ it, idx }))
              .filter(({ idx }) => idx % 2 === 0)
              .map(({ it, idx }) => {
                const isOpen = openIndex === idx;
                return (
                  <details key={idx} open={isOpen} className="rounded-lg border border-border p-4 bg-white">
                    <summary
                      className="cursor-pointer font-semibold"
                      aria-expanded={isOpen}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenIndex((prev) => (prev === idx ? null : idx));
                      }}
                    >
                      {it.q}
                    </summary>
                    <p className="mt-2 text-black/70">{it.a}</p>
                  </details>
                );
              })}
          </div>
          <div className="flex-1 space-y-6">
            {items
              .map((it, idx) => ({ it, idx }))
              .filter(({ idx }) => idx % 2 === 1)
              .map(({ it, idx }) => {
                const isOpen = openIndex === idx;
                return (
                  <details key={idx} open={isOpen} className="rounded-lg border border-border p-4 bg-white">
                    <summary
                      className="cursor-pointer font-semibold"
                      aria-expanded={isOpen}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenIndex((prev) => (prev === idx ? null : idx));
                      }}
                    >
                      {it.q}
                    </summary>
                    <p className="mt-2 text-black/70">{it.a}</p>
                  </details>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
