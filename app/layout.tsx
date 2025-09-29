import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/reveal.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";

export const metadata: Metadata = {
  title: "Mini-boutique",
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
      <body className="bg-gray-50">
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
