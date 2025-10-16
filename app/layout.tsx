import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/reveal.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactOverlayProvider from "../components/ContactOverlayProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { LanguageProvider } from "../contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Fynora",
  description: "Votre description ici",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body className="bg-[#F2F5FC]">
        <LanguageProvider>
          <LanguageSwitcher />
          <ContactOverlayProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ContactOverlayProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}



