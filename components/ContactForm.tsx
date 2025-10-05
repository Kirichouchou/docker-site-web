"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import type { Language } from "../locales/translations";

type ContactFormProps = {
  variant?: "default" | "overlay";
};

type FieldCopy = {
  label: string;
  placeholder?: string;
};

type VariantCopy = {
  firstName: FieldCopy;
  lastName: FieldCopy;
  email: FieldCopy;
  phone: FieldCopy;
  project: FieldCopy;
  submit: string;
  submitting: string;
};

type BaseCopy = {
  name: FieldCopy;
  email: FieldCopy;
  message: FieldCopy;
  submit: string;
  submitting: string;
};

type SelectionCopy = {
  title: string;
  priceLabel: string;
  hostingToggle: string;
};

type StatusCopy = {
  overlayMissing: string;
  baseMissing: string;
  success: string;
  unknownError: string;
  networkError: string;
};

type MessageTemplateCopy = {
  phoneLabel: string;
};

type FormCopy = {
  selection: SelectionCopy;
  overlay: VariantCopy;
  base: BaseCopy;
  statuses: StatusCopy;
  messageTemplate: MessageTemplateCopy;
};

const FORM_COPY: Record<Language, FormCopy> = {
  fr: {
    selection: {
      title: "Votre sélection",
      priceLabel: "Paiement unique :",
      hostingToggle: "Ajouter l'hébergement (+{fee} EUR/mois, VPS géré)",
    },
    overlay: {
      firstName: { label: "Prénom*", placeholder: "Claire" },
      lastName: { label: "Nom*", placeholder: "Lemoine" },
      email: { label: "Email*", placeholder: "claire@example.com" },
      phone: { label: "Téléphone*", placeholder: "06 72 45 13 90" },
      project: {
        label: "Votre projet*",
        placeholder: "Décrivez vos objectifs, délais et contraintes.",
      },
      submit: "Envoyer le formulaire",
      submitting: "Envoi...",
    },
    base: {
      name: { label: "Nom" },
      email: { label: "Email" },
      message: {
        label: "Message",
        placeholder: "Précisez vos besoins, délais, budget.",
      },
      submit: "Envoyer",
      submitting: "Envoi...",
    },
    statuses: {
      overlayMissing: "Merci de renseigner tous les champs.",
      baseMissing: "Veuillez remplir tous les champs.",
      success: "Demande envoyée avec succès.",
      unknownError: "Erreur inconnue.",
      networkError: "Erreur réseau.",
    },
    messageTemplate: {
      phoneLabel: "Téléphone",
    },
  },
  en: {
    selection: {
      title: "Your selection",
      priceLabel: "One-time payment:",
      hostingToggle: "Add hosting (+{fee} EUR/month, managed VPS)",
    },
    overlay: {
      firstName: { label: "First name*", placeholder: "Claire" },
      lastName: { label: "Last name*", placeholder: "Lemoine" },
      email: { label: "Email*", placeholder: "claire@example.com" },
      phone: { label: "Phone*", placeholder: "06 72 45 13 90" },
      project: {
        label: "Your project*",
        placeholder: "Describe your goals, deadlines, and constraints.",
      },
      submit: "Send the form",
      submitting: "Sending...",
    },
    base: {
      name: { label: "Name" },
      email: { label: "Email" },
      message: {
        label: "Message",
        placeholder: "Specify your needs, timeline, budget.",
      },
      submit: "Send",
      submitting: "Sending...",
    },
    statuses: {
      overlayMissing: "Please fill in every field.",
      baseMissing: "Please complete all fields.",
      success: "Request sent successfully.",
      unknownError: "Unknown error.",
      networkError: "Network error.",
    },
    messageTemplate: {
      phoneLabel: "Phone",
    },
  },
  es: {
    selection: {
      title: "Tu selección",
      priceLabel: "Pago único:",
      hostingToggle: "Añadir hosting (+{fee} EUR/mes, VPS gestionado)",
    },
    overlay: {
      firstName: { label: "Nombre*", placeholder: "Claire" },
      lastName: { label: "Apellido*", placeholder: "Lemoine" },
      email: { label: "Email*", placeholder: "claire@example.com" },
      phone: { label: "Teléfono*", placeholder: "06 72 45 13 90" },
      project: {
        label: "Tu proyecto*",
        placeholder: "Describe tus objetivos, plazos y restricciones.",
      },
      submit: "Enviar formulario",
      submitting: "Enviando...",
    },
    base: {
      name: { label: "Nombre" },
      email: { label: "Email" },
      message: {
        label: "Mensaje",
        placeholder: "Describe tus necesidades, plazos y presupuesto.",
      },
      submit: "Enviar",
      submitting: "Enviando...",
    },
    statuses: {
      overlayMissing: "Por favor, completa todos los campos.",
      baseMissing: "Completa todos los campos.",
      success: "Solicitud enviada con éxito.",
      unknownError: "Error desconocido.",
      networkError: "Error de red.",
    },
    messageTemplate: {
      phoneLabel: "Teléfono",
    },
  },
};

