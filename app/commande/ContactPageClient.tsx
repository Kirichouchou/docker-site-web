"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "../../components/ContactForm";

export default function ContactPageClient() {
  const search = useSearchParams();
  const label = search.get("label");

  return (
    <div className="section">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight">Nous contacter pour commander</h1>
        {label && <p className="mt-2 text-black/70">Sélection: {label}</p>}
        <p className="mt-2 text-black/70">Renseignez vos coordonnées et options. Nous confirmons et lançons rapidement.</p>

        <ContactForm />
      </div>
    </div>
  );
}

