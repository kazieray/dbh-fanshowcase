"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeBackground() {
   const backgroundRef = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
      if (!backgroundRef.current) return;

      const background = backgroundRef.current;
      const root = background.closest("main");

      if (!root) return;

      ScrollTrigger.config({
         ignoreMobileResize: true,
      });

      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
         mm.add("(max-width: 767px)", () => {
            gsap.set(background, {
               scale: 1.03,
               transformOrigin: "center center",
            });

            const timeline = gsap.timeline({
               scrollTrigger: {
                  trigger: root,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1.2,
               },
            });

            timeline
               .to(background, {
                  scale: 1.04,
                  duration: 1,
                  ease: "none",
               })
               .to(background, {
                  scale: 1.06,
                  duration: 1,
                  ease: "none",
               })
               .to(background, {
                  scale: 1.1,
                  duration: 1,
                  ease: "none",
               });
         });

         mm.add("(min-width: 768px)", () => {
            gsap.fromTo(
               background,
               {
                  scale: 1.05,
                  yPercent: 0,
               },
               {
                  scale: 1.12,
                  yPercent: -2,
                  ease: "none",
                  scrollTrigger: {
                     trigger: root,
                     start: "top top",
                     end: "bottom bottom",
                     scrub: 1.2,
                  },
               },
            );
         });
      }, root);

      ScrollTrigger.refresh();

      return () => {
         mm.revert();
         ctx.revert();
      };
   }, []);

   return (
      <>
         <div ref={backgroundRef} className="pointer-events-none fixed inset-0 z-0 bg-[url('/images/home/bg-home.jpg')] bg-cover bg-center bg-no-repeat" style={{ willChange: "transform" }} />

         <div className="pointer-events-none fixed inset-0 z-[1] bg-black/25" />
      </>
   );
}
