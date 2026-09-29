"use client";

import { useLanguage } from "@/hooks/use-language";

export default function LanguageSwitcher() {
   const { language, setLanguage } = useLanguage();

   return (
      <div className="flex items-center gap-2 font-mono text-[9px] font-medium uppercase tracking-[0.1em] lg:text-[10px]" aria-label="Language selector">
         <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"} className={`transition-colors duration-300 ${language === "en" ? "text-dbh-blue" : "text-white/40 hover:text-white/80"}`}>
            EN
         </button>

         <span aria-hidden="true" className="text-white/20">
            /
         </span>

         <button type="button" onClick={() => setLanguage("id")} aria-pressed={language === "id"} className={`transition-colors duration-300 ${language === "id" ? "text-dbh-blue" : "text-white/40 hover:text-white/80"}`}>
            ID
         </button>
      </div>
   );
}
