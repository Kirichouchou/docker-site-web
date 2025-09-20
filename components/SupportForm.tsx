"use client";

import { useSearchParams } from "next/navigation";

export default function SupportForm() {
  const params = useSearchParams();
  const topic = params.get("topic") || "support";

  return (
    <form className="mt-6 space-y-4" action="mailto:contact@example.com" method="post">
      <input type="hidden" name="page" value="support_contact" />
      <input type="hidden" name="topic" value={topic} />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold">Nom</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold">Email</label>
        <input id="email" type="email" name="email" required className="mt-1 w-full rounded-lg border border-border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold">Sujet</label>
        <select id="subject" name="subject" defaultValue={topic} className="mt-1 w-full rounded-lg border border-border px-3 py-2">
          <option value="support">Support technique</option>
          <option value="bug">Bug / Incident</option>
          <option value="facturation">Facturation</option>
          <option value="question">Question générale</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold">Message</label>
        <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-lg border border-border px-3 py-2" placeholder="Décrivez votre problème, ce que vous attendiez, et toute info utile."></textarea>
      </div>
      <button type="submit" className="inline-flex items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold">
        Envoyer
      </button>
    </form>
  );
}

