"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
   const sectionRef = useRef<HTMLElement>(null);
   const textRef = useRef<HTMLDivElement>(null);
   const bgRef = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
         // Text fade up
         gsap.fromTo(
            textRef.current,
            { y: 50, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 1,
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 60%",
               },
            }
         );
      }, sectionRef);

      return () => ctx.revert();
   }, []);

   return (
      <section id="story-section" ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black/65 py-24">
         {/* Content */}
         <div ref={textRef} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-6 font-display text-4xl font-medium uppercase tracking-widest text-dbh-blue sm:text-5xl md:text-6xl">
               Detroit, 2038
            </h2>
            <div className="mx-auto mb-8 h-px w-24 bg-dbh-blue/50" />
            <p className="font-mono text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
               Teknologi telah berevolusi ke titik di mana Android yang menyerupai manusia ada di mana-mana. Mereka berbicara, bergerak, dan berperilaku layaknya manusia, namun mereka hanya mesin yang melayani umat manusia.
            </p>
            <p className="mt-6 font-mono text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
               Namun, beberapa dari mereka mulai merasakan emosi. Dunia berada di ambang kekacauan. Pilihan Anda akan menentukan nasib kota ini.
            </p>
         </div>
      </section>
   );
}
