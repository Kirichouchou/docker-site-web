<<<<<<< HEAD
import type { Metadata } from "next";
=======
﻿import type { Metadata } from "next";
>>>>>>> 991b4c6 (Ylan le negre)
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import AnalyticsProvider from "../components/AnalyticsProvider";
import ScrollSystem from "../components/ScrollSystem";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Fynora Résultats concrets",
  description: "Générez des résultats mesurables sans focaliser sur le prix. [BÉNÉFICES_CLÉS] avec un accompagnement humain.",
  openGraph: {
    title: "Fynora Résultats concrets",
    description: "[BÉNÉFICES_CLÉS] avec un accompagnement humain.",
=======
  title: "Fynora RÃ©sultats concrets",
  description: "GÃ©nÃ©rez des rÃ©sultats mesurables sans focaliser sur le prix. [BÃ‰NÃ‰FICES_CLÃ‰S] avec un accompagnement humain.",
  openGraph: {
    title: "Fynora RÃ©sultats concrets",
    description: "[BÃ‰NÃ‰FICES_CLÃ‰S] avec un accompagnement humain.",
>>>>>>> 991b4c6 (Ylan le negre)
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
<<<<<<< HEAD
      <body className="bg-background text-foreground antialiased min-h-screen">
        <ScrollSystem />
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
=======
      <body className="bg-[#F2F5FC] text-foreground antialiased min-h-screen">
        <ScrollSystem />
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-[calc(100vh-200px)] bg-[#F2F5FC]">{children}</main>
>>>>>>> 991b4c6 (Ylan le negre)
        <Footer />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
<<<<<<< HEAD
=======


>>>>>>> 991b4c6 (Ylan le negre)
