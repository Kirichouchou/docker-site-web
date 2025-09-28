import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import AnalyticsProvider from "../components/AnalyticsProvider";
import ScrollSystem from "../components/ScrollSystem";

export const metadata: Metadata = {
  title: "Fynora Résultats concrets",
  description: "Générez des résultats mesurables sans focaliser sur le prix. [BÉNÉFICES_CLÉS] avec un accompagnement humain.",
  openGraph: {
    title: "Fynora Résultats concrets",
    description: "[BÉNÉFICES_CLÉS] avec un accompagnement humain.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Fynora",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head />
      <body className="bg-background text-foreground antialiased min-h-screen">
        <ScrollSystem />
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
