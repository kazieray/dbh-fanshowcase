"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Particles from "./particles";

type HeroProps = {
   active: boolean;
};

export default function Hero({ active }: HeroProps) {
   const rootRef = useRef<HTMLElement>(null);
   const imageRef = useRef<HTMLDivElement>(null);
   const darknessRef = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const ctx = gsap.context(() => {
         gsap.set(imageRef.current, {
            scale: 1.08,
            opacity: 0,
         });

         gsap.set(darknessRef.current, {
            opacity: 1,
         });

         gsap.set(".hero-reveal", {
            yPercent: 115,
         });

         gsap.set(".hero-fade", {
            y: 12,
            opacity: 0,
         });
      }, rootRef);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!active || !rootRef.current) return;

      const ctx = gsap.context(() => {
         const timeline = gsap.timeline({
            delay: 0.35,
         });

         timeline
            .to(imageRef.current, {
               opacity: 1,
               scale: 1.03,
               duration: 1.8,
               ease: "power3.out",
            })
            .to(
               darknessRef.current,
               {
                  opacity: 0,
                  duration: 1.5,
                  ease: "power2.out",
               },
               "-=1.4",
            )
            .to(
               ".hero-reveal",
               {
                  yPercent: 0,
                  duration: 1.1,
                  stagger: 0.12,
                  ease: "power4.out",
               },
               "-=0.85",
            )
            .to(
               ".hero-fade",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.08,
                  ease: "power3.out",
               },
               "-=0.5",
            );
      }, rootRef);

      return () => ctx.revert();
   }, [active]);

   useLayoutEffect(() => {
      if (!active || !imageRef.current) return;

      const image = imageRef.current;

      const moveX = gsap.quickTo(image, "xPercent", {
         duration: 1.4,
         ease: "power3.out",
      });

      const moveY = gsap.quickTo(image, "yPercent", {
         duration: 1.4,
         ease: "power3.out",
      });

      function handlePointerMove(event: PointerEvent) {
         if (window.matchMedia("(pointer: coarse)").matches) return;

         const x = event.clientX / window.innerWidth - 0.5;
         const y = event.clientY / window.innerHeight - 0.5;

         moveX(x * -1.5);
         moveY(y * -1.5);
      }

      window.addEventListener("pointermove", handlePointerMove);

      return () => {
         window.removeEventListener("pointermove", handlePointerMove);
      };
   }, [active]);

   return (
      <section ref={rootRef} className="relative isolate h-svh min-h-[560px] overflow-hidden bg-black">
         <div ref={imageRef} className="absolute -inset-[3%] opacity-0 will-change-transform">
            <div className="absolute inset-0 bg-[url('/images/bg-dbh.jpg')] bg-cover bg-center bg-no-repeat" />
         </div>

         <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/65" />
         <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/15" />

         <Particles active={active} />

         <div ref={darknessRef} className="pointer-events-none absolute inset-0 z-[5] bg-black" />

         <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-8 sm:px-7 sm:pb-10 lg:px-12 lg:pb-12">
            <div className="w-full">
               <div className="overflow-visible">
                  <h1 className="hero-reveal font-display text-[clamp(3.8rem,13vw,12rem)] font-medium uppercase leading-[0.72] tracking-[-0.075em] text-white transition-all duration-500 hover:scale-[1.02] hover:text-dbh-blue hover:drop-shadow-[0_0_20px_rgba(82,199,255,0.5)] cursor-crosshair">Detroit</h1>
               </div>

               <div className="mt-[clamp(0.7rem,2vw,1.5rem)] flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="overflow-hidden">
                     <p className="hero-reveal font-display text-[clamp(1.15rem,3vw,3rem)] font-light uppercase leading-none tracking-[0.04em] text-white/80">Become Human</p>
                  </div>

                  <p className="hero-fade max-w-[310px] font-mono text-[8px] uppercase leading-[1.7] tracking-[0.15em] text-white/45 sm:text-[9px]">Tiga android. Tiga perjalanan. Satu pertanyaan tentang arti menjadi manusia.</p>
               </div>
            </div>
         </div>
      </section>
   );
}
