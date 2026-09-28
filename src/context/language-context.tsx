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
   const [languageTransitionMessage, setLanguageTransitionMessage] = useState<string | null>(null);

   useEffect(() => {
      const timeout = window.setTimeout(() => {
         const savedLanguage = localStorage.getItem("dbh-language");

         if (savedLanguage === "en" || savedLanguage === "id") {
            setLanguageState(savedLanguage);
            document.documentElement.lang = savedLanguage;
         }
      }, 0);

      return () => window.clearTimeout(timeout);
   }, []);

   useEffect(() => {
      document.documentElement.lang = language;
   }, [language]);

   const setLanguage = useCallback((nextLanguage: Language) => {
      if (nextLanguage === language) return;

      const messageKey = nextLanguage === "en" ? "switchingToEnglish" : "switchingToIndonesian";
      setLanguageTransitionMessage(translations[language].a11y[messageKey]);
      localStorage.setItem("dbh-language", nextLanguage);
   }, [language]);

   const toggleLanguage = useCallback(() => {
      setLanguage(language === "en" ? "id" : "en");
   }, [language, setLanguage]);

   const value = useMemo(
      () => ({
         language,
         setLanguage,
         toggleLanguage,
         copy: translations[language],
      }),
      [language, setLanguage, toggleLanguage],
   );

   return (
      <LanguageContext.Provider value={value}>
         {children}
         {languageTransitionMessage && (
            <div
               className="language-transition-overlay"
               role="status"
               aria-live="polite"
               onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget && event.animationName === "language-overlay-in") {
                     window.location.reload();
                  }
               }}
            >
               <div className="language-transition-status">
                  <span className="language-transition-spinner" aria-hidden="true" />
                  <span>{languageTransitionMessage}</span>
               </div>
            </div>
         )}
      </LanguageContext.Provider>
   );
}
