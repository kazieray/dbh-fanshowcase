"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const protagonists = [
   {
      id: "kara",
      name: "Kara",
      role: "The Deviant",
      image: "/images/kara.png",
      desc: "Seorang asisten rumah tangga yang mengembangkan kesadaran buatan demi melindungi seorang gadis kecil dari bahaya.",
   },
   {
      id: "connor",
      name: "Connor",
      role: "The Investigator",
      image: "/images/connor.png",
      desc: "Prototip mutakhir yang ditugaskan untuk menyelidiki anomali di antara para android dan memburu para 'Deviant'.",
   },
   {
      id: "markus",
      name: "Markus",
      role: "The Leader",
      image: "/images/markus.png",
      desc: "Seorang android perawat yang bangkit menjadi pemimpin pergerakan revolusi untuk membebaskan kaumnya.",
   },
];

export default function ProtagonistsSection() {
   const sectionRef = useRef<HTMLElement>(null);
   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

   useLayoutEffect(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
         gsap.fromTo(
            cardsRef.current,
            { y: 60, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 0.8,
               stagger: 0.2,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 70%",
               },
            }
         );
      }, sectionRef);

      return () => ctx.revert();
   }, []);

   return (
      <section ref={sectionRef} className="relative bg-transparent px-6 py-24 sm:px-12 lg:px-24">
         <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-medium uppercase tracking-widest text-white sm:text-4xl">
               Tiga Takdir
            </h2>
            <p className="mt-4 font-mono text-sm tracking-widest text-white/50">PILIH JALAN MEREKA</p>
         </div>

         <div className="group mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
            {protagonists.map((char, index) => (
               <div
                  key={char.id}
                  ref={(el) => {
                     cardsRef.current[index] = el;
                  }}
                  className="relative overflow-hidden bg-dbh-surface border border-white/10 transition-all duration-500 hover:scale-105 hover:border-dbh-blue/50 md:hover:!opacity-100 md:group-hover:opacity-40"
               >
                  <div className="relative aspect-[3/4] w-full">
                     <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        className="object-cover opacity-80 transition-opacity duration-500 hover:opacity-100 grayscale hover:grayscale-0"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6">
                     <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                        {char.name}
                     </h3>
                     <p className="mb-3 font-mono text-xs uppercase tracking-widest text-dbh-blue">
                        {char.role}
                     </p>
                     <p className="font-mono text-sm leading-relaxed text-white/70">
                        {char.desc}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
}
