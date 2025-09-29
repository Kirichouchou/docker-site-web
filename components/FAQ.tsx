"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

const ITEMS: FaqItem[] = [
  {
    q: "Serai-je accompagné après la mise en ligne ?",
    a: "Oui. Nous restons à vos côtés même après la livraison. Vous bénéficiez d'un suivi personnalisé et d'un interlocuteur dédié pour répondre à vos questions et faire évoluer votre site.",
  },
  {
    q: "Que se passe-t-il si j'ai un problème technique ?",
    a: "Notre support est à votre écoute par mail. Nous répondons rapidement à vos questions et intervenons pour résoudre tout souci technique afin que votre site reste opérationnel.",
  },
  {
    q: "Mon site sera-t-il sécurisé et conforme au RGPD ?",
    a: "Oui. Chaque site est livré avec un certificat SSL (https) garantissant la sécurité des échanges. Nous intégrons également les éléments nécessaires au respect du RGPD afin de protéger vos données et celles de vos clients.",
  },
  {
    q: "Est-ce que mon site sera bien référencé sur Google ?",
    a: "Votre site est optimisé techniquement pour un référencement naturel efficace dès sa mise en ligne. Pour aller plus loin, nous proposons des prestations SEO avancées afin d'améliorer durablement votre visibilité.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const renderItem = (item: FaqItem, index: number) => {
    const isOpen = openIndex === index;
    return (
      <details key={index} open={isOpen} className="rounded-lg border border-border bg-white p-4">
        <summary
          className="cursor-pointer font-semibold"
          aria-expanded={isOpen}
          onClick={(event) => {
            event.preventDefault();
            toggleIndex(index);
          }}
        >
          {item.q}
        </summary>
        <p className="mt-2 text-black/70">{item.a}</p>
      </details>
    );
  };

  const pairedItems = ITEMS.map((item, index) => ({ item, index }));
  const leftColumn = pairedItems.filter(({ index }) => index % 2 === 0);
  const rightColumn = pairedItems.filter(({ index }) => index % 2 === 1);

  return (
    <section className="section bg-[#F2F5FC]" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <h2 id="faq-title" className="mb-6 text-center text-3xl font-bold">
          Questions fréquentes
        </h2>

        <div className="space-y-6 md:hidden">
          {pairedItems.map(({ item, index }) => renderItem(item, index))}
        </div>

        <div className="hidden gap-6 md:flex">
          <div className="flex-1 space-y-6">
            {leftColumn.map(({ item, index }) => renderItem(item, index))}
          </div>
          <div className="flex-1 space-y-6">
            {rightColumn.map(({ item, index }) => renderItem(item, index))}
          </div>
        </div>
      </div>
    </section>
  );
}
