import ProductCard from "./ProductCard";
import { CATALOG } from "../lib/catalog"; // <= chemin relatif depuis /components

export default function ProductsSection() {
  const items = Array.isArray(CATALOG) ? CATALOG : [];

  return (
    <section id="produits" className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Produits</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((p) => (
          <ProductCard key={p.key} product={p} />
        ))}
      </div>
    </section>
  );
}
