"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function Greeting() {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        {t("common.greeting")} ! 👋
      </h1>
      <p className="text-lg text-gray-600">
        Bienvenue sur le site de Fynora
      </p>
    </div>
  );
}