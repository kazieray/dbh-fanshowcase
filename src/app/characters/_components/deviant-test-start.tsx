"use client";

import { ArrowUp, Triangle } from "lucide-react";

import { useLanguage } from "@/hooks/use-language";

type DeviantTestStartProps = {
   onStart: () => void;
};

export default function DeviantTestStart({ onStart }: DeviantTestStartProps) {
   const { copy } = useLanguage();

   return (
      <div className="relative z-10 w-full px-5 text-center sm:px-8">
         <h2 className="mx-auto max-w-[620px] font-display text-[clamp(2.25rem,11vw,3.5rem)] font-light uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-[clamp(3rem,8vw,4rem)] sm:tracking-[0.15em] md:text-5xl md:tracking-[0.2em]">
            Software <span className="font-medium">Analysis</span>
         </h2>

         <p className="mx-auto mt-3 max-w-[320px] font-mono text-[8px] uppercase leading-[1.7] tracking-[0.16em] text-white/40 sm:max-w-none sm:text-[9px] sm:tracking-[0.24em] md:text-[10px] md:tracking-[0.3em]">
            {copy.home.deviantTest.start.subtitle}
         </p>

         <button type="button" onClick={onStart} aria-label={copy.home.deviantTest.start.action} className="group relative mx-auto mt-9 flex cursor-pointer items-center justify-center sm:mt-12">
            <span className="pointer-events-none absolute inset-0 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border border-dbh-blue/70" />

            <span className="pointer-events-none absolute -inset-3 rounded-full border border-dbh-blue/25 opacity-0 transition-[opacity,transform,border-color] duration-500 [@media(hover:hover)]:group-hover:scale-110 [@media(hover:hover)]:group-hover:border-dbh-blue/45 [@media(hover:hover)]:group-hover:opacity-100 sm:-inset-4" />

            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dbh-blue/50 bg-[#05243a]/35 text-dbh-blue shadow-[0_0_15px_rgba(82,199,255,0.22)] transition-[color,background-color,border-color,box-shadow,transform] duration-300 [@media(hover:hover)]:group-hover:scale-105 [@media(hover:hover)]:group-hover:border-dbh-blue/80 [@media(hover:hover)]:group-hover:bg-[#05243a]/55 [@media(hover:hover)]:group-hover:text-white [@media(hover:hover)]:group-hover:shadow-[0_0_24px_rgba(82,199,255,0.3)] sm:h-16 sm:w-16">
               <Triangle className="h-[18px] w-[18px] fill-current stroke-[1.4] sm:h-5 sm:w-5" />
            </span>
         </button>

         <div className="mt-7 flex flex-col items-center gap-2 sm:mt-8">
            <ArrowUp className="h-3.5 w-3.5 animate-bounce text-dbh-blue/55 sm:h-4 sm:w-4" strokeWidth={1.5} />

            <p className="animate-pulse font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-dbh-blue/75 sm:text-[9px] sm:tracking-[0.18em] md:text-[10px] md:tracking-[0.2em]">[ {copy.home.deviantTest.start.action} ]</p>
         </div>
      </div>
   );
}
