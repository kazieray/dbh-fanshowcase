"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type HomeIntroContextValue = {
   hasEnteredHome: boolean;
   isHomeIntroReady: boolean;
   markHomeEntered: () => void;
};

const HomeIntroContext = createContext<HomeIntroContextValue | null>(null);

export function HomeIntroProvider({ children }: { children: ReactNode }) {
   const [hasEnteredHome, setHasEnteredHome] = useState(false);
   const [isHomeIntroReady, setIsHomeIntroReady] = useState(false);

   useEffect(() => {
      const timeout = window.setTimeout(() => {
         setHasEnteredHome(localStorage.getItem("dbh-home-intro-complete") === "true");
         setIsHomeIntroReady(true);
      }, 0);

      return () => window.clearTimeout(timeout);
   }, []);

   const markHomeEntered = useCallback(() => {
      localStorage.setItem("dbh-home-intro-complete", "true");
      setHasEnteredHome(true);
   }, []);
   const value = useMemo(() => ({ hasEnteredHome, isHomeIntroReady, markHomeEntered }), [hasEnteredHome, isHomeIntroReady, markHomeEntered]);

   return <HomeIntroContext.Provider value={value}>{children}</HomeIntroContext.Provider>;
}

export function useHomeIntro() {
   const context = useContext(HomeIntroContext);

   if (!context) {
      throw new Error("useHomeIntro must be used inside HomeIntroProvider");
   }

   return context;
}
