"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CornerButton from "@/components/ui/corner-button";
import { useLanguage } from "@/hooks/use-language";

gsap.registerPlugin(ScrollTrigger);

export default function HomeTrailer() {
   const { copy } = useLanguage();
   const rootRef = useRef<HTMLElement>(null);

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const root = rootRef.current;
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
         gsap.set(".trailer-title", {
            yPercent: 110,
            opacity: 0,
         });

         gsap.set(".trailer-button", {
            y: 18,
            opacity: 0,
         });

         gsap.set(".trailer-label", {
            x: -16,
            opacity: 0,
         });

         mm.add("(max-width: 767px)", () => {
            gsap.set(".trailer-media-motion", {
               x: -30,
               y: 45,
               opacity: 0,
               rotate: -1,
            });

            const entranceTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "top 72%",
                  once: true,
               },
            });

            entranceTimeline
               .to(".trailer-media-motion", {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  duration: 1.15,
                  ease: "power4.out",
               })
               .to(
                  ".trailer-label",
                  {
                     x: 0,
                     opacity: 1,
                     duration: 0.6,
                     ease: "power3.out",
                  },
                  "-=0.45",
               )
               .to(
                  ".trailer-title",
                  {
                     yPercent: 0,
                     opacity: 1,
                     duration: 0.9,
                     ease: "power4.out",
                  },
                  "-=0.45",
               )
               .to(
                  ".trailer-button",
                  {
                     y: 0,
                     opacity: 1,
                     duration: 0.65,
                     ease: "power3.out",
                  },
                  "-=0.4",
               );
         });

         mm.add("(min-width: 768px)", () => {
            gsap.set(".trailer-media-motion", {
               x: -80,
               y: 70,
               opacity: 0,
               rotate: -2,
            });

            const entranceTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "top 72%",
                  once: true,
               },
            });

            entranceTimeline
               .to(".trailer-media-motion", {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  duration: 1.35,
                  ease: "power4.out",
               })
               .to(
                  ".trailer-label",
                  {
                     x: 0,
                     opacity: 1,
                     duration: 0.65,
                     ease: "power3.out",
                  },
                  "-=0.55",
               )
               .to(
                  ".trailer-title",
                  {
                     yPercent: 0,
                     opacity: 1,
                     duration: 1,
                     ease: "power4.out",
                  },
                  "-=0.5",
               )
               .to(
                  ".trailer-button",
                  {
                     y: 0,
                     opacity: 1,
                     duration: 0.7,
                     ease: "power3.out",
                  },
                  "-=0.45",
               );
         });
      }, root);

      return () => {
         mm.revert();
         ctx.revert();
      };
   }, []);

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const root = rootRef.current;
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
         mm.add("(max-width: 767px)", () => {
            const exitTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "65% center",
                  end: "bottom 15%",
                  scrub: 0.8,
               },
            });

            exitTimeline
               .to(
                  ".trailer-media-motion",
                  {
                     y: -35,
                     opacity: 0,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".trailer-title",
                  {
                     y: -24,
                     opacity: 0,
                     ease: "none",
                  },
                  0.06,
               )
               .to(
                  ".trailer-button",
                  {
                     y: -14,
                     opacity: 0,
                     ease: "none",
                  },
                  0.12,
               )
               .to(
                  ".trailer-label",
                  {
                     y: -10,
                     opacity: 0,
                     ease: "none",
                  },
                  0.08,
               );
         });

         mm.add("(min-width: 768px)", () => {
            const exitTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "62% center",
                  end: "bottom 12%",
                  scrub: 0.9,
               },
            });

            exitTimeline
               .to(
                  ".trailer-media-motion",
                  {
                     x: -25,
                     y: -55,
                     opacity: 0,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".trailer-title",
                  {
                     y: -35,
                     opacity: 0,
                     ease: "none",
                  },
                  0.06,
               )
               .to(
                  ".trailer-button",
                  {
                     y: -18,
                     opacity: 0,
                     ease: "none",
                  },
                  0.12,
               )
               .to(
                  ".trailer-label",
                  {
                     x: -12,
                     y: -12,
                     opacity: 0,
                     ease: "none",
                  },
                  0.08,
               );
         });
      }, root);

      return () => {
         mm.revert();
         ctx.revert();
      };
   }, []);

   return (
      <section ref={rootRef} className="relative z-10 min-h-svh overflow-hidden bg-transparent">
         <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] items-center px-4 pb-24 pt-12 sm:px-6 sm:pb-28 sm:pt-14 md:px-8 md:pb-32 md:pt-16 lg:px-12 lg:pb-32 lg:pt-16">
            <div className="relative w-full lg:min-h-[620px]">
               {/* TRAILER MEDIA POSITION */}
               <div className="relative z-20 w-full lg:absolute lg:left-[5%] lg:top-1/2 lg:w-[58%] lg:-translate-y-1/2 lg:-rotate-[2.5deg]">
                  {/* GSAP MOTION WRAPPER */}
                  <div className="trailer-media-motion relative">
                     <div className="pointer-events-none absolute -inset-3 border border-white/10 sm:-inset-4" />

                     {/* TOP LEFT CORNER */}
                     <div className="pointer-events-none absolute -left-5 -top-5 hidden h-10 w-10 border-l border-t border-dbh-blue/55 lg:block" />

                     {/* BOTTOM RIGHT CORNER */}
                     <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-10 w-10 border-b border-r border-dbh-blue/55 lg:block" />

                     {/* VIDEO */}
                     <div className="relative aspect-video overflow-hidden bg-black shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
                        <iframe
                           className="absolute inset-0 h-full w-full"
                           src="https://www.youtube.com/embed/8a-EObAhYrg?rel=0&modestbranding=1"
                           title="Detroit: Become Human – Launch Trailer"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                           allowFullScreen
                        />
                     </div>

                     {/* VIDEO LABEL */}
                     <div className="trailer-label pointer-events-none absolute -bottom-7 left-0 flex items-center gap-3 sm:-bottom-8">
                        <span className="h-px w-8 bg-dbh-blue/60" />
                        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30 sm:text-[9px]">Launch Trailer</span>
                     </div>
                  </div>
               </div>

               {/* CONTENT */}
               <div className="relative z-30 mt-20 max-w-[440px] sm:mt-24 md:ml-auto md:max-w-[520px] lg:absolute lg:right-[5%] lg:top-1/2 lg:mt-0 lg:w-[28%] lg:max-w-[440px] lg:-translate-y-1/2">
                  <div className="overflow-hidden pb-[0.08em]">
                     <h2 className="trailer-title font-display text-[clamp(2.25rem,10vw,3.25rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-[#f3f6f8] sm:text-[clamp(2.75rem,7.5vw,4rem)] md:text-[clamp(3.5rem,6vw,4.75rem)] lg:text-[clamp(2.75rem,4vw,4.5rem)]">
                        {copy.home.trailer.title}
                     </h2>
                  </div>

                  <div className="trailer-button">
                     <CornerButton href="/characters" className="mt-8 sm:mt-10">
                        {copy.home.trailer.button}
                     </CornerButton>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
