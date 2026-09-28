"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./particles";
import { useLanguage } from "@/hooks/use-language";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
   active: boolean;
};

export default function HomeHero({ active }: HeroProps) {
   const { copy } = useLanguage();

   const rootRef = useRef<HTMLElement>(null);
   const darknessRef = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const ctx = gsap.context(() => {
         gsap.set(".hero-title", {
            yPercent: 110,
         });

         gsap.set(".hero-subtitle", {
            yPercent: 110,
            opacity: 0,
         });

         gsap.set(".hero-description", {
            y: 14,
            opacity: 0,
         });

         gsap.set(darknessRef.current, {
            opacity: 1,
         });
      }, rootRef);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!active || !rootRef.current) return;

      const ctx = gsap.context(() => {
         const entranceTimeline = gsap.timeline({
            delay: 0.25,
            defaults: {
               overwrite: "auto",
            },
         });

         entranceTimeline
            .to(darknessRef.current, {
               opacity: 0,
               duration: 1.6,
               ease: "power2.out",
            })
            .to(
               ".hero-title",
               {
                  yPercent: 0,
                  duration: 1.15,
                  ease: "power4.out",
               },
               "-=1.05",
            )
            .to(
               ".hero-subtitle",
               {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power4.out",
               },
               "-=0.62",
            )
            .to(
               ".hero-description",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  ease: "power3.out",
               },
               "-=0.42",
            );
      }, rootRef);

      return () => ctx.revert();
   }, [active]);

   useLayoutEffect(() => {
      if (!active || !rootRef.current) return;

      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
         mm.add("(max-width: 767px)", () => {
            const exitTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top top",
                  end: "bottom 50%",
                  scrub: 0.7,
               },
            });

            exitTimeline
               .to(
                  ".hero-content",
                  {
                     y: -30,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".hero-title",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".hero-subtitle",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0.08,
               )
               .to(
                  ".hero-description",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0.14,
               );
         });

         mm.add("(min-width: 768px)", () => {
            const exitTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top top",
                  end: "bottom 45%",
                  scrub: 0.8,
               },
            });

            exitTimeline
               .to(
                  ".hero-content",
                  {
                     y: -50,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".hero-title",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".hero-subtitle",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0.08,
               )
               .to(
                  ".hero-description",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0.14,
               );
         });
      }, rootRef);

      return () => {
         mm.revert();
         ctx.revert();
      };
   }, [active]);

   return (
      <section ref={rootRef} className="relative isolate h-svh overflow-hidden bg-transparent md:min-h-[560px]">
         <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/65" />

         <Particles active={active} />

         <div ref={darknessRef} className="pointer-events-none absolute inset-0 z-[5] bg-black" />

         {/* CONTENT */}
         <div className="hero-content relative z-10 flex h-full flex-col justify-end px-4 pb-6 md:px-8 md:pb-10 lg:px-12 lg:pb-12">
            <div className="w-full">
               <div className="overflow-hidden pb-[0.1em]">
                  <div className="inline-block max-w-full">
                     <h1 className="hero-title font-display text-[clamp(4.5rem,22vw,7rem)] font-medium uppercase leading-[0.74] tracking-[-0.075em] text-white transition-[letter-spacing,text-shadow] duration-700 ease-out [@media(hover:hover)]:hover:tracking-[-0.065em] [@media(hover:hover)]:hover:[text-shadow:0_0_28px_rgba(82,199,255,0.16)] md:text-[clamp(5.5rem,14vw,10rem)] md:leading-[0.74] lg:text-[clamp(7rem,13vw,12rem)] lg:leading-[0.72]">
                        {copy.home.hero.title}
                     </h1>
                  </div>
               </div>

               <div className="mt-4 flex flex-col gap-6 md:mt-[clamp(0.7rem,2vw,1.5rem)] md:flex-row md:items-end md:justify-between md:gap-6">
                  <div className="overflow-hidden pb-[0.1em]">
                     <div className="inline-block max-w-full">
                        <p className="hero-subtitle font-display text-[clamp(1.3rem,7vw,1.85rem)] font-light uppercase leading-none tracking-[0.04em] text-white/80 transition-[color,letter-spacing,text-shadow] duration-700 ease-out [@media(hover:hover)]:hover:tracking-[0.055em] [@media(hover:hover)]:hover:text-white/95 [@media(hover:hover)]:hover:[text-shadow:0_0_20px_rgba(82,199,255,0.12)] md:text-[clamp(1.4rem,3vw,2.5rem)] lg:text-[clamp(1.15rem,3vw,3rem)]">
                           {copy.home.hero.subtitle}
                        </p>
                     </div>
                  </div>

                  <p className="hero-description max-w-[330px] font-mono text-[10px] uppercase leading-[1.7] tracking-[0.11em] text-white/50 md:max-w-[310px] md:text-[9px] md:leading-[1.7] md:tracking-[0.15em] md:text-white/45">
                     {copy.home.hero.description}
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}
