"use client";
import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const search = useSearchParams();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const resp = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!resp.ok) {
          const data = await resp.json().catch(() => null);
          setError(data?.error || "Connexion impossible. Réessayez.");
          return;
        }
        const from = search.get("from");
        router.push(from === "success" ? "/formation" : "/formation");
      } catch (err) {
        setError("Erreur réseau. Réessayez.");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border p-6 bg-card shadow-soft">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Votre email"
          />
        </div>
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Votre mot de passe"
          />
        </div>
        {error && <div className="text-sm text-red-600" role="alert">{error}</div>}
        <Button type="submit" className="w-full h-11" disabled={isPending}>
          {isPending ? "Connexion..." : "Se connecter"}
        </Button>
        <div className="text-sm text-muted-foreground text-center">
          <a className="underline" href="/forgot">Mot de passe oublié ?</a>
        </div>
      </div>
    </form>
  );
}

