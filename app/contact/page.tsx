export const metadata = { title: "Contact" };

import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight">Nous contacter</h1>
        <p className="mt-2 text-black/70">Expliquez votre contexte, vos objectifs et vos délais. Nous revenons sous 24h.</p>

        <ContactForm />
      </div>
    </div>
  );
}

