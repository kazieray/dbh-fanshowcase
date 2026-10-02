import CornerButton from "@/components/ui/corner-button";
import type { RefObject } from "react";

type GameplayExperienceProps = {
   copy: {
      experience: {
         title: string;
      };
      cta: {
         title: string;
         button: string;
      };
   };
   sectionRef: RefObject<HTMLElement | null>;
   titleRef: RefObject<HTMLHeadingElement | null>;
   videoOneRef: RefObject<HTMLDivElement | null>;
   videoTwoRef: RefObject<HTMLDivElement | null>;
   ctaRef: RefObject<HTMLDivElement | null>;
};

export default function GameplayExperience({ copy, sectionRef, titleRef, videoOneRef, videoTwoRef, ctaRef }: GameplayExperienceProps) {
   return (
      <section ref={sectionRef} className="relative h-svh w-full snap-start snap-always overflow-hidden bg-[#05080d] md:min-h-[600px]">
         {/* DOT BACKGROUND */}
         <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.11)_1px,transparent_1px)] bg-[size:22px_22px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,8,13,0.3)_65%,rgba(5,8,13,0.9)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05080d]/30 via-transparent to-[#05080d]/80" />
         </div>

         <div className="relative z-10 mx-auto h-full w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20">
            <h2
               ref={titleRef}
               className="absolute left-5 top-[15%] z-30 max-w-[12ch] font-display text-[clamp(2.15rem,10vw,2.7rem)] font-medium uppercase leading-[0.86] tracking-[-0.05em] text-[#f3f6f8] sm:left-8 sm:top-[14%] sm:max-w-[13ch] sm:text-[clamp(2.7rem,6.5vw,3.4rem)] md:left-10 md:top-[13%] md:max-w-[13ch] md:text-[4.8rem] md:leading-[0.84] lg:left-16 lg:top-[15%] lg:max-w-[15ch] lg:text-[4.15rem] lg:leading-[0.86] xl:left-20 xl:text-[4.5rem]"
            >
               {copy.experience.title}
            </h2>

            <div
               ref={videoOneRef}
               className="absolute left-5 top-[31%] z-10 w-[78%] overflow-hidden border border-white/10 bg-black sm:left-8 sm:top-[32%] sm:w-[66%] md:left-[4%] md:top-[31%] md:w-[65%] lg:left-[10%] lg:top-[30%] lg:w-[46%] xl:left-[11%] xl:w-[44%]"
            >
               <div className="relative aspect-video w-full overflow-hidden">
                  <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata">
                     <source src="/videos/gameplay-1.mp4" type="video/mp4" />
                  </video>

                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
               </div>
            </div>

            <div
               ref={videoTwoRef}
               className="absolute right-5 top-[45%] z-20 w-[73%] overflow-hidden border border-white/10 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:right-8 sm:top-[45%] sm:w-[62%] md:right-[4%] md:top-[47%] md:w-[61%] lg:right-[10%] lg:top-[39%] lg:w-[41%] xl:right-[11%] xl:w-[39%]"
            >
               <div className="relative aspect-video w-full overflow-hidden">
                  <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata">
                     <source src="/videos/gameplay-2.mp4" type="video/mp4" />
                  </video>

                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
               </div>
            </div>

            <div
               ref={ctaRef}
               className="absolute left-5 top-[69%] z-30 flex max-w-[285px] flex-col items-start sm:left-auto sm:right-8 sm:top-[70%] sm:max-w-[310px] sm:items-end sm:text-right md:right-[7%] md:top-[73%] md:max-w-[330px] lg:bottom-[6%] lg:right-[10%] lg:top-auto xl:right-[11%]"
            >
               <p className="max-w-[12ch] font-display text-[clamp(1.45rem,6.2vw,1.7rem)] font-medium uppercase leading-[0.9] tracking-[-0.04em] text-[#f3f6f8] sm:max-w-[13ch] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.1rem]">
                  {copy.cta.title}
               </p>

               <CornerButton href="/download" className="mt-5">
                  {copy.cta.button}
               </CornerButton>
            </div>
         </div>
      </section>
   );
}
