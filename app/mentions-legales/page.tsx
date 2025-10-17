import type { Metadata } from "next";
import LegalContent from "./LegalContent";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et informations de contact de votre entreprise.",
};

export default function MentionsLegalesPage() {
  return <LegalContent />;
}
