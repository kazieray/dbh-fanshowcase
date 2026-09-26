"use client";

import { createRef, useMemo, useRef } from "react";
import Navbar from "@/components/navigation/navbar";
import { en } from "@/data/translations/en";
import { type CharacterId } from "@/data/characters";
import { useCharacterIdle, useCharacterNavigation } from "@/hooks/use-character";
import CharacterBackground from "./_components/character-background";
import CharacterStage from "./_components/character-stage";
import CharacterInfo from "./_components/character-info";

export default function CharactersPage() {
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

   useCharacterIdle(stageRefs, activeIndex, isTransitioning);

   const copy = en.characters[character.id];

   return (
      <main className="relative h-svh overflow-hidden bg-[#05080d] text-white">
         <CharacterBackground backgroundsRef={backgroundsRef} />

         <Navbar active={true} />

         <CharacterStage character={character} activeIndex={activeIndex} isTransitioning={isTransitioning} mobileCharacterRef={mobileCharacterRef} desktopCharacterRefs={desktopCharacterRefs} selectCharacter={selectCharacter} />

         <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[58svh] bg-linear-to-t from-[#05080d] from-12% via-[#05080d]/92 via-42% to-transparent sm:h-[56svh] md:h-[54svh] lg:h-[50svh]" />

         <CharacterInfo
            character={character}
            role={copy.role}
            description={copy.description}
            isTransitioning={isTransitioning}
            nameRef={nameRef}
            metaRef={metaRef}
            descriptionRef={descriptionRef}
            previousCharacter={previousCharacter}
            nextCharacter={nextCharacter}
         />
      </main>
   );
}
