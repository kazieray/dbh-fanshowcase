import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import type { RefObject } from "react";
import { characters, type Character, type CharacterId } from "@/data/characters";
import { useLanguage } from "@/hooks/use-language";

type CharacterInfoProps = {
   character: Character;
   role: string;
   description: string;
   isTransitioning: boolean;
   nameRef: RefObject<HTMLHeadingElement | null>;
   metaRef: RefObject<HTMLDivElement | null>;
   descriptionRef: RefObject<HTMLParagraphElement | null>;
   selectCharacter: (characterId: CharacterId) => void;
   previousCharacter: () => void;
   nextCharacter: () => void;
};

export default function CharacterInfo({ character, role, description, isTransitioning, nameRef, metaRef, descriptionRef, selectCharacter, previousCharacter, nextCharacter }: CharacterInfoProps) {
   const { language } = useLanguage();

   return (
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

         <div role="group" aria-label={language === "en" ? "Select character" : "Pilih karakter"} className="mt-4 flex items-center justify-center gap-4 md:hidden">
            {characters.map((item) => {
               const isActive = item.id === character.id;

               return (
                  <button
                     key={item.id}
                     type="button"
                     onClick={() => selectCharacter(item.id)}
                     disabled={isTransitioning}
                     aria-pressed={isActive}
                     className={`border-b pb-1 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors disabled:pointer-events-none ${isActive ? "border-dbh-blue text-dbh-blue" : "border-transparent text-white/55 hover:text-white"}`}
                  >
                     {item.name}
                  </button>
               );
            })}
         </div>

         <p ref={descriptionRef} className="mt-4 max-w-145 text-[12px] font-light leading-[1.65] tracking-[0.005em] text-white/65 sm:max-w-150 sm:text-[13px] md:mt-5 md:max-w-160 md:text-[14px] md:leading-[1.75] md:text-white/60">
            {description}
         </p>
      </section>
   );
}
