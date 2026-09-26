import Image from "next/image";
import { characters } from "@/data/characters";
import type { RefObject } from "react";

type CharacterBackgroundProps = {
   backgroundsRef: RefObject<HTMLDivElement | null>;
};

export default function CharacterBackground({ backgroundsRef }: CharacterBackgroundProps) {
   return (
      <>
         <div ref={backgroundsRef} className="absolute -inset-2 scale-[1.02] overflow-hidden bg-[#05080d] blur-[2px]">
            {characters.map((item, index) => (
               <div key={item.id} data-background-index={index} className={`absolute inset-0 ${index === 0 ? "opacity-100" : "opacity-0"}`}>
                  <Image src={item.background} alt="" fill priority sizes="100vw" className={`object-cover ${item.backgroundPosition}`} />
               </div>
            ))}
         </div>

         <div className="pointer-events-none absolute inset-0 bg-black/30" />
         <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#05080d]/50 via-transparent to-transparent" />
      </>
   );
}
