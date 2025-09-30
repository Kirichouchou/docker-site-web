"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type ContactFormProps = {
  variant?: "default" | "overlay";
};

export default function ContactForm({ variant = "default" }: ContactFormProps) {
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

  const isOverlay = variant === "overlay";
  const formClass = isOverlay ? "space-y-4" : "mt-6 space-y-4";
  const labelClass = isOverlay
    ? "block text-sm font-semibold text-white/85"
    : "block text-sm font-semibold";
  const inputClass = isOverlay
    ? "mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 backdrop-blur focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
    : "mt-1 w-full rounded-lg border border-border px-3 py-2 focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/10";
  const buttonClass = isOverlay
    ? "inline-flex items-center rounded-full px-6 py-3 min-h-12 border border-white/25 bg-white/15 text-sm font-semibold text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
    : "inline-flex items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold disabled:opacity-60";
  const selectionBoxClass = isOverlay
    ? "mb-6 rounded-2xl border border-white/15 bg-white/10 p-5 text-white/85 backdrop-blur"
    : "mb-6 rounded-lg border border-border bg-white p-4";
  const selectionLabelClass = isOverlay ? "text-sm text-white/70" : "text-sm text-black/60";
  const toggleLabelClass = isOverlay
    ? "inline-flex items-center gap-2 text-sm text-white/80 cursor-pointer"
    : "inline-flex items-center gap-2 text-sm cursor-pointer";
  const statusClass = isOverlay
    ? status?.ok
      ? "text-sm text-emerald-300"
      : status
      ? "text-sm text-rose-300"
      : ""
    : status?.ok
    ? "text-sm text-green-600"
    : status
    ? "text-sm text-red-600"
    : "";

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
        setStatus({ ok: true, msg: "Demande envoyee avec succes." });
        form.reset();
      } else {
        setStatus({ ok: false, msg: data?.error || "Erreur inconnue." });
      }
    } catch (err) {
      setStatus({ ok: false, msg: "Erreur reseau." });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {!isOverlay && (selectedOffer || selectedLabel || price !== undefined) && (
        <aside className={selectionBoxClass}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className={selectionLabelClass}>Votre selection</div>
              <div className="font-semibold">{selectedLabel || selectedOffer}</div>
              {price !== undefined && (
                <div className="mt-1 text-sm">
                  Paiement unique: <strong>{price} EUR</strong>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <label className={toggleLabelClass}>
              <input
                type="checkbox"
                checked={withHosting}
                onChange={(event) => setWithHosting(event.target.checked)}
              />
              <span>Ajouter l'hebergement (+{hostingFee} EUR/mois, VPS gere)</span>
            </label>
          </div>
        </aside>
      )}

      <form className={formClass} onSubmit={onSubmit}>
        <input type="hidden" name="offer" value={selectedOffer} />
        <input type="hidden" name="label" value={selectedLabel} />
        <input type="hidden" name="price" value={price ?? ""} />
        <input type="hidden" name="hosting" value={withHosting ? "true" : "false"} />
        <input type="hidden" name="hosting_fee" value={String(hostingFee)} />

        <div>
          <label htmlFor="name" className={labelClass}>Nom</label>
          <input id="name" name="name" required className={inputClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" type="email" name="email" required className={inputClass} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={inputClass}
            placeholder="Precisez vos besoins, delais, budget."
          ></textarea>
        </div>
        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Envoi..." : "Envoyer"}
        </button>
        {status && <p className={statusClass}>{status.msg}</p>}
      </form>
    </>
  );
}
