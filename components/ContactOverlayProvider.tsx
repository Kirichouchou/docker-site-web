"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MessageCircle, Video, X } from "lucide-react";
import ContactForm from "./ContactForm";

type ContactOverlayContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ContactOverlayContext = createContext<ContactOverlayContextValue | undefined>(undefined);

export function useContactOverlay() {
  const ctx = useContext(ContactOverlayContext);
  if (!ctx) {
    throw new Error("useContactOverlay must be used within ContactOverlayProvider");
  }
  return ctx;
}

export default function ContactOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <ContactOverlayContext.Provider value={value}>
      {children}
      {isOpen && <OverlayContent onClose={close} />}
    </ContactOverlayContext.Provider>
  );
}

function OverlayContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-10 sm:px-6">
      <div
        className="absolute inset-0 bg-[#040b16]/85 backdrop-blur-2xl"
        onClick={onClose}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-[210] inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Fermer le formulaire de contact"
      >
        <span className="hidden sm:inline">Fermer</span>
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="relative w-full max-w-[96rem] overflow-hidden rounded-[40px] border border-white/10 bg-white/10 text-white shadow-[0_40px_140px_rgba(4,14,34,0.65)] backdrop-blur-[32px]">
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex h-full flex-col gap-8">
            <div className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70">
                Vous souhaitez performer avec Fynora ?
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white">
                Echanger autour de votre projet digital.
              </h2>
              <p className="mt-4 text-sm text-white/70">
                Partagez vos objectifs : nous preparons un plan d'action sur-mesure pour accelerer votre acquisition et votre conversion.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-6 rounded-[36px] border border-white/12 bg-white/8 p-10 sm:p-12 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="flex items-start gap-4 text-white">
                <Video className="h-5 w-5" aria-hidden="true" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">Reserver un appel</h3>
                  <p className="text-sm text-white/70">30 minutes en visio pour comprendre vos enjeux et definir un plan d'action.</p>
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-3 pt-4">
                <a
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/15 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href="/contact"
                  onClick={onClose}
                >
                  Voir le calendrier de rendez-vous
                </a>
                <p className="text-xs text-white/55">
                  Besoin d'un message rapide ? Utilisez le formulaire ci-contre.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/12 bg-white/12 p-6 sm:p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Nous ecrire</h3>
                <p className="text-sm text-white/70">Posez vos questions, nous revenons vers vous sous 24 h.</p>
              </div>
            </div>
            <div className="mt-6">
              <ContactForm variant="overlay" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

