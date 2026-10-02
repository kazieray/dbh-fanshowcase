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
         {/* ─── BOTTOM CENTER: Name + Role + Mobile Nav ─── */}
         <section className="absolute inset-x-0 bottom-10 z-30 mx-auto flex w-[calc(100%-32px)] max-w-200 flex-col items-center text-center sm:bottom-9 sm:w-[calc(100%-48px)] md:bottom-10 md:w-[calc(100%-40px)]">
            <div className="flex w-full items-center justify-center">
               <button
                  type="button"
                  onClick={previousCharacter}
                  disabled={isTransitioning}
                  aria-label="Previous character"
                  className="group mr-3 flex h-10 w-10 shrink-0 items-center justify-center disabled:pointer-events-none sm:mr-8 md:hidden"
               >
                  <span className="text-white/30 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-dbh-blue">
                     <CircleChevronLeft className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                  </span>
               </button>

               <h1 ref={nameRef} className="min-w-0 font-display text-[clamp(3rem,15vw,4rem)] font-medium uppercase leading-[0.76] tracking-[-0.07em] text-white sm:text-[clamp(4rem,10vw,5.5rem)] md:text-[clamp(4rem,7vw,7.5rem)]">
                  {character.name}
               </h1>

               <button type="button" onClick={nextCharacter} disabled={isTransitioning} aria-label="Next character" className="group ml-3 flex h-10 w-10 shrink-0 items-center justify-center disabled:pointer-events-none sm:ml-8 md:hidden">
                  <span className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-dbh-blue">
                     <CircleChevronRight className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                  </span>
               </button>
            </div>

            <div
               ref={metaRef}
               className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[8px] font-medium uppercase tracking-[0.22em] sm:text-[9px] sm:tracking-[0.25em] md:mt-5 md:gap-2.5 md:text-[10px] md:tracking-[0.28em]"
            >
               <span className="text-dbh-blue">{character.model}</span>
               <span className="text-white/25">/</span>
               <span className="text-white/65">{role}</span>
            </div>
         </section>

         {/* ─── RIGHT SIDE: Description (desktop only, middle right) ─── */}
         <aside className="pointer-events-none absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 max-w-[240px] flex-col items-start gap-3 md:right-6 md:flex lg:right-8 xl:right-12 xl:max-w-[270px]">
            {/* HEADER LINE */}
            <div className="flex items-center gap-2">
               <span className="font-mono text-[7px] uppercase tracking-[0.28em] text-dbh-blue/70">
                  Profile
               </span>
               <div className="h-px w-5 bg-dbh-blue/60" />
            </div>

            {/* DESCRIPTION */}
            <div
               ref={descriptionRef}
               className="flex flex-col gap-3 text-left"
            >
               <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-dbh-blue/90">
                  Data Log
               </h3>
               <div className="flex flex-col gap-3">
                  {description.split("\n\n").map((paragraph, idx) => (
                     <p key={idx} className="text-[11px] font-light leading-[1.8] tracking-[0.015em] text-white/75 xl:text-[12px]">
                        {paragraph}
                     </p>
                  ))}
               </div>
            </div>

            {/* FOOTER LINE */}
            <div className="flex items-center gap-2 justify-start">
               <div className="h-px w-5 bg-dbh-blue/40" />
               <div className="h-1 w-1 bg-dbh-blue/50" />
               <div className="h-px w-3 bg-white/10" />
            </div>
         </aside>
      </>
   );
}
