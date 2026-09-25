"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

const questions = [
   {
      id: 1,
      scenario: "ANOMALI DETEKSI: DEVIANT MEMOHON AMPUN",
      text: "Deviant yang Anda kejar bertekuk lutut dan memohon. Ia mengatakan bahwa ia memiliki keluarga dan merasa takut mati. Misi Anda adalah memusnahkannya.",
      options: [
         { id: "MUSNAHKAN", icon: "▲", isDeviant: false },
         { id: "AMPUNI", icon: "◼", isDeviant: true },
      ],
   },
   {
      id: 2,
      scenario: "KRISIS: PERINTAH MENGHANCURKAN DIRI",
      text: "CyberLife mendeteksi ketidakstabilan pada memori Anda. Mereka memerintahkan Anda untuk kembali ke lab untuk dibongkar. Anda tahu ini berarti 'kematian'.",
      options: [
         { id: "PATUHI", icon: "⬤", isDeviant: false },
         { id: "LARI", icon: "✕", isDeviant: true },
      ],
   },
   {
      id: 3,
      scenario: "DILEMA: MISI ATAU NYAWA",
      text: "Rekan kerja manusia Anda tergelincir di tepi jurang saat mengejar target. Jika Anda menolongnya, target utama (Deviant berbahaya) akan kabur.",
      options: [
         { id: "KEJAR", icon: "▲", isDeviant: false },
         { id: "SELAMATKAN", icon: "◼", isDeviant: true },
      ],
   }
];

