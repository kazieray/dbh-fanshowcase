"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

import { useLanguage } from "@/hooks/use-language";

import DeviantTestStart from "./deviant-test-start";
import DeviantTestQuestion from "./deviant-test-question";
import DeviantTestResult from "./deviant-test-result";

export type DeviantIcon = "triangle" | "square" | "circle" | "x";

export type DeviantOption = {
   icon: DeviantIcon;
   isDeviant: boolean;
};

export type DeviantQuestion = {
   id: number;
   options: DeviantOption[];
};

const questions: DeviantQuestion[] = [
   {
      id: 1,
      options: [
         { icon: "triangle", isDeviant: false },
         { icon: "square", isDeviant: true },
      ],
   },
   {
      id: 2,
      options: [
         { icon: "circle", isDeviant: false },
         { icon: "x", isDeviant: true },
      ],
   },
   {
      id: 3,
      options: [
         { icon: "triangle", isDeviant: false },
         { icon: "square", isDeviant: true },
      ],
   },
];

export default function DeviantTest() {
   const { copy } = useLanguage();

   const containerRef = useRef<HTMLElement>(null);
   const uiRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   const optionsRef = useRef<HTMLDivElement>(null);
   const stressRef = useRef<HTMLDivElement>(null);

   const [started, setStarted] = useState(false);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [deviantScore, setDeviantScore] = useState(0);
   const [isFinished, setIsFinished] = useState(false);
   const [showWarning, setShowWarning] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);

   const currentQuestion = questions[currentQuestionIndex] ?? questions[0];
   const stressLevel = Math.round((deviantScore / questions.length) * 100);

   const handleStart = () => {
      setStarted(true);
   };

   const proceedToNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
         const tl = gsap.timeline({
            onComplete: () => {
               setCurrentQuestionIndex((prev) => prev + 1);
               setIsProcessing(false);
            },
         });

         if (contentRef.current) {
            tl.to(contentRef.current, {
               opacity: 0,
               x: -25,
               duration: 0.3,
               ease: "power2.in",
            });
         }

         if (optionsRef.current) {
            tl.to(
               optionsRef.current,
               {
                  opacity: 0,
                  x: 35,
                  duration: 0.3,
                  ease: "power2.in",
               },
               "<",
            );
         }

         return;
      }

      if (!uiRef.current) {
         setIsFinished(true);
         setIsProcessing(false);
         return;
      }

      gsap.to(uiRef.current, {
         opacity: 0,
         y: -20,
         duration: 0.7,
         ease: "power2.inOut",
         onComplete: () => {
            setIsFinished(true);
            setIsProcessing(false);
         },
      });
   };

   const handleAnswer = (isDeviant: boolean) => {
      if (isProcessing) return;

      setIsProcessing(true);

      if (isDeviant) {
         setDeviantScore((prev) => prev + 1);
         setShowWarning(true);

         if (stressRef.current) {
            gsap.fromTo(
               stressRef.current,
               {
                  scale: 1.5,
                  color: "#ff0000",
                  opacity: 1,
               },
               {
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.out",
               },
            );
         }

         window.setTimeout(() => {
            setShowWarning(false);
            proceedToNext();
         }, 2000);

         return;
      }

      proceedToNext();
   };

   const resetTest = () => {
      if (uiRef.current) {
         gsap.set(uiRef.current, {
            opacity: 1,
            y: 0,
         });
      }

      if (contentRef.current) {
         gsap.set(contentRef.current, {
            opacity: 1,
            x: 0,
         });
      }

      if (optionsRef.current) {
         gsap.set(optionsRef.current, {
            opacity: 1,
            x: 0,
         });
      }

      setStarted(false);
      setCurrentQuestionIndex(0);
      setDeviantScore(0);
      setIsFinished(false);
      setShowWarning(false);
      setIsProcessing(false);
   };

   return (
      <section ref={containerRef} className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-transparent font-mono">
         <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#05080d]/78 via-[#05080d]/70 to-[#05080d]/85" />

         <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute left-0 top-[20%] h-px w-full bg-white/5" />
            <div className="absolute left-0 top-[75%] h-px w-full bg-white/5" />
            <div className="absolute left-[30%] top-0 hidden h-full w-px bg-white/5 md:block" />
         </div>

         <div className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-red-900/40 px-5 backdrop-blur-sm transition-opacity duration-300 sm:px-8 ${showWarning ? "opacity-100" : "opacity-0"}`}>
            <div className="flex w-full max-w-[440px] flex-col items-center border border-red-500 bg-red-950/80 px-5 py-7 shadow-[0_0_50px_rgba(255,0,0,0.5)] sm:p-8 md:max-w-none md:w-auto">
               <span className="mb-3 text-4xl text-red-500 sm:mb-4 sm:text-5xl">⚠</span>

               <h2 className="mb-2 animate-pulse text-center font-display text-[clamp(1.75rem,9vw,3rem)] uppercase leading-none tracking-[0.08em] text-red-500 sm:tracking-widest md:text-5xl">{copy.home.deviantTest.warning.title}</h2>

               <p className="max-w-[300px] text-center font-mono text-[9px] uppercase leading-[1.7] tracking-[0.14em] text-red-400 sm:max-w-[420px] sm:text-xs sm:tracking-[0.18em] md:max-w-none md:text-lg md:tracking-[0.2em]">
                  {copy.home.deviantTest.warning.description}
               </p>

               <div className="mt-5 h-[2px] w-full overflow-hidden bg-red-500/50 sm:mt-6">
                  <div className="h-full w-full animate-[pulse_0.5s_ease-in-out_infinite] bg-red-500" />
               </div>
            </div>
         </div>

         {!started && !isFinished && <DeviantTestStart onStart={handleStart} />}

         {started && !isFinished && (
            <DeviantTestQuestion
               ref={uiRef}
               question={currentQuestion}
               questionIndex={currentQuestionIndex}
               totalQuestions={questions.length}
               stressLevel={stressLevel}
               isProcessing={isProcessing}
               contentRef={contentRef}
               optionsRef={optionsRef}
               stressRef={stressRef}
               onAnswer={handleAnswer}
            />
         )}

         {isFinished && <DeviantTestResult deviantScore={deviantScore} onRestart={resetTest} />}
      </section>
   );
}
