"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function SupportSection() {
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Message envoyé ! Nous vous répondrons rapidement.");
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Support</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong>Q:</strong> Comment accéder à la formation ?
              <br />
              <strong>R:</strong> Achetez un produit et connectez-vous avec votre email d’achat.
            </p>
            <p>
              <strong>Q:</strong> Puis-je obtenir une facture ?
              <br />
              <strong>R:</strong> Oui, Stripe vous envoie un reçu par email.
            </p>
            <p>
              <strong>Q:</strong> Et si j’ai un souci ?
              <br />
              <strong>R:</strong> Contactez-nous via le formulaire, on vous aide rapidement.
            </p>
          </div>
        </div>
        <div>
          <form onSubmit={onSubmit} className="rounded-2xl border border-border p-6 bg-card shadow-soft" aria-live="polite">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="vous@exemple.com" aria-label="Votre email" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Input id="message" name="message" placeholder="Votre question" aria-label="Votre message" />
              </div>
              <Button type="submit" className="w-full h-11">Envoyer</Button>
              {status && (
                <div role="status" className="text-sm text-green-700">{status}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

