"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SupportForm() {
  const params = useSearchParams();
  const topic = params.get("topic") || "support";
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const subject = String(fd.get("subject") || topic).trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setStatus({ ok: false, msg: "Veuillez remplir tous les champs." });
      return;
    }

    try {
      setPending(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setStatus({ ok: true, msg: "Message envoyé avec succès." });
        form.reset();
      } else {
        setStatus({ ok: false, msg: data?.error || "Erreur inconnue." });
      }
    } catch (err) {
      setStatus({ ok: false, msg: "Erreur réseau." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
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
      <button type="submit" disabled={pending} className="inline-flex items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold disabled:opacity-60">
        {pending ? "Envoi..." : "Envoyer"}
      </button>
      {status && (
        <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.msg}</p>
      )}
    </form>
  );
}
