"use client";

import { useLayoutEffect, useRef, type PointerEvent } from "react";
import Link from "next/link";
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
   const titleRef = useRef<HTMLButtonElement>(null);

   const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const horizontalOffset = (event.clientX - bounds.left) / bounds.width - 0.5;
      const verticalOffset = (event.clientY - bounds.top) / bounds.height - 0.5;
      const artwork = document.querySelector<HTMLImageElement>("#home-global-background img");
      if (!artwork) return;

      artwork.style.transform = `translate(${horizontalOffset * -16}px, ${verticalOffset * -12}px) scale(1.06)`;
   };

   const handleTitlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.currentTarget.querySelectorAll<HTMLElement>(".hero-title-char").forEach((character) => {
         const bounds = character.getBoundingClientRect();
         const distanceX = event.clientX - (bounds.left + bounds.width / 2);
         const distanceY = event.clientY - (bounds.top + bounds.height / 2);
         const influence = Math.max(0, 1 - Math.hypot(distanceX, distanceY) / 190);

         gsap.to(character, {
            x: -distanceX * 0.12 * influence,
            y: -distanceY * 0.16 * influence,
            rotation: distanceX * 0.1 * influence,
            duration: 0.24,
            ease: "power3.out",
            overwrite: "auto",
         });
      });
   };

   const resetTitleMotion = () => {
      if (!titleRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(titleRef.current.querySelectorAll<HTMLElement>(".hero-title-char"), {
         x: 0,
         y: 0,
         rotation: 0,
         duration: 0.7,
         stagger: 0.012,
         ease: "elastic.out(1, 0.55)",
         overwrite: "auto",
      });
   };

   const animateTitleClick = () => {
      if (!titleRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const characters = titleRef.current.querySelectorAll<HTMLElement>(".hero-title-char");
      gsap.timeline({ defaults: { overwrite: "auto" } })
         .to(characters, {
            x: () => gsap.utils.random(-4, 4),
            y: () => gsap.utils.random(-2, 2),
            rotation: () => gsap.utils.random(-2.5, 2.5),
            duration: 0.14,
            stagger: { each: 0.012, from: "center" },
            ease: "power2.out",
         })
         .to(characters, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.55,
            stagger: { each: 0.012, from: "center" },
            ease: "elastic.out(1, 0.55)",
         }, "+=0.04");
   };

   const resetPointerPosition = (event: PointerEvent<HTMLElement>) => {
      const artwork = document.querySelector<HTMLImageElement>("#home-global-background img");
      if (artwork) artwork.style.transform = "translate(0px, 0px) scale(1.06)";
   };

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const ctx = gsap.context(() => {
         if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

         gsap.set(".hero-title", {
            yPercent: 110,
            opacity: 0,
            filter: "blur(24px)",
            scale: 0.98,
         });
         gsap.set(".hero-description, .hero-action", { y: 16, autoAlpha: 0 });

      }, rootRef);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!active || !rootRef.current) return;

      const ctx = gsap.context(() => {
         if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(".hero-title", { yPercent: 0, opacity: 1, filter: "blur(0px)", scale: 1 });
            gsap.set(".hero-description, .hero-action", { y: 0, autoAlpha: 1 });
            return;
         }

         const entranceTimeline = gsap.timeline({
            delay: 0.25,
            defaults: {
               overwrite: "auto",
            },
         });

         entranceTimeline.to(
            ".hero-title",
            {
               yPercent: 0,
               opacity: 1,
               filter: "blur(0px)",
               scale: 1,
               duration: 2.2,
               ease: "power3.out",
            },
            0,
         ).fromTo(
            ".hero-description",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.3, ease: "power3.out" },
            0.7,
         ).fromTo(
            ".hero-action",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, stagger: 0.14, ease: "power3.out" },
            1.25,
         );
      }, rootRef);

      return () => ctx.revert();
   }, [active]);

   useLayoutEffect(() => {
      if (!active || !rootRef.current) return;

      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
         mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
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
               );
         });

         mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
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
               );
         });
      }, rootRef);

      return () => {
         mm.revert();
         ctx.revert();
      };
   }, [active]);

   return (
      <section ref={rootRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointerPosition} className="relative isolate h-[82svh] overflow-hidden bg-transparent md:min-h-140">
         <Particles active={active} />

         {/* CONTENT */}
         <div className="hero-content relative z-10 flex h-full flex-col justify-center px-4 py-20 md:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-7xl text-center">
               <div className="overflow-hidden pb-[0.1em]">
                  <div className="inline-block max-w-full">
                     <h1 className="hero-title perspective-[700px] font-display text-[clamp(2.15rem,8.2vw,7rem)] font-medium uppercase leading-[0.86] tracking-[-0.055em] text-white md:leading-[0.82]">
                        <button ref={titleRef} type="button" aria-label={`${copy.home.hero.title} ${copy.home.hero.subtitle}`} onPointerMove={handleTitlePointerMove} onPointerLeave={resetTitleMotion} onClick={animateTitleClick} className="inline-block cursor-pointer bg-transparent p-0 text-inherit">
                           <span className="block">{copy.home.hero.title.split("").map((letter, index) => <span aria-hidden="true" key={`title-${index}`} className="hero-title-char inline-block origin-center">{letter}</span>)}</span>
                           <span className="block">{copy.home.hero.subtitle.split("").map((letter, index) => <span aria-hidden="true" key={`subtitle-${index}`} className="hero-title-char inline-block origin-center">{letter === " " ? "\u00a0" : letter}</span>)}</span>
                        </button>
                     </h1>
                  </div>
               </div>

               <div className="mt-5 flex flex-col items-center gap-5 md:mt-7">
                  <p className="hero-description mx-auto max-w-[42ch] text-pretty font-mono text-[10px] uppercase leading-[1.8] tracking-widest text-white/80 sm:text-[11px]">
                     {copy.home.hero.description}
                  </p>
               </div>

               <div className="mt-8 flex flex-wrap justify-center gap-2">
                  <Link href="#flowchart-section" className="hero-action nav-glass-control inline-flex min-h-11 min-w-52 items-center justify-center rounded-full px-6 font-mono text-[9px] tracking-[0.04em]">
                     {copy.home.flowchart.statistics}
                  </Link>
                  <Link href="#chapter-section" className="hero-action nav-glass-control inline-flex min-h-11 min-w-52 items-center justify-center rounded-full px-6 font-mono text-[9px] tracking-[0.04em]">
                     {copy.home.flowchart.chapters}
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
}
