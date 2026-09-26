import Image from "next/image";
import type { RefObject } from "react";
import { characters, type Character, type CharacterId } from "@/data/characters";

type DesktopCharacterRefs = Record<CharacterId, RefObject<HTMLDivElement | null>>;

type CharacterStageProps = {
   character: Character;
   activeIndex: number;
   isTransitioning: boolean;
   mobileCharacterRef: RefObject<HTMLDivElement | null>;
   desktopCharacterRefs: DesktopCharacterRefs;
   selectCharacter: (index: number) => void;
};

export default function CharacterStage({ character, activeIndex, isTransitioning, mobileCharacterRef, desktopCharacterRefs, selectCharacter }: CharacterStageProps) {
   return (
      <section className="pointer-events-none absolute inset-x-0 bottom-0 top-16 z-10 flex items-end justify-center sm:top-18 lg:bottom-[1svh] lg:top-20">
         <div className="relative h-full w-full">
            {/* Mobile + Tablet */}
            <div className="absolute bottom-0 left-1/2 h-[82svh] w-[125vw] -translate-x-1/2 sm:h-[84svh] sm:w-[92vw] md:w-[82vw] lg:hidden">
               <div className={`relative h-full w-full ${character.imagePosition}`}>
                  <div ref={mobileCharacterRef} className="relative h-full w-full">
                     <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        priority
                        sizes="(max-width: 639px) 125vw, (max-width: 767px) 92vw, (max-width: 1023px) 82vw"
                        className="scale-[1.12] object-contain object-bottom sm:scale-110 md:scale-105"
                     />
                  </div>
               </div>
            </div>

            {/* Desktop */}
            <div className="pointer-events-auto absolute inset-0 hidden lg:block">
               {characters.map((item, index) => {
                  const isInitialActive = index === 0;

                  return (
                     <div key={item.id} ref={desktopCharacterRefs[item.id]} data-desktop-character={item.id} className="pointer-events-none absolute inset-0" style={{ zIndex: isInitialActive ? 10 : 1 }}>
                        {/* Side asset */}
                        <button
                           type="button"
                           data-side-layer
                           onClick={() => selectCharacter(index)}
                           disabled={isTransitioning || activeIndex === index}
                           aria-label={`View ${item.name}`}
                           className="group pointer-events-auto absolute bottom-0 left-1/2 h-[82svh] w-[min(46vw,680px)] -translate-x-1/2 cursor-pointer disabled:pointer-events-none"
                           style={{ opacity: isInitialActive ? 0 : 1 }}
                        >
                           <div data-side-visual className="relative h-full w-full opacity-65 brightness-75 transition-[filter,opacity] duration-500 group-hover:opacity-90 group-hover:brightness-95">
                              <Image src={item.sideImage} alt={item.name} fill priority sizes="46vw" className={`${item.sideImagePosition} object-contain object-bottom`} />
                           </div>
                        </button>

                        {/* Active asset */}
                        <div data-active-layer className="pointer-events-none absolute bottom-0 left-1/2 h-[84svh] w-[min(56vw,800px)] -translate-x-1/2" style={{ opacity: isInitialActive ? 1 : 0 }}>
                           <div className={`relative h-full w-full ${item.imagePosition}`}>
                              <Image src={item.image} alt={item.name} fill priority sizes="56vw" className="object-contain object-bottom" />
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
}
