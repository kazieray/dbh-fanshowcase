"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
   const container = useRef<HTMLElement>(null);

   useGSAP(
      () => {
         const tl = gsap.timeline();

         tl.from(".hero-label", {
            opacity: 0,
            y: 20,
            duration: 0.6,
         })
            .from(
               ".hero-title",
               {
                  opacity: 0,
                  y: 60,
                  duration: 1,
                  ease: "power4.out",
               },
               "-=0.2",
            )
            .from(
               ".hero-description",
               {
                  opacity: 0,
                  y: 30,
                  duration: 0.8,
               },
               "-=0.5",
            );

         gsap.from(".scroll-text", {
            opacity: 0,
            y: 100,
            scrollTrigger: {
               trigger: ".scroll-text",
               start: "top 100%",
               end: "top 40%",
               scrub: true,
            },
         });
      },
      { scope: container },
   );

   return (
      <main ref={container}>
         <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 text-white">
            <div className="mx-auto w-full max-w-7xl">
               <p className="hero-label mb-4 text-sm tracking-[0.35em] text-cyan-400">CYBERLIFE // ANDROID DIVISION</p>

               <h1 className="hero-title max-w-5xl text-6xl font-semibold uppercase leading-[0.9] md:text-8xl">
                  Become
                  <br />
                  Human.
               </h1>

               <p className="hero-description mt-8 max-w-xl text-lg leading-relaxed text-white/60">Every decision changes the story. Every choice defines what it means to be human.</p>
            </div>
         </section>

         <section className="flex min-h-screen items-center justify-center bg-neutral-950">
            <p className="scroll-text text-4xl font-semibold text-white">YOUR CHOICES HAVE CONSEQUENCES.</p>
         </section>
      </main>
   );
}
