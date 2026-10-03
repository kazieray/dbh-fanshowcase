"use client";

import { useLanguage } from "@/hooks/use-language";
import { useNewsHero } from "@/hooks/use-news";

export default function NewsHero() {
   const { copy } = useLanguage();
   const { heroRef, titleRef, handleTitlePointerMove, resetTitleMotion } = useNewsHero();

   return (
      <header ref={heroRef} className="mx-auto max-w-4xl text-center">
         <p className="news-hero-kicker mb-5 font-mono text-[9px] uppercase tracking-[0.25em] text-dbh-blue">{copy.news.kicker}</p>

         <div onPointerMove={handleTitlePointerMove} onPointerLeave={resetTitleMotion} className="group mx-auto block cursor-default">
            <h1 ref={titleRef} aria-label={`${copy.news.title[0]} ${copy.news.title[1]}`} className="font-display text-[clamp(2.8rem,7vw,7rem)] font-medium uppercase leading-[0.86] tracking-[-0.075em] perspective-[700px]">
               <span className="block overflow-hidden">
                  {copy.news.title[0].split("").map((letter, index) => (
                     <span aria-hidden="true" key={`${letter}-${index}`} className="news-hero-char inline-block transition-colors">
                        {letter === " " ? "\u00a0" : letter}
                     </span>
                  ))}
               </span>

               <span className="news-hero-second-line relative block text-white/45">
                  {copy.news.title[1].split("").map((letter, index) => (
                     <span aria-hidden="true" key={`${letter}-${index}`} className="news-hero-light-char inline-block origin-center transition-colors">
                        {letter === " " ? "\u00a0" : letter}
                     </span>
                  ))}

                  <span className="news-hero-rule absolute -bottom-3 left-1/2 h-px w-28 -translate-x-1/2 overflow-hidden bg-white/20 sm:w-40">
                     <span className="news-hero-rule-pulse absolute inset-y-0 left-0 w-1/5 bg-dbh-blue" />
                  </span>
               </span>
            </h1>
         </div>

         <p className="news-hero-copy mx-auto mt-8 max-w-lg font-mono text-[10px] uppercase leading-[1.8] tracking-[0.13em] text-white/55">{copy.news.description}</p>
      </header>
   );
}
