"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/hooks/use-language";

gsap.registerPlugin(ScrollTrigger);

export default function HomeStory() {
   const { copy } = useLanguage();
   const rootRef = useRef<HTMLElement>(null);

   // ENTRANCE — PLAY ONCE
   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const root = rootRef.current;

      const ctx = gsap.context(() => {
         gsap.set(".story-rule", {
            scaleX: 0,
            transformOrigin: "left center",
         });

         gsap.set(".story-eyebrow", {
            y: 16,
            opacity: 0,
         });

         gsap.set(".story-title", {
            y: 70,
            opacity: 0,
         });

         gsap.set(".story-description", {
            y: 35,
            opacity: 0,
         });

         gsap.set(".story-divider", {
            scaleX: 0,
            opacity: 1,
            transformOrigin: "left center",
         });

         gsap.set(".story-shift", {
            y: 30,
            opacity: 0,
         });

         gsap.set(".story-secondary", {
            y: 25,
            opacity: 0,
         });

         const entranceTimeline = gsap.timeline({
            scrollTrigger: {
               trigger: root,
               start: "top 70%",
               once: true,
            },
         });

         entranceTimeline
            .to(".story-rule", {
               scaleX: 1,
               duration: 0.9,
               ease: "power3.out",
            })
            .to(
               ".story-eyebrow",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.65,
                  ease: "power3.out",
               },
               "-=0.55",
            )
            .to(
               ".story-title",
               {
                  y: 0,
                  opacity: 1,
                  duration: 1.1,
                  ease: "power4.out",
               },
               "-=0.35",
            )
            .to(
               ".story-description",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.85,
                  ease: "power3.out",
               },
               "-=0.65",
            )
            .to(
               ".story-divider",
               {
                  scaleX: 1,
                  duration: 0.75,
                  ease: "power3.out",
               },
               "-=0.35",
            )
            .to(
               ".story-shift",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  ease: "power3.out",
               },
               "-=0.4",
            )
            .to(
               ".story-secondary",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  ease: "power3.out",
               },
               "-=0.45",
            );
      }, root);

      return () => ctx.revert();
   }, []);

   // EXIT — SCRUB + REVERSES WHEN SCROLLING BACK
   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const root = rootRef.current;
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
         mm.add("(max-width: 767px)", () => {
            const exitTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "68% center",
                  end: "bottom 15%",
                  scrub: 0.8,
               },
            });

            exitTimeline
               .to(
                  ".story-group",
                  {
                     y: -45,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".story-rule",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".story-eyebrow",
                  {
                     y: -10,
                     opacity: 0,
                     ease: "none",
                  },
                  0.04,
               )
               .to(
                  ".story-title",
                  {
                     y: -30,
                     opacity: 0,
                     ease: "none",
                  },
                  0.08,
               )
               .to(
                  ".story-description",
                  {
                     y: -18,
                     opacity: 0,
                     ease: "none",
                  },
                  0.14,
               )
               .to(
                  ".story-divider",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0.18,
               )
               .to(
                  ".story-shift",
                  {
                     y: -16,
                     opacity: 0,
                     ease: "none",
                  },
                  0.2,
               )
               .to(
                  ".story-secondary",
                  {
                     y: -14,
                     opacity: 0,
                     ease: "none",
                  },
                  0.24,
               );
         });

         mm.add("(min-width: 768px)", () => {
            const exitTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "65% center",
                  end: "bottom 12%",
                  scrub: 0.9,
               },
            });

            exitTimeline
               .to(
                  ".story-group",
                  {
                     y: -60,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".story-rule",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0,
               )
               .to(
                  ".story-eyebrow",
                  {
                     y: -12,
                     opacity: 0,
                     ease: "none",
                  },
                  0.04,
               )
               .to(
                  ".story-title",
                  {
                     y: -40,
                     opacity: 0,
                     ease: "none",
                  },
                  0.08,
               )
               .to(
                  ".story-description",
                  {
                     y: -22,
                     opacity: 0,
                     ease: "none",
                  },
                  0.14,
               )
               .to(
                  ".story-divider",
                  {
                     opacity: 0,
                     ease: "none",
                  },
                  0.18,
               )
               .to(
                  ".story-shift",
                  {
                     y: -20,
                     opacity: 0,
                     ease: "none",
                  },
                  0.2,
               )
               .to(
                  ".story-secondary",
                  {
                     y: -18,
                     opacity: 0,
                     ease: "none",
                  },
                  0.24,
               );
         });
      }, root);

      return () => {
         mm.revert();
         ctx.revert();
      };
   }, []);

   return (
      <section ref={rootRef} id="story-section" className="relative z-10 min-h-svh overflow-hidden bg-transparent">
         <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-20 lg:px-12 lg:py-20">
            <div className="story-group w-full">
               {/* OPENING RULE + SETTING */}
               <div className="story-rule border-t border-white/15 pt-3">
                  <p className="story-eyebrow font-mono text-[10px] uppercase tracking-[0.2em] text-dbh-blue sm:tracking-[0.22em] lg:text-[11px]">{copy.home.story.eyebrow}</p>
               </div>

               {/* STORY CONTENT */}
               <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
                  {/* HEADLINE */}
                  <div className="lg:col-span-7">
                     <h2 className="story-title max-w-[950px] font-display text-[clamp(2.25rem,10vw,3.25rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-[#f3f6f8] sm:text-[clamp(2.75rem,7.5vw,4rem)] md:max-w-[820px] md:text-[clamp(3.5rem,6vw,4.75rem)] lg:max-w-[900px] lg:text-[clamp(4rem,5vw,6rem)]">
                        {copy.home.story.title}
                     </h2>
                  </div>

                  {/* CONTEXT */}
                  <div className="mt-8 max-w-lg sm:mt-10 sm:max-w-xl md:mt-10 md:max-w-[620px] lg:col-span-4 lg:col-start-8 lg:mt-2 lg:max-w-[430px]">
                     <p className="story-description max-w-lg font-mono text-[11px] leading-[1.75] tracking-[0.035em] text-white/55 sm:text-[12px] md:tracking-[0.04em] lg:text-[13px] lg:leading-[1.7]">{copy.home.story.description}</p>

                     <div className="story-divider my-6 h-px w-full bg-white/10 sm:my-7 md:my-8" />

                     <p className="story-shift font-display text-xl font-medium uppercase leading-[1.05] tracking-[-0.02em] text-dbh-blue sm:text-[1.35rem] md:text-2xl">{copy.home.story.shift}</p>

                     <p className="story-secondary mt-3 max-w-lg font-mono text-[11px] leading-[1.75] tracking-[0.035em] text-white/55 sm:mt-4 sm:text-[12px] md:tracking-[0.04em] lg:text-[13px] lg:leading-[1.7]">
                        {copy.home.story.secondary}
                     </p>
                  </div>
               </div>

               {/* CLOSING RULE — STATIC */}
               <div className="mt-10 border-t border-white/15 sm:mt-12 md:mt-14 lg:mt-16" />
            </div>
         </div>
      </section>
   );
}