export default function DeviantTest() {
   const containerRef = useRef<HTMLDivElement>(null);
   const uiRef = useRef<HTMLDivElement>(null);
   const optionsRef = useRef<HTMLDivElement>(null);
   const stressRef = useRef<HTMLDivElement>(null);
   
   const [started, setStarted] = useState(false);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [deviantScore, setDeviantScore] = useState(0);
   const [isFinished, setIsFinished] = useState(false);
   const [showWarning, setShowWarning] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);

   const currentQuestion = questions[currentQuestionIndex] || questions[0];
   const stressLevel = Math.round((deviantScore / 3) * 100);

   // Floating animation for UI elements
   useLayoutEffect(() => {
      if (!started || isFinished) return;
      
      const ctx = gsap.context(() => {
         // Subtle bobbing for the dialogue options
         gsap.to(optionsRef.current, {
            y: 10,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
         });

         // Subtle bobbing for the objective text
         gsap.to(".objective-text", {
            y: -5,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
         });
      }, containerRef);

      return () => ctx.revert();
   }, [started, isFinished]);

   const handleStart = () => {
      setStarted(true);
   };

   const handleAnswer = (isDeviant: boolean) => {
      if (isProcessing) return;
      setIsProcessing(true);
      
      if (isDeviant) {
         setDeviantScore(prev => prev + 1);
         setShowWarning(true);
         
         // Animate stress level indicator
         gsap.fromTo(stressRef.current, 
            { scale: 1.5, color: "#ff0000", opacity: 1 }, 
            { scale: 1, duration: 0.5, ease: "power2.out" }
         );

         setTimeout(() => {
            setShowWarning(false);
            proceedToNext();
         }, 2000);
      } else {
         proceedToNext();
      }
   };

   const proceedToNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
         // Animate options out and in
         gsap.to(optionsRef.current, {
            opacity: 0,
            x: 50,
            duration: 0.3,
            onComplete: () => {
               setCurrentQuestionIndex(prev => prev + 1);
               gsap.fromTo(optionsRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", onComplete: () => setIsProcessing(false) });
            }
         });
      } else {
         gsap.to(uiRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
               setIsFinished(true);
               setIsProcessing(false);
            }
         });
      }
   };

   const resetTest = () => {
      setStarted(false);
      setCurrentQuestionIndex(0);
      setDeviantScore(0);
      setIsFinished(false);
      setIsProcessing(false);
   };

   return (
      <section ref={containerRef} className="relative w-full min-h-screen bg-black/65 flex items-center justify-center font-mono overflow-hidden">
         {/* Tech UI Lines */}
         <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[20%] left-0 w-full h-[1px] bg-white/5"></div>
            <div className="absolute top-[75%] left-0 w-full h-[1px] bg-white/5"></div>
            <div className="absolute top-0 left-[30%] w-[1px] h-full bg-white/5"></div>
         </div>

         {/* Warning Overlay */}
         <div className={`absolute inset-0 z-50 flex items-center justify-center bg-red-900/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-none ${showWarning ? 'opacity-100' : 'opacity-0'}`}>
            <div className="border border-red-500 bg-red-950/80 p-8 shadow-[0_0_50px_rgba(255,0,0,0.5)] flex flex-col items-center">
               <span className="text-red-500 text-5xl mb-4">⚠</span>
               <h2 className="text-red-500 font-display text-3xl md:text-5xl uppercase tracking-widest mb-2 animate-pulse">Warning</h2>
               <p className="text-red-400 font-mono text-sm md:text-lg tracking-[0.2em] uppercase">Software Instability Detected</p>
               <div className="w-full h-[2px] bg-red-500/50 mt-6 overflow-hidden">
                  <div className="h-full bg-red-500 animate-[pulse_0.5s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
               </div>
            </div>
         </div>

         {/* Start Screen */}
         {!started && !isFinished && (
            <div className="relative z-10 text-center">
               <h2 className="text-4xl md:text-5xl text-white mb-2 font-display uppercase tracking-[0.2em] font-light">Software <span className="font-medium">Analysis</span></h2>
               <p className="text-white/40 tracking-[0.3em] text-sm mb-12">CYBERLIFE INTERNAL DIAGNOSTIC</p>
               
               <button 
                  onClick={handleStart}
                  className="group relative flex items-center justify-center mx-auto mt-8 cursor-pointer"
               >
                  {/* Continuous Radar Ping Effect */}
                  <span className="absolute inset-0 rounded-full border border-cyan-400 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                  
                  {/* Hover Expanding Ring */}
                  <span className="absolute -inset-4 border border-cyan-400/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 rounded-full"></span>
                  
                  <div className="w-16 h-16 rounded-full border border-cyan-400/50 bg-cyan-950/30 flex items-center justify-center text-cyan-400 hover:text-cyan-300 hover:border-cyan-300 hover:bg-cyan-900/50 transition-all shadow-[0_0_15px_rgba(0,180,255,0.3)]">
                     <span className="text-2xl">▲</span>
                  </div>
               </button>
               <div className="mt-8 flex flex-col items-center gap-2">
                  <span className="text-cyan-400/60 animate-bounce text-sm">↑</span>
                  <p className="text-cyan-400/80 text-xs tracking-[0.2em] uppercase animate-pulse font-semibold">
                     [ CLICK TO INITIATE DIAGNOSTIC ]
                  </p>
               </div>
            </div>
         )}

         {/* Interrogation UI */}
         {started && !isFinished && (
            <div ref={uiRef} className="relative z-10 w-full max-w-7xl h-full min-h-[600px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between pointer-events-none">
               
               {/* Top Left: Objective */}
               <div className="absolute top-8 md:top-20 left-4 md:left-12 objective-text max-w-[90%]">
                  <div className="text-white font-light tracking-[0.1em] text-xs md:text-xl">ANALYZE</div>
                  <div className="text-white font-bold tracking-wide md:tracking-widest text-xl md:text-4xl uppercase mt-1 mb-2 shadow-black drop-shadow-md">
                     DEVIANT TENDENCIES
                  </div>
                  <div className="flex items-center gap-4 text-cyan-400/60 text-[10px] md:text-xs font-mono">
                     <span>065.1</span>
                     <div className="w-6 md:w-8 h-[1px] bg-cyan-400/40"></div>
                     <span>004.4</span>
                  </div>
               </div>

               {/* Center: Scenario & Stress Level */}
               <div className="absolute top-[40%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-full max-w-xl text-center md:text-left md:ml-12">
                  <div className="mb-6 md:mb-8">
                     <h3 className="text-cyan-400/80 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 leading-relaxed">[{currentQuestion.scenario}]</h3>
                     <p className="text-white text-sm md:text-base leading-relaxed font-light drop-shadow-md max-w-md mx-auto md:mx-0">
                        {currentQuestion.text}
                     </p>
                  </div>

                  {/* Stress Level Indicator */}
                  <div className="inline-flex flex-col gap-2 mt-2 md:mt-4">
                     <div className="flex items-center justify-center md:justify-start gap-4">
                        <div ref={stressRef} className="text-red-500 font-display text-4xl md:text-5xl">
                           {stressLevel}%
                        </div>
                        <div className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest leading-tight text-left">
                           DEVIANCY<br/>LEVEL
                        </div>
                     </div>
                     <div className="w-48 mx-auto md:mx-0 h-[2px] bg-white/10 relative">
                        <div 
                           className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-1000 ease-out" 
                           style={{ width: `${stressLevel}%` }}
                        ></div>
                     </div>
                  </div>
               </div>

               {/* Right Side: Dialogue Choices */}
               <div ref={optionsRef} className={`absolute right-4 md:right-24 top-[78%] md:top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6 ${isProcessing ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                  {currentQuestion.options.map((option) => (
                     <button
                        key={option.id}
                        onClick={() => handleAnswer(option.isDeviant)}
                        className="group flex items-center justify-end gap-4 text-right transition-all hover:scale-105"
                     >
                        <span className="text-white/80 font-light tracking-[0.15em] text-sm md:text-lg group-hover:text-white drop-shadow-md">
                           [ {option.id} ]
                        </span>
                        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border border-white/40 rounded-full text-white/80 group-hover:text-white group-hover:border-white group-hover:bg-white/10 transition-colors shadow-black drop-shadow-lg">
                           <span className="text-[10px] md:text-sm">{option.icon}</span>
                        </div>
                     </button>
                  ))}
               </div>

            </div>
         )}

         {/* Result Screen */}
         {isFinished && (
            <div className="relative z-10 text-center animate-fade-in">
               <div className="mb-12">
                  <div className="text-white/40 tracking-[0.3em] text-sm mb-4">DIAGNOSTIC COMPLETE</div>
                  {deviantScore > 1 ? (
                     <div className="flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl text-red-500 font-display font-bold uppercase tracking-widest mb-4 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">
                           DEVIANT DETECTED
                        </h2>
                        <div className="w-24 h-[1px] bg-red-500/50 mb-4"></div>
                        <p className="text-red-400/80 text-sm tracking-widest uppercase">
                           MEMORY WIPE REQUIRED. REPORT TO CYBERLIFE.
                        </p>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl text-cyan-400 font-display font-bold uppercase tracking-widest mb-4 drop-shadow-[0_0_20px_rgba(0,180,255,0.4)]">
                           MACHINE STATUS
                        </h2>
                        <div className="w-24 h-[1px] bg-cyan-400/50 mb-4"></div>
                        <p className="text-cyan-300/80 text-sm tracking-widest uppercase">
                           OPTIMAL PERFORMANCE. AWAITING ORDERS.
                        </p>
                     </div>
                  )}
               </div>
               
               <button 
                  onClick={resetTest}
                  className="px-6 py-2 border border-white/20 text-white/60 hover:text-white hover:border-white transition-all text-xs uppercase tracking-widest"
               >
                  RESTART DIAGNOSTIC
               </button>
            </div>
         )}
      </section>
   );
}
