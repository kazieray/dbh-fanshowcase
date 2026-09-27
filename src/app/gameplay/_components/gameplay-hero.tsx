import type { RefObject } from "react";
import Navbar from "@/components/navigation/navbar";

type GameplayHeroProps = {
   copy: {
      hero: {
         title: string;
         description: string;
      };
   };
   videoRef: RefObject<HTMLVideoElement | null>;
   titleRef: RefObject<HTMLHeadingElement | null>;
   descriptionRef: RefObject<HTMLParagraphElement | null>;
};

export default function GameplayHero({ copy, videoRef, titleRef, descriptionRef }: GameplayHeroProps) {
   return (
      <section className="relative h-svh w-full snap-start snap-always overflow-hidden md:min-h-[600px]">
         <div className="absolute inset-0 h-full w-full overflow-hidden">
            <video ref={videoRef} className="h-full w-full scale-120 object-cover object-center blur-[1px] md:blur-[1.5px]" autoPlay muted loop playsInline preload="metadata">
               <source src="/videos/gameplay-hero.mp4" type="video/mp4" />
            </video>
         </div>

         <div className="pointer-events-none absolute inset-0 bg-black/80" />
         <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[18%] bg-gradient-to-b from-transparent to-[#05080d]" />

         <Navbar active={true} />

         <div className="relative z-10 flex h-full w-full items-center justify-center px-5 pt-16 sm:px-8 md:px-12 md:pt-20 lg:px-16 xl:px-20">
            <div className="flex w-full max-w-[1000px] flex-col items-center text-center">
               <h1
                  ref={titleRef}
                  className="max-w-[11ch] font-display text-[2.6rem] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#f3f6f8] sm:text-[3.4rem] md:max-w-[900px] md:text-[4.5rem] md:leading-[0.88] md:tracking-[-0.05em] lg:text-[5.5rem] xl:text-[6.25rem]"
               >
                  {copy.hero.title}
               </h1>

               <p ref={descriptionRef} className="mt-6 max-w-[480px] text-[13px] leading-6 text-white/50 sm:text-sm md:mt-7 md:max-w-[540px] md:leading-7">
                  {copy.hero.description}
               </p>
            </div>
         </div>
      </section>
   );
}
