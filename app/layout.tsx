// app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Fynora — Formation",
  description: "Mini-boutique en ligne avec formation protégée et Stripe.",
  openGraph: {
    title: "Fynora — Formation",
    description: "Mini-boutique en ligne avec formation protégée et Stripe.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Fynora",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* Même si tu utilises `metadata`, Next exige un head explicite */}
      <head />
      <body className="bg-background text-foreground antialiased min-h-screen">
        <Navbar />
        <main className="min-h-[calc(100vh-theme(space.24))]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
