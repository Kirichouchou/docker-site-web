"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo → home */}
        <Link
          href="/#accueil"
          className="hover:opacity-90 transition inline-flex items-center"
          aria-label="Fynora"
        >
          <img src="/fynora-logo.png" alt="Fynora" className="h-20 md:h-24 w-auto object-contain" />
        </Link>

        {/* Liens */}
        <div className="flex items-center gap-6">
          <Link href="/#accueil" className="font-bold hover:opacity-80 transition">
            Accueil
          </Link>
          <Link href="/#produits" className="font-bold hover:opacity-80 transition">
            Produits
          </Link>
          <Link href="/#support" className="font-bold hover:opacity-80 transition">
            Support
          </Link>
        </div>

        {/* CTA Connexion */}
        <Link
          href="/login"
          className="inline-flex items-center rounded-2xl px-4 py-2 bg-brand text-white shadow-soft hover:opacity-90 transition"
        >
          Connexion
        </Link>
      </div>
    </nav>
  );
}
