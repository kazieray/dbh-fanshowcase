import Image from "next/image";
import type { RefObject } from "react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { gameplayCards, gameplayCardStyles } from "@/data/gameplay";

type GameplayFeaturesProps = {
   copy: {
      features: {
         title: string;
         dialogue: string;
         investigation: string;
         action: string;
         decisions: string;
         exploration: string;
      };
   };
   sectionRef: RefObject<HTMLElement | null>;
   titleRef: RefObject<HTMLHeadingElement | null>;
   setCardAnimationRef: (index: number) => (element: HTMLDivElement | null) => void;
};

export default function GameplayFeatures({ copy, sectionRef, titleRef, setCardAnimationRef }: GameplayFeaturesProps) {
   return (
      <section ref={sectionRef} className="relative h-svh w-full snap-start snap-always overflow-hidden bg-[#05080d] md:min-h-[600px]">
         <DraggableCardContainer className="relative mx-auto h-full w-full max-w-[1600px]">
            <div className="pointer-events-none absolute left-1/2 top-[49%] z-10 w-full max-w-[1000px] -translate-x-1/2 -translate-y-1/2 px-5 text-center">
               <h2 ref={titleRef} className="font-display text-[3.2rem] font-medium uppercase leading-[0.82] tracking-[-0.055em] text-[#c9dce5]/40 sm:text-[4.2rem] md:text-[5.4rem] lg:text-[6.5rem] xl:text-[7rem]">
                  {copy.features.title}
               </h2>
            </div>

            {gameplayCards.map((card, index) => {
               const label = copy.features[card.labelKey];

               return (
                  <div key={card.id} ref={setCardAnimationRef(index)} className="contents">
                     <DraggableCardBody className={`${gameplayCardStyles[card.id]} h-auto min-h-0 cursor-grab overflow-hidden rounded-[2px] bg-[#e7e8e5] p-[5px] pb-[8px] shadow-[0_18px_55px_rgba(0,0,0,0.48)] active:cursor-grabbing`}>
                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                           <Image src={card.image} alt={label} fill draggable={false} className="pointer-events-none select-none object-cover" sizes="(max-width: 640px) 240px, (max-width: 1024px) 350px, 350px" />
                        </div>

                        <p className="pointer-events-none pt-[6px] text-center font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-black/60 sm:text-[10px]">{label}</p>
                     </DraggableCardBody>
                  </div>
               );
            })}
         </DraggableCardContainer>
      </section>
   );
}
