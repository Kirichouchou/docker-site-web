"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  TRANSLATIONS,
  type Language,
  type LanguageOption,
} from "../locales/translations";

const STORAGE_KEY = "fynora:language";

function isLanguage(value: string): value is Language {
  return LANGUAGE_OPTIONS.some((option) => option.code === value);
}

function getNestedValue(source: unknown, key: string): unknown {
  if (!source) {
    return undefined;
  }
  return key.split(".").reduce<unknown>((accumulator, segment) => {
    if (accumulator && typeof accumulator === "object") {
      return (accumulator as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  dictionary: (typeof TRANSLATIONS)[Language];
  t: (key: string) => string;
  options: readonly LanguageOption[];
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isLanguage(stored)) {
      setLanguageState(stored);
      return;
    }

    const browserLanguage = window.navigator.language?.slice(0, 2).toLowerCase();
    if (browserLanguage && isLanguage(browserLanguage)) {
      setLanguageState(browserLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    }
  }, []);

  const dictionary = useMemo(() => TRANSLATIONS[language], [language]);
  const fallback = useMemo(() => TRANSLATIONS[DEFAULT_LANGUAGE], []);

  const translate = useCallback(
    (key: string) => {
      const value = getNestedValue(dictionary, key);
      if (typeof value === "string") {
        return value;
      }
      const fallbackValue = getNestedValue(fallback, key);
      if (typeof fallbackValue === "string") {
        return fallbackValue;
      }
      return key;
    },
    [dictionary, fallback],
  );

  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      dictionary,
      t: translate,
      options: LANGUAGE_OPTIONS,
    }),
    [dictionary, language, setLanguage, translate],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useDictionary() {
  const { dictionary } = useLanguage();
  return dictionary;
}

export function useTranslate() {
  const { t } = useLanguage();
  return t;
}
