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
      <div className="relative z-10 w-full animate-fade-in px-5 text-center sm:px-8">
         <div className="mx-auto mb-9 max-w-[640px] sm:mb-12">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.3em] md:text-sm">{resultCopy.complete}</div>

            {isDeviant ? (
               <div className="flex flex-col items-center">
                  <h2 className="mb-4 max-w-full break-words font-display text-[clamp(2.25rem,11vw,4rem)] font-bold uppercase leading-[0.95] tracking-[0.08em] text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)] sm:tracking-widest md:text-6xl">
                     {resultCopy.deviant.title}
                  </h2>

                  <div className="mb-4 h-px w-16 bg-red-500/50 sm:w-24" />

                  <p className="max-w-[340px] font-mono text-[9px] uppercase leading-[1.7] tracking-[0.12em] text-red-400/80 sm:max-w-[500px] sm:text-xs sm:tracking-[0.16em] md:text-sm md:tracking-widest">
                     {resultCopy.deviant.description}
                  </p>
               </div>
            ) : (
               <div className="flex flex-col items-center">
                  <h2 className="mb-4 max-w-full break-words font-display text-[clamp(2.25rem,11vw,4rem)] font-bold uppercase leading-[0.95] tracking-[0.08em] text-cyan-400 drop-shadow-[0_0_20px_rgba(0,180,255,0.4)] sm:tracking-widest md:text-6xl">
                     {resultCopy.machine.title}
                  </h2>

                  <div className="mb-4 h-px w-16 bg-cyan-400/50 sm:w-24" />

                  <p className="max-w-[340px] font-mono text-[9px] uppercase leading-[1.7] tracking-[0.12em] text-cyan-300/80 sm:max-w-[500px] sm:text-xs sm:tracking-[0.16em] md:text-sm md:tracking-widest">
                     {resultCopy.machine.description}
                  </p>
               </div>
            )}
         </div>

         <button
            type="button"
            onClick={onRestart}
            className="min-h-11 border border-white/20 px-6 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60 transition-all [@media(hover:hover)]:hover:border-white [@media(hover:hover)]:hover:text-white sm:text-xs sm:tracking-widest"
         >
            {resultCopy.restart}
         </button>
      </div>
   );
}
