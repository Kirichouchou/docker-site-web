"use client";

import { useSearchParams } from "next/navigation";
import SupportForm from "../../components/SupportForm";

export default function ContactPageClient() {
  const search = useSearchParams();
  const topic = search.get("topic") ?? "support";

  return (
    <div className="section">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight">Support & Aide</h1>

        <p className="mt-2 text-black/70">Une question, un conseil, un besoin urgent ? Expliquez-nous votre situation ; un expert Fynora vous répond sous 24 h avec une solution sur mesure.</p>

        <SupportForm />
      </div>
    </div>
  );
}
