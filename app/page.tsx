import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import SupportSection from "../components/SupportSection";

export default function HomePage() {
  return (
    <>
      <section id="accueil">
        <Hero />
      </section>
      <section id="produits" className="scroll-mt-24">
        <ProductsSection />
      </section>
      <section id="support" className="scroll-mt-24">
        <SupportSection />
      </section>
    </>
  );
}

