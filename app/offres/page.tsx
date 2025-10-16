import ProductCard from "../../components/ProductCard";

export const metadata = { title: "Nos services" };

const PRODUCTS = [
  {
    key: "productA" as const,
    name: "Formation Complète",
    priceCents: 9900,
    originalPriceCents: 14900,
    bullets: [
      "Formation complète de 20h",
      "Support personnalisé",
      "Certificat de formation",
      "Accès à vie au contenu",
      "Communauté privée"
    ],
    tag: "Populaire",
    image: {
      src: "/api/placeholder/400/300",
      alt: "Formation Complète",
      width: 400,
      height: 300
    }
  },
  {
    key: "productB" as const,
    name: "Formation Avancée",
    priceCents: 19900,
    bullets: [
      "Formation avancée de 40h",
      "Mentoring 1:1",
      "Projets pratiques",
      "Certification professionnelle",
      "Placement garanti"
    ],
    tag: "Premium",
    image: {
      src: "/api/placeholder/400/300",
      alt: "Formation Avancée",
      width: 400,
      height: 300
    }
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Formations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos formations professionnelles conçues pour vous accompagner 
            dans votre développement personnel et professionnel.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.key} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Intéressé par nos formations ?
            </h3>
            <p className="text-gray-600 mb-6">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <a 
              href="/commande" 
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}