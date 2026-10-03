"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { characters, type Character, type CharacterId } from "@/data/characters";
import { useLanguage } from "@/hooks/use-language";

gsap.registerPlugin(ScrollTrigger);

const characterOrder: CharacterId[] = ["kara", "connor", "markus"];

const featuredCharacters = characterOrder
   .map((id) => characters.find((character) => character.id === id))
   .filter((character): character is Character => character !== undefined);

export default function HomeCharacters() {
   const { copy } = useLanguage();
   const sectionRef = useRef<HTMLElement>(null);
   const [activeIndex, setActiveIndex] = useState(1);
   const activeCharacter = featuredCharacters[activeIndex];
   const activeCopy = copy.characters[activeCharacter.id];

   useLayoutEffect(() => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const context = gsap.context(() => {
         const entrance = gsap.timeline({
            scrollTrigger: {
               trigger: section,
               start: "top 78%",
               once: true,
            },
         });

         entrance
            .fromTo(".cast-heading", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out", immediateRender: false })
            .fromTo(".cast-description", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", immediateRender: false }, "-=0.4")
            .fromTo(".cast-grid", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", immediateRender: false }, "-=0.28")
            .fromTo(".cast-detail", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", immediateRender: false }, "-=0.32");
      }, section);

      return () => context.revert();
   }, []);

   return (
      <section ref={sectionRef} id="home-characters" aria-labelledby="home-characters-title" className="relative z-10 min-h-svh overflow-hidden bg-dbh-bg text-white">
         <div className="pointer-events-none absolute inset-0">
            <Image src="/images/home/bg-home.jpg" alt="" fill sizes="100vw" className="scale-110 object-cover object-center opacity-55 blur-[6px]" />
            <div className="absolute inset-0 bg-dbh-bg/65" />
         </div>
         <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-370 flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 md:px-8 lg:px-12">
            <header className="flex flex-col gap-3 border-t border-white/20 pt-4 sm:flex-row sm:items-end sm:justify-between">
               <div className="cast-heading">
                  <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/60 sm:text-[9px]">{copy.home.cast.kicker}</p>
               </div>
               <p className="cast-description max-w-sm text-pretty font-mono text-[10px] leading-[1.7] text-white/65 sm:text-right">{copy.home.cast.description}</p>
            </header>

            <div className="cast-grid mt-5 grid min-h-[38svh] grid-cols-3 items-end gap-2 sm:mt-8 sm:gap-4 lg:min-h-[50svh]">
               {featuredCharacters.map((character, index) => {
                  const isActive = index === activeIndex;

                  return (
                     <button
                        key={character.id}
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`${copy.home.cast.select} ${character.name}`}
                        onClick={() => setActiveIndex(index)}
                        className={`group relative flex min-w-0 flex-col justify-end border bg-dbh-surface text-left transition-[border-color,background-color,opacity,filter] duration-500 ${isActive ? "border-dbh-blue/65 opacity-100" : "border-white/15 opacity-75 hover:border-white/40 hover:opacity-100"}`}
                     >
                        <span className="relative block h-[36svh] min-h-60 max-h-130 w-full overflow-hidden bg-dbh-surface sm:h-[44svh] lg:h-[52svh]">
                           <Image
                              src={character.image}
                              alt={character.name}
                              fill
                              sizes="(max-width: 639px) 32vw, (max-width: 1023px) 30vw, 26vw"
                              className={`object-contain object-bottom transition-[filter,transform] duration-700 ${isActive ? "scale-105" : "scale-100 grayscale-[0.35] group-hover:grayscale-0"}`}
                           />
                           <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-dbh-bg/90 via-dbh-bg/15 to-transparent" />
                           <span className="absolute bottom-3 left-2 font-mono text-[7px] uppercase tracking-[0.12em] text-white/60 sm:bottom-4 sm:left-4 sm:text-[9px]">0{index + 1} / {character.model}</span>
                        </span>
                        <span className={`mt-2 block truncate border-t px-2 pt-2 font-display text-[clamp(0.85rem,3vw,1.8rem)] font-medium uppercase leading-none sm:mt-3 sm:px-4 sm:pt-3 ${isActive ? "border-dbh-blue/55 text-white" : "border-white/20 text-white/70"}`}>
                           {character.name}
                        </span>
                     </button>
                  );
               })}
            </div>

            <div aria-live="polite" className="cast-detail mt-5 grid gap-2 border-t border-white/20 pt-4 sm:mt-6 sm:grid-cols-[minmax(180px,0.7fr)_1.3fr] sm:items-start sm:gap-8 sm:pt-5">
               <div className="flex items-baseline gap-3 sm:block">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/50 sm:text-[9px]">{String(activeIndex + 1).padStart(2, "0")} / 03 · {activeCharacter.model}</p>
                  <h3 className="font-display text-2xl font-medium uppercase leading-none sm:mt-2 sm:text-4xl">{activeCharacter.name}</h3>
               </div>
               <p className="max-w-3xl text-pretty font-mono text-[10px] leading-[1.7] text-white/70 sm:text-[11px] sm:leading-[1.8]">{activeCopy.description}</p>
            </div>
         </div>
      </section>
   );
}