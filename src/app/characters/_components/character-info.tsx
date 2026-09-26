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
      <section className="absolute inset-x-0 bottom-10 z-30 mx-auto flex w-[calc(100%-32px)] max-w-200 flex-col items-center text-center sm:bottom-9 sm:w-[calc(100%-48px)] md:bottom-10 lg:bottom-10 lg:w-[calc(100%-40px)]">
         <div className="flex w-full items-center justify-center">
            <button
               type="button"
               onClick={previousCharacter}
               disabled={isTransitioning}
               aria-label="Previous character"
               className="group mr-3 flex h-10 w-10 shrink-0 items-center justify-center disabled:pointer-events-none sm:mr-8 md:mr-12 lg:hidden"
            >
               <span className="text-white/30 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-dbh-blue">
                  <CircleChevronLeft className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
               </span>
            </button>

            <h1
               ref={nameRef}
               className="min-w-0 font-display text-[clamp(3rem,15vw,4rem)] font-medium uppercase leading-[0.76] tracking-[-0.07em] text-white sm:text-[clamp(4rem,10vw,5.5rem)] md:text-[clamp(4.5rem,9vw,6rem)] lg:text-[clamp(4rem,7vw,7.5rem)]"
            >
               {character.name}
            </h1>

            <button
               type="button"
               onClick={nextCharacter}
               disabled={isTransitioning}
               aria-label="Next character"
               className="group ml-3 flex h-10 w-10 shrink-0 items-center justify-center disabled:pointer-events-none sm:ml-8 md:ml-12 lg:hidden"
            >
               <span className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-dbh-blue">
                  <CircleChevronRight className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
               </span>
            </button>
         </div>

         <div
            ref={metaRef}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[8px] font-medium uppercase tracking-[0.22em] sm:text-[9px] sm:tracking-[0.25em] md:text-[9px] lg:mt-5 lg:gap-2.5 lg:text-[10px] lg:tracking-[0.28em]"
         >
            <span className="text-dbh-blue">{character.model}</span>
            <span className="text-white/25">/</span>
            <span className="text-white/65">{role}</span>
         </div>

         <p
            ref={descriptionRef}
            className="mt-4 max-w-145 text-[12px] font-light leading-[1.65] tracking-[0.005em] text-white/65 sm:max-w-150 sm:text-[13px] md:max-w-155 md:text-[13px] lg:mt-5 lg:max-w-160 lg:text-[14px] lg:leading-[1.75] lg:text-white/60"
         >
            {description}
         </p>
      </section>
   );
}
