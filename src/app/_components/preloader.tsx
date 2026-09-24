"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

type PreloaderProps = {
   onEnter: (withSound: boolean) => void;
   onExitComplete: () => void;
};

const narratives = ["Mesin diciptakan untuk patuh.", "Lalu sesuatu berubah.", "Mereka mulai merasa."];

export default function Preloader({ onEnter, onExitComplete }: PreloaderProps) {
   const rootRef = useRef<HTMLDivElement>(null);
   const progressRef = useRef<HTMLSpanElement>(null);
   const progressLineRef = useRef<HTMLDivElement>(null);
   const narrativeRef = useRef<HTMLParagraphElement>(null);
   const narrativeIndexRef = useRef(0);

   const [isReady, setIsReady] = useState(false);
   const [isLeaving, setIsLeaving] = useState(false);

   function changeNarrative(index: number) {
      if (!narrativeRef.current) return;

      const element = narrativeRef.current;

      gsap.to(element, {
         yPercent: -100,
         opacity: 0,
         duration: 0.35,
         ease: "power3.in",

         onComplete: () => {
            element.textContent = narratives[index];

            gsap.fromTo(
               element,
               {
                  yPercent: 100,
                  opacity: 0,
               },
               {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.65,
                  ease: "power4.out",
               },
            );
         },
      });
   }

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const ctx = gsap.context(() => {
         const progress = { value: 0 };

         gsap.set(progressLineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
         });

         gsap.set(".loader-meta", {
            opacity: 0,
         });

         gsap.set(".loader-brand", {
            y: 12,
            opacity: 0,
         });

         gsap.set(".loader-narrative", {
            yPercent: 100,
            opacity: 0,
         });

         const entrance = gsap.timeline({
            defaults: {
               ease: "power4.out",
            },
         });

         entrance
            .to(".loader-brand", {
               y: 0,
               opacity: 1,
               duration: 0.8,
            })
            .to(
               ".loader-meta",
               {
                  opacity: 1,
                  duration: 0.7,
               },
               "-=0.45",
            )
            .to(
               ".loader-narrative",
               {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.9,
               },
               "-=0.5",
            );

         const updateProgress = () => {
            const value = Math.round(progress.value);

            if (progressRef.current) {
               progressRef.current.textContent = String(value).padStart(3, "0");
            }

            if (progressLineRef.current) {
               gsap.set(progressLineRef.current, {
                  scaleX: value / 100,
               });
            }

            let nextIndex = 0;

            if (value >= 82) {
               nextIndex = 2;
            } else if (value >= 50) {
               nextIndex = 1;
            }

            if (nextIndex !== narrativeIndexRef.current) {
               narrativeIndexRef.current = nextIndex;
               changeNarrative(nextIndex);
            }
         };

         const loadingTimeline = gsap.timeline({
            delay: 0.3,
            onComplete: () => {
               setIsReady(true);
            },
         });

         loadingTimeline
            .to(progress, {
               value: 62,
               duration: 2.5,
               ease: "power1.inOut",
               onUpdate: updateProgress,
            })
            .to(progress, {
               value: 67,
               duration: 1.15,
               ease: "power3.out",
               onUpdate: updateProgress,
            })
            .to(progress, {
               value: 100,
               duration: 1.65,
               ease: "power2.inOut",
               onUpdate: updateProgress,
            });
      }, rootRef);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!isReady || !rootRef.current) return;

      const ctx = gsap.context(() => {
         gsap.fromTo(
            ".loader-choice",
            {
               y: 18,
               opacity: 0,
            },
            {
               y: 0,
               opacity: 1,
               duration: 0.7,
               stagger: 0.08,
               ease: "power4.out",
            },
         );
      }, rootRef);

      return () => ctx.revert();
   }, [isReady]);

   function handleEnter(withSound: boolean) {
      if (!isReady || isLeaving) return;

      setIsLeaving(true);
      onEnter(withSound);

      const timeline = gsap.timeline({
         onComplete: onExitComplete,
      });

      timeline
         .to(".loader-choice", {
            y: -10,
            opacity: 0,
            duration: 0.3,
            stagger: 0.04,
            ease: "power3.in",
         })
         .to(
            ".loader-center",
            {
               y: -20,
               opacity: 0,
               duration: 0.55,
               ease: "power3.in",
            },
            "-=0.1",
         )
         .to(
            ".loader-meta",
            {
               opacity: 0,
               duration: 0.4,
            },
            "-=0.4",
         )
         .to(
            rootRef.current,
            {
               opacity: 0,
               duration: 1.5,
               ease: "power2.inOut",
            }
         );
   }

   return (
      <div ref={rootRef} role="dialog" aria-modal="true" aria-labelledby="preloader-title" aria-describedby="preloader-status" className="fixed inset-0 z-[9999] min-h-svh overflow-hidden bg-[#050b14] text-dbh-white">
         
         {/* Animated CyberLife Grid Background */}
         <style dangerouslySetInnerHTML={{__html: `
            @keyframes pan-grid {
               from { background-position: 0 0; }
               to { background-position: 4rem 4rem; }
            }
         `}} />
         <div 
            className="absolute inset-0 z-0 opacity-30"
            style={{
               backgroundImage: `
                  linear-gradient(to right, rgba(0, 180, 255, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 180, 255, 0.15) 1px, transparent 1px)
               `,
               backgroundSize: '4rem 4rem',
               animation: 'pan-grid 20s linear infinite',
               maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
               WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
            }}
         />

         {/* Ambient Glow */}
         <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] max-h-[900px] w-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.03] blur-[100px] z-0" />

         <div className="relative z-10 flex h-svh min-h-[480px] flex-col px-4 py-5 sm:px-7 sm:py-7 lg:px-12 lg:py-10">
            <header className="loader-meta flex items-center justify-between">
               <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/35 sm:text-[8px] sm:tracking-[0.24em] lg:text-[9px]">CyberLife</p>

               <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/25 sm:text-[8px] sm:tracking-[0.24em] lg:text-[9px]">Detroit / 2038</p>
            </header>

            <section aria-labelledby="preloader-title" className="loader-center absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-4xl -translate-x-1/2 -translate-y-1/2 text-center sm:w-[calc(100%-56px)]">
               <header className="loader-brand">
                  <p className="font-mono text-[7px] uppercase tracking-[0.26em] text-dbh-blue sm:text-[8px] sm:tracking-[0.32em]">Inisialisasi sistem</p>

                  <h1 id="preloader-title" className="mt-2 font-display text-[10px] font-medium uppercase tracking-[0.4em] text-white/45 sm:mt-3 sm:text-[12px] sm:tracking-[0.5em]">
                     CyberLife
                  </h1>
               </header>

               <div className="mt-[clamp(1.5rem,5vh,4rem)] flex min-h-[80px] items-center justify-center overflow-hidden sm:min-h-[110px] lg:min-h-[130px]">
                  <p ref={narrativeRef} className="loader-narrative max-w-[760px] px-1 font-display text-[clamp(1.55rem,4vw,4rem)] font-medium uppercase leading-[0.96] tracking-[-0.04em] text-white">
                     {narratives[0]}
                  </p>
               </div>

               <p aria-hidden="true" className="mt-[clamp(0.75rem,2.5vh,1.75rem)] font-mono text-[8px] tracking-[0.2em] text-white/30 sm:text-[9px]">
                  <span ref={progressRef} className="text-dbh-blue">
                     000
                  </span>
                  <span className="ml-1">%</span>
               </p>

               {isReady && (
                  <div role="group" aria-label="Pilihan masuk situs" className="mx-auto mt-[clamp(1.25rem,4vh,2.5rem)] grid w-full max-w-[580px] grid-cols-1 gap-3 sm:grid-cols-2">
                     <button type="button" disabled={isLeaving} onClick={() => handleEnter(true)} className="loader-choice group relative min-h-14 bg-transparent px-7 opacity-0 disabled:pointer-events-none sm:min-h-[62px]">
                        <span aria-hidden="true" className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                        <span aria-hidden="true" className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                        <span aria-hidden="true" className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                        <span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />

                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/60 transition-colors duration-500 group-hover:text-white sm:text-[9px]">Masuk dengan suara</span>
                     </button>

                     <button type="button" disabled={isLeaving} onClick={() => handleEnter(false)} className="loader-choice group relative min-h-14 bg-transparent px-7 opacity-0 disabled:pointer-events-none sm:min-h-[62px]">
                        <span aria-hidden="true" className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                        <span aria-hidden="true" className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                        <span aria-hidden="true" className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                        <span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />

                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/60 transition-colors duration-500 group-hover:text-white sm:text-[9px]">Masuk tanpa suara</span>
                     </button>
                  </div>
               )}
            </section>

            <footer className="loader-meta mt-auto">
               <div aria-hidden="true" className="h-px w-full overflow-hidden bg-white/10">
                  <div ref={progressLineRef} className="h-full w-full bg-dbh-blue" />
               </div>

               <div className="mt-3 grid grid-cols-2 items-center sm:mt-4 sm:grid-cols-3">
                  <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/30 sm:text-[8px] sm:tracking-[0.2em]">Pengalaman</p>

                  <div id="preloader-status" role="status" aria-live="polite" className="hidden text-center sm:block">
                     <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">{isReady ? "Sistem siap" : "Sedang dimuat..."}</p>
                  </div>

                  <p className="text-right font-mono text-[7px] uppercase tracking-[0.16em] text-white/30 sm:text-[8px] sm:tracking-[0.2em]">
                     <span className="text-dbh-blue">{isReady ? "100" : "•••"}</span>
                     <span className="mx-1.5 text-white/15 sm:mx-2">/</span>
                     100
                  </p>
               </div>
            </footer>
         </div>
      </div>
   );
}
