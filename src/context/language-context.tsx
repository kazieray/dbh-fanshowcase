"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { en } from "@/data/translations/en";
import { id } from "@/data/translations/id";

export type Language = "en" | "id";

type LanguageContextValue = {
   language: Language;
   setLanguage: (language: Language) => void;
   toggleLanguage: () => void;
   copy: typeof en;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const translations = {
   en,
   id,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
   const [language, setLanguageState] = useState<Language>("en");

   useEffect(() => {
      const timeout = window.setTimeout(() => {
         const savedLanguage = localStorage.getItem("dbh-language");

         if (savedLanguage === "en" || savedLanguage === "id") {
            setLanguageState(savedLanguage);
         }
      }, 0);

      return () => window.clearTimeout(timeout);
   }, []);

   useEffect(() => {
      document.documentElement.lang = language;
   }, [language]);

   const setLanguage = useCallback((nextLanguage: Language) => {
      setLanguageState(nextLanguage);
      localStorage.setItem("dbh-language", nextLanguage);
   }, []);

   const toggleLanguage = useCallback(() => {
      setLanguageState((currentLanguage) => {
         const nextLanguage: Language = currentLanguage === "en" ? "id" : "en";

         localStorage.setItem("dbh-language", nextLanguage);

         return nextLanguage;
      });
   }, []);

   const value = useMemo(
      () => ({
         language,
         setLanguage,
         toggleLanguage,
         copy: translations[language],
      }),
      [language, setLanguage, toggleLanguage],
   );

   return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
