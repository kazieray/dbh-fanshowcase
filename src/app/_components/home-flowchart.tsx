"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/hooks/use-language";
import FlowchartBoard from "./flowchart-board";

gsap.registerPlugin(ScrollTrigger);

export default function HomeFlowchart() {
   const rootRef = useRef<HTMLElement>(null);
   const { copy } = useLanguage();

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const root = rootRef.current;

      const ctx = gsap.context(() => {
         /* INITIAL STATE */

         gsap.set(".flowchart-heading", {
            y: 35,
            opacity: 0,
         });

         gsap.set(".flowchart-chapter", {
            y: 14,
            opacity: 0,
         });

         gsap.set(".flowchart-hostage", {
            yPercent: 110,
            opacity: 0,
         });

         gsap.set(".flowchart-rule", {
            scaleX: 0,
            transformOrigin: "right center",
         });

         gsap.set(".flowchart-board", {
            y: 50,
            opacity: 0,
         });

         gsap.set(".branch-line", {
            strokeDasharray: 1800,
            strokeDashoffset: 1800,
         });

         gsap.set(".flowchart-node", {
            opacity: 0,
            scale: 0.94,
         });

         /* ENTRANCE */

         const entranceTimeline = gsap.timeline({
            scrollTrigger: {
               trigger: root,
               start: "top 68%",
               once: true,
            },
         });

         entranceTimeline
            .to(".flowchart-heading", {
               y: 0,
               opacity: 1,
               duration: 0.9,
               ease: "power4.out",
            })
            .to(
               ".flowchart-chapter",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.65,
                  ease: "power3.out",
               },
               "-=0.6",
            )
            .to(
               ".flowchart-hostage",
               {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.85,
                  ease: "power4.out",
               },
               "-=0.48",
            )
            .to(
               ".flowchart-rule",
               {
                  scaleX: 1,
                  duration: 0.65,
                  ease: "power3.inOut",
               },
               "-=0.42",
            )
            .to(
               ".flowchart-board",
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power3.out",
               },
               "-=0.3",
            )
            .to(
               ".branch-line",
               {
                  strokeDashoffset: 0,
                  duration: 1.8,
                  stagger: 0.12,
                  ease: "power2.inOut",
               },
               "-=0.6",
            )
            .to(
               ".flowchart-node",
               {
                  opacity: 1,
                  scale: 1,
                  duration: 0.45,
                  stagger: 0.07,
                  ease: "power3.out",
               },
               "-=1.45",
            );
      }, root);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const root = rootRef.current;
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
         /* MOBILE EXIT */

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
                  ".flowchart-header",
                  {
                     y: -18,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0,
               )
               .to(
                  ".flowchart-heading",
                  {
                     y: -22,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0.04,
               )
               .to(
                  ".flowchart-board",
                  {
                     y: -30,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0.08,
               );
         });

         /* TABLET + DESKTOP EXIT */

         mm.add("(min-width: 768px)", () => {
            const exitTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "68% center",
                  end: "bottom 12%",
                  scrub: 0.9,
               },
            });

            exitTimeline
               .to(
                  ".flowchart-header",
                  {
                     y: -22,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0,
               )
               .to(
                  ".flowchart-heading",
                  {
                     y: -30,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0.04,
               )
               .to(
                  ".flowchart-board",
                  {
                     y: -45,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
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
      <section ref={rootRef} id="flowchart-section" className="relative z-10 h-svh overflow-hidden bg-transparent">
         <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05080d]/68 via-[#05080d]/52 via-[45%] to-[#05080d]/72" />

         {/* VIEWPORT CENTER */}
         <div className="relative z-10 mx-auto flex h-svh w-full max-w-[1600px] items-center px-4 sm:px-6 md:px-8 lg:px-12">
            {/* WHOLE COMPOSITION */}
            <div className="w-full">
               {/* HEADER */}
               <div className="flex w-full flex-col gap-6 sm:gap-7 md:grid md:grid-cols-12 md:items-end md:gap-x-8 md:gap-y-0">
                  {/* EVERY CHOICE MATTERS */}
                  <div className="md:col-span-5">
                     <div className="overflow-hidden pb-[0.08em]">
                        <h2 className="flowchart-heading max-w-[430px] font-display text-[clamp(2.25rem,10vw,3.15rem)] font-medium uppercase leading-[0.88] tracking-[-0.055em] text-[#f3f6f8] sm:text-[clamp(2.65rem,7.5vw,3.75rem)] md:max-w-[560px] md:text-[clamp(2.75rem,4.25vw,4.75rem)] md:leading-[0.86] lg:max-w-[580px] lg:text-[clamp(3rem,4vw,5rem)]">
                           {copy.home.flowchart.title}
                        </h2>
                     </div>
                  </div>

                  {/* CONNOR / THE HOSTAGE */}
                  <div className="flowchart-header md:col-span-5 md:col-start-8 md:text-right">
                     <p className="flowchart-chapter font-mono text-[8px] uppercase tracking-[0.2em] text-dbh-blue/80 sm:text-[9px] md:tracking-[0.22em] lg:text-[10px]">{copy.home.flowchart.chapter}</p>

                     <div className="mt-3 overflow-hidden pb-[0.08em] md:mt-4">
                        <h3 className="flowchart-hostage font-display text-[clamp(2rem,9vw,2.75rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-white/80 sm:text-[clamp(2.35rem,7vw,3.25rem)] md:text-[clamp(2.5rem,3.5vw,3.75rem)] md:leading-[0.9] lg:text-[clamp(2.75rem,3.5vw,4rem)]">
                           The Hostage
                        </h3>
                     </div>

                     <div className="flowchart-rule mt-4 h-px w-16 bg-white/20 md:ml-auto md:mt-5 md:w-20" />
                  </div>
               </div>

               {/* FLOWCHART */}
               <div className="mt-6 sm:mt-7 md:mt-6 lg:mt-8">
                  <FlowchartBoard />
               </div>
            </div>
         </div>
      </section>
   );
}
