"use client";

import { createRef, useMemo, useRef } from "react";
import Navbar from "@/components/navigation/navbar";
import { type CharacterId } from "@/data/characters";
import { useCharacterEntrance, useCharacterIdle, useCharacterNavigation } from "@/hooks/use-character";
import { useLanguage } from "@/hooks/use-language";
import CharacterBackground from "./character-background";
import CharacterStage from "./character-stage";
import CharacterInfo from "./character-info";
import CharacterGallery from "./character-gallery";
import DeviantTest from "@/app/characters/_components/deviant-test";

export default function Characters() {
   const mobileCharacterRef = useRef<HTMLDivElement>(null);
   const backgroundsRef = useRef<HTMLDivElement>(null);
   const nameRef = useRef<HTMLHeadingElement>(null);
   const metaRef = useRef<HTMLDivElement>(null);
   const descriptionRef = useRef<HTMLParagraphElement>(null);

   const desktopCharacterRefs = useMemo(
      () =>
         ({
            connor: createRef<HTMLDivElement>(),
            markus: createRef<HTMLDivElement>(),
            kara: createRef<HTMLDivElement>(),
         }) satisfies Record<CharacterId, ReturnType<typeof createRef<HTMLDivElement>>>,
      [],
   );

   const stageRefs = useMemo(
      () => ({
         mobileCharacterRef,
         desktopCharacterRefs,
      }),
      [desktopCharacterRefs],
   );

   const infoRefs = useMemo(
      () => ({
         nameRef,
         metaRef,
         descriptionRef,
      }),
      [],
   );

   const { activeIndex, character, isTransitioning, previousCharacter, nextCharacter, selectCharacter } = useCharacterNavigation(stageRefs, backgroundsRef, infoRefs);

   useCharacterEntrance(stageRefs, infoRefs);
   useCharacterIdle(stageRefs, activeIndex, isTransitioning);


   const { copy } = useLanguage();
   const characterCopy = copy.characters[character.id];

   return (
      <main className="relative bg-[#05080d] text-white">
         {/* CHARACTER VIEWER — full viewport height */}
         <div className="relative h-svh overflow-hidden">
            <CharacterBackground backgroundsRef={backgroundsRef} />

            <Navbar active={true} />

            <CharacterGallery
               gallery={character.gallery}
               characterName={character.name}
               isTransitioning={isTransitioning}
            />

            <CharacterStage character={character} activeIndex={activeIndex} isTransitioning={isTransitioning} mobileCharacterRef={mobileCharacterRef} desktopCharacterRefs={desktopCharacterRefs} selectCharacter={selectCharacter} />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[58svh] bg-linear-to-t from-[#05080d] from-12% via-[#05080d]/92 via-42% to-transparent sm:h-[56svh] md:h-[54svh] lg:h-[50svh]" />

            <CharacterInfo
               character={character}
               role={characterCopy.role}
               description={characterCopy.description}
               isTransitioning={isTransitioning}
               nameRef={nameRef}
               metaRef={metaRef}
               descriptionRef={descriptionRef}
               previousCharacter={previousCharacter}
               nextCharacter={nextCharacter}
            />
         </div>

         {/* SOFTWARE ANALYSIS — below character viewer */}
         <DeviantTest />
      </main>
   );
}
