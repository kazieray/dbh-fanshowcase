"use client";

import { useLanguage } from "@/hooks/use-language";

type DeviantTestResultProps = {
   deviantScore: number;
   onRestart: () => void;
};

export default function DeviantTestResult({ deviantScore, onRestart }: DeviantTestResultProps) {
   const { copy } = useLanguage();

   const isDeviant = deviantScore > 1;
   const resultCopy = copy.home.deviantTest.result;

   return (
      <div className="relative z-10 animate-fade-in text-center">
         <div className="mb-12">
            <div className="mb-4 text-sm tracking-[0.3em] text-white/40">{resultCopy.complete}</div>

            {isDeviant ? (
               <div className="flex flex-col items-center">
                  <h2 className="mb-4 font-display text-4xl font-bold uppercase tracking-widest text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)] md:text-6xl">{resultCopy.deviant.title}</h2>

                  <div className="mb-4 h-px w-24 bg-red-500/50" />

                  <p className="text-sm uppercase tracking-widest text-red-400/80">{resultCopy.deviant.description}</p>
               </div>
            ) : (
               <div className="flex flex-col items-center">
                  <h2 className="mb-4 font-display text-4xl font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_20px_rgba(0,180,255,0.4)] md:text-6xl">{resultCopy.machine.title}</h2>

                  <div className="mb-4 h-px w-24 bg-cyan-400/50" />

                  <p className="text-sm uppercase tracking-widest text-cyan-300/80">{resultCopy.machine.description}</p>
               </div>
            )}
         </div>

         <button type="button" onClick={onRestart} className="border border-white/20 px-6 py-2 text-xs uppercase tracking-widest text-white/60 transition-all hover:border-white hover:text-white">
            {resultCopy.restart}
         </button>
      </div>
   );
}
