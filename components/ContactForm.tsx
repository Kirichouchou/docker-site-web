"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const params = useSearchParams();
  const selectedOffer = params.get("offer") || "";
  const selectedLabel = params.get("label") || "";
  const priceParam = params.get("price");
  const initialHosting = params.get("hosting") === "true";

  const hostingFee = Number(process.env.NEXT_PUBLIC_HOSTING_FEE ?? 5);
  const price = useMemo(() => {
    const n = Number(priceParam);
    return Number.isFinite(n) ? n : undefined;
  }, [priceParam]);

  const [withHosting, setWithHosting] = useState<boolean>(initialHosting);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus({ ok: false, msg: "Veuillez remplir tous les champs." });
      return;
    }

    const options = {
      offer: selectedOffer || undefined,
      label: selectedLabel || undefined,
      price: price ?? undefined,
      hosting: withHosting,
      hostingFee,
    };

    try {
      setPending(true);
      const res = await fetch("/api/commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, options }),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setStatus({ ok: true, msg: "Demande envoyée avec succès." });
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
    <>
      {(selectedOffer || selectedLabel || price !== undefined) && (
        <aside className="mb-6 rounded-lg border border-border bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-black/60">Votre sélection</div>
              <div className="font-semibold">{selectedLabel || selectedOffer}</div>
              {price !== undefined && (
                <div className="mt-1 text-sm">Paiement unique: <strong>{price}€</strong></div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={withHosting}
                onChange={(e) => setWithHosting(e.target.checked)}
              />
              <span>Ajouter l’hébergement (+{hostingFee}€/mois, VPS géré)</span>
            </label>
          </div>
        </aside>
      )}

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {/* Hidden fields to transmit selection */}
        <input type="hidden" name="offer" value={selectedOffer} />
        <input type="hidden" name="label" value={selectedLabel} />
        <input type="hidden" name="price" value={price ?? ""} />
        <input type="hidden" name="hosting" value={withHosting ? "true" : "false"} />
        <input type="hidden" name="hosting_fee" value={String(hostingFee)} />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Nom</label>
          <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-border px-3 py-2" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input id="email" type="email" name="email" required className="mt-1 w-full rounded-lg border border-border px-3 py-2" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold">Message</label>
          <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-lg border border-border px-3 py-2" placeholder="Précisez vos besoins, délais, budget."></textarea>
        </div>
        <button type="submit" disabled={pending} className="inline-flex items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold disabled:opacity-60">
          {pending ? "Envoi..." : "Envoyer"}
        </button>
        {status && (
          <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.msg}</p>
        )}
      </form>
    </>
  );
}