export default function ContactForm({ variant = "default" }: ContactFormProps) {
  const params = useSearchParams();
  const { language } = useLanguage();
  const copy = FORM_COPY[language as Language] ?? FORM_COPY.fr;

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
  const formClass = isOverlay ? "space-y-3" : "mt-6 space-y-4";
  const labelClass = isOverlay
    ? "block text-xs font-semibold uppercase tracking-[0.22em] text-white/70"
    : "block text-sm font-semibold";
  const inputClass = isOverlay
    ? "mt-2 w-full rounded-2xl border border-white/25 bg-[rgba(42,55,73,0.82)] px-4 py-2.5 text-sm text-white/90 placeholder:text-white/55 backdrop-blur focus:border-white/45 focus:outline-none focus:ring-2 focus:ring-white/35"
    : "mt-1 w-full rounded-lg border border-border px-3 py-2 focus:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/10";
  const buttonClass = isOverlay
    ? "inline-flex items-center justify-center rounded-full border border-white/30 bg-[rgba(42,55,73,0.82)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
    : "inline-flex items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold disabled:opacity-60";
  const selectionBoxClass = isOverlay
    ? "mb-4 rounded-2xl border border-white/20 bg-[rgba(35,47,66,0.78)] p-4 text-white/85 backdrop-blur"
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
  const overlayShellClass =
    "rounded-[32px] border border-white/25 bg-[rgba(26,39,56,0.88)] p-5 shadow-[0_28px_110px_-60px_rgba(7,17,29,0.55)] backdrop-blur-2xl sm:p-7";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    let name = "";
    let email = "";
    let message = "";

    if (isOverlay) {
      const firstName = String(fd.get("firstName") || "").trim();
      const lastName = String(fd.get("lastName") || "").trim();
      const overlayEmail = String(fd.get("overlayEmail") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const project = String(fd.get("project") || "").trim();

      if (!firstName || !lastName || !overlayEmail || !phone || !project) {
        setStatus({ ok: false, msg: copy.statuses.overlayMissing });
        return;
      }

      name = `${firstName} ${lastName}`.trim();
      email = overlayEmail;
      message = `${project}\n\n---\n${copy.messageTemplate.phoneLabel} : ${phone}`;
    } else {
      name = String(fd.get("name") || "").trim();
      email = String(fd.get("email") || "").trim();
      message = String(fd.get("message") || "").trim();

      if (!name || !email || !message) {
        setStatus({ ok: false, msg: copy.statuses.baseMissing });
        return;
      }
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
        setStatus({ ok: true, msg: copy.statuses.success });
        form.reset();
        setWithHosting(initialHosting);
      } else {
        setStatus({ ok: false, msg: data?.error || copy.statuses.unknownError });
      }
    } catch (err) {
      setStatus({ ok: false, msg: copy.statuses.networkError });
    } finally {
      setPending(false);
    }
  }

  const hostingToggleLabel = copy.selection.hostingToggle.replace("{fee}", hostingFee.toString());

  return (
    <>
      {!isOverlay && (selectedOffer || selectedLabel || price !== undefined) && (
        <aside className={selectionBoxClass}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className={selectionLabelClass}>{copy.selection.title}</div>
              <div className="font-semibold">{selectedLabel || selectedOffer}</div>
              {price !== undefined && (
                <div className="mt-1 text-sm">
                  {copy.selection.priceLabel} <strong>{price} EUR</strong>
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
              <span>{hostingToggleLabel}</span>
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

        {isOverlay ? (
          <>
            <div className={overlayShellClass}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    {copy.overlay.firstName.label}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className={inputClass}
                    autoComplete="given-name"
                    placeholder={copy.overlay.firstName.placeholder}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    {copy.overlay.lastName.label}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className={inputClass}
                    autoComplete="family-name"
                    placeholder={copy.overlay.lastName.placeholder}
                  />
                </div>
                <div>
                  <label htmlFor="overlayEmail" className={labelClass}>
                    {copy.overlay.email.label}
                  </label>
                  <input
                    id="overlayEmail"
                    name="overlayEmail"
                    type="email"
                    required
                    className={inputClass}
                    autoComplete="email"
                    placeholder={copy.overlay.email.placeholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    {copy.overlay.phone.label}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    className={inputClass}
                    autoComplete="tel"
                    placeholder={copy.overlay.phone.placeholder}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="project" className={labelClass}>
                    {copy.overlay.project.label}
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    rows={5}
                    required
                    className={`${inputClass} resize-none`}
                    placeholder={copy.overlay.project.placeholder}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" disabled={pending} className={buttonClass}>
                {pending ? copy.overlay.submitting : copy.overlay.submit}
              </button>
              {status && <p className={statusClass}>{status.msg}</p>}
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="name" className={labelClass}>
                {copy.base.name.label}
              </label>
              <input id="name" name="name" required className={inputClass} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                {copy.base.email.label}
              </label>
              <input id="email" type="email" name="email" required className={inputClass} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>
                {copy.base.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={inputClass}
                placeholder={copy.base.message.placeholder}
              ></textarea>
            </div>
            <button type="submit" disabled={pending} className={buttonClass}>
              {pending ? copy.base.submitting : copy.base.submit}
            </button>
            {status && <p className={statusClass}>{status.msg}</p>}
          </>
        )}
      </form>
    </>
  );
}