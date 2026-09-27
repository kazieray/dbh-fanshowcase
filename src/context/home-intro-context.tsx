"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type HomeIntroContextValue = {
   hasEnteredHome: boolean;
   markHomeEntered: () => void;
};

const HomeIntroContext = createContext<HomeIntroContextValue | null>(null);

export function HomeIntroProvider({ children }: { children: ReactNode }) {
   const [hasEnteredHome, setHasEnteredHome] = useState(false);
   const markHomeEntered = useCallback(() => setHasEnteredHome(true), []);
   const value = useMemo(() => ({ hasEnteredHome, markHomeEntered }), [hasEnteredHome, markHomeEntered]);

   return <HomeIntroContext.Provider value={value}>{children}</HomeIntroContext.Provider>;
}

export function useHomeIntro() {
   const context = useContext(HomeIntroContext);

   if (!context) {
      throw new Error("useHomeIntro must be used inside HomeIntroProvider");
   }

   return context;
}
