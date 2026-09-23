"use client";

import { useLayoutEffect, useRef, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
   const sectionRef = useRef<HTMLElement>(null);
   const linesRef = useRef<SVGSVGElement>(null);
   
   useLayoutEffect(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
         // Animate SVG lines drawing themselves
         gsap.fromTo(
            "path.branch-line",
            { strokeDasharray: 1000, strokeDashoffset: 1000 },
            {
               strokeDashoffset: 0,
               duration: 2,
               stagger: 0.3,
               ease: "power2.inOut",
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 60%",
               },
            }
         );

         gsap.fromTo(
            ".feature-text",
            { opacity: 0, y: 30 },
            {
               opacity: 1,
               y: 0,
               duration: 1,
               stagger: 0.2,
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 60%",
               },
            }
         );
      }, sectionRef);

      return () => ctx.revert();
   }, []);

   const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      sectionRef.current.style.setProperty("--x", `${x}px`);
      sectionRef.current.style.setProperty("--y", `${y}px`);
   };

   return (
      <section 
         ref={sectionRef} 
         onMouseMove={handleMouseMove}
         className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-transparent py-24 px-6"
      >
         {/* Interactive Radial Glow */}
         <div 
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
               background: "radial-gradient(circle 400px at var(--x, 50%) var(--y, 50%), rgba(82, 199, 255, 0.15), transparent 100%)",
            }}
         />

         {/* Abstract Flowchart SVG */}
         <svg ref={linesRef} className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
            <path className="branch-line" d="M 50% 0 L 50% 30% L 30% 60% L 30% 100%" fill="none" stroke="#52c7ff" strokeWidth="2" />
            <path className="branch-line" d="M 50% 30% L 70% 60% L 70% 100%" fill="none" stroke="#52c7ff" strokeWidth="2" />
            <path className="branch-line" d="M 30% 60% L 10% 100%" fill="none" stroke="#52c7ff" strokeWidth="1" />
            <path className="branch-line" d="M 70% 60% L 90% 100%" fill="none" stroke="#52c7ff" strokeWidth="1" />
         </svg>

         <div className="relative z-10 max-w-3xl text-center">
            <h2 className="feature-text font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
               Setiap Pilihan <span className="text-dbh-blue">Berarti</span>
            </h2>
            <p className="feature-text mt-8 font-mono text-lg leading-relaxed text-white/70 sm:text-xl">
               Bentuk narasi ambisius ini melalui ribuan pilihan dan lusinan akhiran yang berbeda.
               Siapa yang hidup dan siapa yang mati, semuanya ada di tangan Anda.
            </p>
         </div>
      </section>
   );
}
