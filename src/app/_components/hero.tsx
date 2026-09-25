"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

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
         {/* Background Video (Blurred Trailer & Dark Overlay) */}
         <div ref={imageRef} className="absolute -inset-[5%] opacity-0 will-change-transform">
            <video
               src="/videos/YTDown.com_YouTube_Connor-VS-SWAT-Team-Fair-Fight_Media_aI5f4bCSzgw_001_1080p.mp4"
               autoPlay
               loop
               muted
               playsInline
               className="h-full w-full object-cover blur-[8px] opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-[url('/images/bg-dbh.jpg')] bg-cover bg-center bg-no-repeat opacity-25 mix-blend-overlay" />
         </div>

         <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
         <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

         <div ref={darknessRef} className="pointer-events-none absolute inset-0 z-[5] bg-black" />

         <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-8 sm:px-7 sm:pb-10 lg:px-12 lg:pb-12">
            <div className="w-full">
               {/* CyberLife LED indicator badge */}
               <div className="hero-fade mb-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1 backdrop-blur-md w-fit">
                  <span className="h-2 w-2 rounded-full bg-dbh-blue animate-pulse shadow-[0_0_8px_#00d2ff]" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/70">
                     CyberLife Trailer Stream (Blurred Video Loop)
                  </span>
               </div>

               <div className="overflow-hidden">
                  <h1 className="hero-reveal font-display text-[clamp(3.8rem,13vw,12rem)] font-medium uppercase leading-[0.72] tracking-[-0.075em] text-white">Detroit</h1>
               </div>

               <div className="mt-[clamp(0.7rem,2vw,1.5rem)] flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="overflow-hidden">
                     <p className="hero-reveal font-display text-[clamp(1.15rem,3vw,3rem)] font-light uppercase leading-none tracking-[0.04em] text-white/80">Become Human</p>
                  </div>

                  <div className="hero-fade max-w-[380px] flex flex-col gap-2">
                     <p className="font-mono text-[8px] uppercase leading-[1.7] tracking-[0.15em] text-white/60 sm:text-[9px]">
                        Tiga android. Tiga perjalanan. Satu pertanyaan tentang arti menjadi manusia.
                     </p>
                     <p className="font-mono text-[7.5px] uppercase leading-[1.6] tracking-[0.1em] text-white/35 sm:text-[8px] italic border-l border-dbh-blue/40 pl-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. CyberLife android system 2038.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
