import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import type { RefObject } from "react";

import type { Character } from "@/data/characters";

type CharacterInfoProps = {
   character: Character;
   role: string;
   description: string;
   isTransitioning: boolean;
   nameRef: RefObject<HTMLHeadingElement | null>;
   metaRef: RefObject<HTMLDivElement | null>;
   descriptionRef: RefObject<HTMLParagraphElement | null>;
   previousCharacter: () => void;
   nextCharacter: () => void;
};

export default function CharacterInfo({ character, role, description, isTransitioning, nameRef, metaRef, descriptionRef, previousCharacter, nextCharacter }: CharacterInfoProps) {
   return (
      <>
         {/* Mobile + Tablet */}
         <section className="absolute inset-x-0 bottom-8 z-30 mx-auto flex w-[calc(100%-32px)] max-w-[520px] flex-col items-center text-center sm:bottom-9 sm:w-[calc(100%-48px)] md:hidden">
            <div className="flex w-full items-center justify-center">
               <button type="button" onClick={previousCharacter} disabled={isTransitioning} aria-label="Previous character" className="group mr-3 flex h-10 w-10 shrink-0 items-center justify-center disabled:pointer-events-none sm:mr-8">
                  <span className="text-white/30 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-dbh-blue">
                     <CircleChevronLeft className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                  </span>
               </button>

               <h1 ref={nameRef} className="min-w-0 font-display text-[clamp(3rem,15vw,4rem)] font-medium uppercase leading-[0.76] tracking-[-0.07em] text-white sm:text-[clamp(4rem,10vw,5.5rem)]">
                  {character.name}
               </h1>

               <button type="button" onClick={nextCharacter} disabled={isTransitioning} aria-label="Next character" className="group ml-3 flex h-10 w-10 shrink-0 items-center justify-center disabled:pointer-events-none sm:ml-8">
                  <span className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-dbh-blue">
                     <CircleChevronRight className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                  </span>
               </button>
            </div>

            <div ref={metaRef} className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[8px] font-medium uppercase tracking-[0.22em] sm:text-[9px] sm:tracking-[0.25em]">
               <span className="text-dbh-blue">{character.model}</span>
               <span className="text-white/25">/</span>
               <span className="text-white/65">{role}</span>
            </div>

            <div className="mt-4 max-w-[330px] sm:mt-5 sm:max-w-[440px]">
               <p ref={descriptionRef} className="text-[10px] font-light leading-[1.7] tracking-[0.015em] text-white/60 sm:text-[11px] sm:leading-[1.75]">
                  {description}
               </p>
            </div>
         </section>

         {/* Laptop + Desktop */}
         <section className="absolute inset-x-0 bottom-10 z-30 mx-auto hidden w-[calc(100%-40px)] max-w-200 flex-col items-center text-center md:flex">
            <div className="flex w-full items-center justify-center">
               <h1 ref={nameRef} className="min-w-0 font-display text-[clamp(4rem,7vw,7.5rem)] font-medium uppercase leading-[0.76] tracking-[-0.07em] text-white">
                  {character.name}
               </h1>
            </div>

            <div ref={metaRef} className="mt-5 flex flex-wrap items-center justify-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.28em]">
               <span className="text-dbh-blue">{character.model}</span>
               <span className="text-white/25">/</span>
               <span className="text-white/65">{role}</span>
            </div>
         </section>

         {/* Laptop + Desktop description */}
         <aside className="pointer-events-none absolute right-6 top-1/2 z-30 hidden w-[220px] -translate-y-1/2 md:block lg:right-8 lg:w-[240px] xl:right-12 xl:w-[280px]">
            <div className="relative">
               <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-white/38 lg:text-[9px]">{character.model}</span>

                  <span className="h-[3px] w-[3px] rounded-full bg-dbh-blue/70" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/25 lg:text-[8px]">{character.name}</span>
               </div>

               <p ref={descriptionRef} className="text-left text-[12px] font-light leading-[1.85] tracking-[0.005em] text-white/68 lg:text-[13px] lg:leading-[1.9] xl:text-[14px] xl:leading-[1.85]">
                  {description}
               </p>

               <div className="mt-5 flex items-center gap-3">
                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/25 lg:text-[8px]">{role}</span>

                  <span className="h-px flex-1 bg-white/10" />
               </div>
            </div>
         </aside>
      </>
   );
}
