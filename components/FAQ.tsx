export default function FAQ() {
  const items = [
    {
      q: "Combien de temps faut-il pour créer mon site ?",
      a: "En moyenne, un site est prêt en 7 à 14 jours après validation de votre commande. Tout dépend du niveau de personnalisation demandé.",
    },
    {
      q: "Est-ce que mon site sera visible sur téléphone ?",
      a: "Oui ! Tous nos sites sont 100 % responsives : ils s’adaptent automatiquement à ordinateur, tablette et smartphone.",
    },
    {
      q: "Est-ce que je peux modifier mon site après la livraison ?",
      a: "Bien sûr. Vous aurez un accès pour modifier textes et images. Et si vous préférez, nous pouvons aussi le faire pour vous (sur devis).",
    },
    {
      q: "Comment se passe le paiement ?",
      a: "Le paiement se fait en ligne, de manière sécurisée. Une facture est automatiquement générée et envoyée par email.",
    },
    {
      q: "Que se passe-t-il si j’ai un problème technique ?",
      a: "Pas d’inquiétude ! Notre support est disponible par mail pour répondre à vos questions et résoudre les soucis techniques rapidement.",
    },
    {
      q: "Puis-je ajouter plus de fonctionnalités plus tard (ex : réservation en ligne, Click & Collect, blog…) ?",
      a: "Oui. Votre site est pensé pour évoluer. Vous pouvez démarrer simple et ajouter des fonctionnalités à mesure que vos besoins grandissent.",
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
