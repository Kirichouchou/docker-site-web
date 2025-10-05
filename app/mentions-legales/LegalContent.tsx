"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { TRANSLATIONS } from "../../locales/translations";

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  sections: LegalSection[];
};

const company = {
  name: "Nom de votre société",
  legalForm: "Forme juridique (ex: SAS)",
  siret: "000 000 000 00000",
  owner: "Nom du propriétaire",
  director: "Nom du directeur de la publication",
  dpo: {
    name: "Nom du DPO",
    email: "dpo@votresociete.com",
  },
  contactEmail: "contact@votresociete.com",
  address: "Adresse complète de votre société",
  host: {
    name: "Nom de l'hébergeur",
    address: "Adresse complète de l'hébergeur",
    phone: "00 00 00 00 00",
    website: "https://www.exemple-hebergeur.com",
  },
};

const placeholderValues = {
  owner: company.owner,
  companyName: company.name,
  legalForm: company.legalForm,
  siret: company.siret,
  address: company.address,
  contactEmail: company.contactEmail,
  director: company.director,
  hostName: company.host.name,
  hostAddress: company.host.address,
  hostPhone: company.host.phone,
  hostWebsite: company.host.website,
  dpoName: company.dpo.name,
  dpoEmail: company.dpo.email,
};

const defaultLegal = TRANSLATIONS.fr.legal as LegalCopy;

function getPlaceholderValue(key: string, fallbackTemplate: string) {
  const value = placeholderValues[key as keyof typeof placeholderValues];
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  return fallbackTemplate;
}

function resolvePlaceholders(text: string) {
  return text
    .replace(/\{\{(\w+)\}\}/g, (_, rawKey: string) => getPlaceholderValue(rawKey, `{{${rawKey}}}`))
    .replace(/\{(\w+)\}/g, (_, rawKey: string) => getPlaceholderValue(rawKey, `{${rawKey}}`));
}

export default function LegalContent() {
  const { dictionary } = useLanguage();
  const legal = (dictionary?.legal ?? defaultLegal) as LegalCopy;

  const sections = Array.isArray(legal.sections) && legal.sections.length > 0 ? legal.sections : defaultLegal.sections;
  const hero = legal.hero ?? defaultLegal.hero;

  return (
    <div className="bg-[#F2F5FC] py-16 text-gray-900">
      <div className="container mx-auto max-w-4xl px-6">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0A304E]">
            {hero.eyebrow}
          </p>
          <h1 className="text-3xl font-extrabold text-[#0A304E] md:text-4xl">{hero.title}</h1>
          <p className="text-sm text-gray-600 md:text-base">{hero.description}</p>
        </header>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <Section key={section.id} title={section.title} paragraphs={section.paragraphs} list={section.list} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  paragraphs,
  list,
}: {
  title: string;
  paragraphs: string[];
  list?: string[];
}) {
  const formattedParagraphs = paragraphs.map((paragraph) => resolvePlaceholders(paragraph));
  const formattedList = list?.map((item) => resolvePlaceholders(item));

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-[0_18px_60px_-40px_rgba(10,48,78,0.25)] backdrop-blur">
      <h2 className="text-lg font-semibold text-[#0A304E] md:text-xl">{resolvePlaceholders(title)}</h2>
      <div className="mt-3 space-y-3 text-sm text-gray-700 md:text-base">
        {formattedParagraphs.map((paragraph, index) => (
          <p key={index} className={index > 0 ? "mt-3" : undefined}>
            {paragraph}
          </p>
        ))}
        {formattedList && formattedList.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
            {formattedList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

