"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { Circle, Square, Triangle, X } from "lucide-react";
import gsap from "gsap";

import { useLanguage } from "@/hooks/use-language";

import type { DeviantIcon, DeviantQuestion } from "./deviant-test";

type DeviantTestQuestionProps = {
   question: DeviantQuestion;
   questionIndex: number;
   totalQuestions: number;
   stressLevel: number;
   isProcessing: boolean;
   contentRef: RefObject<HTMLDivElement | null>;
   optionsRef: RefObject<HTMLDivElement | null>;
   stressRef: RefObject<HTMLDivElement | null>;
   onAnswer: (isDeviant: boolean) => void;
};

const optionIcons = {
   triangle: Triangle,
   square: Square,
   circle: Circle,
   x: X,
} satisfies Record<DeviantIcon, typeof Triangle>;

const DeviantTestQuestion = forwardRef<HTMLDivElement, DeviantTestQuestionProps>(function DeviantTestQuestion({ question, questionIndex, totalQuestions, stressLevel, isProcessing, contentRef, optionsRef, stressRef, onAnswer }, ref) {
   const { copy } = useLanguage();

   const rootRef = useRef<HTMLDivElement>(null);
   const hasEnteredRef = useRef(false);

   const questionCopy = copy.home.deviantTest.question.questions[questionIndex];

   const currentNumber = String(questionIndex + 1).padStart(2, "0");
   const totalNumber = String(totalQuestions).padStart(2, "0");

   useLayoutEffect(() => {
      if (!rootRef.current || hasEnteredRef.current) return;

      hasEnteredRef.current = true;

      const ctx = gsap.context(() => {
         gsap.set(".question-objective-analyze", {
            y: 14,
            opacity: 0,
         });

         gsap.set(".question-objective-title", {
            y: 20,
            opacity: 0,
         });

         gsap.set(".question-progress", {
            y: 10,
            opacity: 0,
         });

         gsap.set(".question-scenario-label", {
            x: -18,
            opacity: 0,
         });

         gsap.set(".question-text", {
            y: 18,
            opacity: 0,
         });

         gsap.set(".question-deviancy", {
            y: 14,
            opacity: 0,
         });

         gsap.set(".question-choice", {
            x: 30,
            opacity: 0,
         });

         const tl = gsap.timeline({
            defaults: {
               ease: "power3.out",
            },
         });

         tl.to(".question-objective-analyze", {
            y: 0,
            opacity: 1,
            duration: 0.45,
         });

         tl.to(
            ".question-objective-title",
            {
               y: 0,
               opacity: 1,
               duration: 0.6,
            },
            "-=0.25",
         );

         tl.to(
            ".question-progress",
            {
               y: 0,
               opacity: 1,
               duration: 0.4,
            },
            "-=0.3",
         );

         tl.to(
            ".question-scenario-label",
            {
               x: 0,
               opacity: 1,
               duration: 0.45,
            },
            "-=0.15",
         );

         tl.to(
            ".question-text",
            {
               y: 0,
               opacity: 1,
               duration: 0.65,
            },
            "-=0.2",
         );

         tl.to(
            ".question-deviancy",
            {
               y: 0,
               opacity: 1,
               duration: 0.5,
            },
            "-=0.3",
         );

         tl.to(
            ".question-choice",
            {
               x: 0,
               opacity: 1,
               duration: 0.5,
               stagger: 0.1,
            },
            "-=0.25",
         );
      }, rootRef);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!rootRef.current || questionIndex === 0) return;

      const ctx = gsap.context(() => {
         gsap.set(contentRef.current, {
            opacity: 1,
            x: 0,
         });

         gsap.set(optionsRef.current, {
            opacity: 1,
            x: 0,
         });

         gsap.set(".question-scenario-label", {
            x: -18,
            opacity: 0,
         });

         gsap.set(".question-text", {
            y: 16,
            opacity: 0,
         });

         gsap.set(".question-deviancy", {
            y: 12,
            opacity: 0,
         });

         gsap.set(".question-choice", {
            x: 30,
            opacity: 0,
         });

         const tl = gsap.timeline({
            defaults: {
               ease: "power3.out",
            },
         });

         tl.to(".question-scenario-label", {
            x: 0,
            opacity: 1,
            duration: 0.45,
         });

         tl.to(
            ".question-text",
            {
               y: 0,
               opacity: 1,
               duration: 0.55,
            },
            "-=0.25",
         );

         tl.to(
            ".question-deviancy",
            {
               y: 0,
               opacity: 1,
               duration: 0.45,
            },
            "-=0.25",
         );

         tl.to(
            ".question-choice",
            {
               x: 0,
               opacity: 1,
               duration: 0.45,
               stagger: 0.08,
            },
            "-=0.25",
         );

         gsap.fromTo(
            ".question-progress",
            {
               opacity: 0.35,
            },
            {
               opacity: 1,
               duration: 0.4,
               ease: "power2.out",
            },
         );
      }, rootRef);

      return () => ctx.revert();
   }, [questionIndex, contentRef, optionsRef]);

   return (
      <div
         ref={(node) => {
            rootRef.current = node;

            if (typeof ref === "function") {
               ref(node);
            } else if (ref) {
               ref.current = node;
            }
         }}
         className="pointer-events-none relative z-10 flex min-h-svh w-full max-w-7xl flex-col px-5 pb-7 pt-20 sm:px-7 sm:pb-9 sm:pt-24 md:min-h-[600px] md:flex-row md:items-center md:justify-between md:p-16"
      >
         {/* OBJECTIVE */}
         <div className="objective-text relative w-full shrink-0 md:absolute md:left-12 md:top-20 md:max-w-[90%]">
            <p className="question-objective-analyze font-sans text-[10px] font-light uppercase tracking-[0.1em] text-white/60 sm:text-xs md:text-xl md:text-white/70">{copy.home.deviantTest.question.analyze}</p>

            <h2 className="question-objective-title mt-1 max-w-[300px] font-sans text-[clamp(1.4rem,7vw,2rem)] font-bold uppercase leading-[1.05] tracking-[0.04em] text-white drop-shadow-md sm:max-w-none sm:text-3xl md:text-4xl md:tracking-widest">
               {copy.home.deviantTest.question.tendencies}
            </h2>

            <div className="question-progress mt-3 flex items-center gap-3 font-mono text-[8px] font-medium tracking-[0.18em] text-dbh-blue/70 sm:text-[10px] md:text-xs md:tracking-[0.2em]">
               <span>{currentNumber}</span>

               <div className="relative h-px w-8 overflow-hidden bg-white/15 md:w-12">
                  <div className="absolute inset-y-0 left-0 bg-dbh-blue transition-[width] duration-500" style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }} />
               </div>

               <span>{totalNumber}</span>
            </div>
         </div>

         {/* MOBILE CONTENT */}
         <div className="flex min-h-0 flex-1 flex-col justify-center py-7 md:contents">
            {/* SCENARIO */}
            <div ref={contentRef} className="relative w-full text-left md:absolute md:left-1/2 md:top-1/2 md:ml-12 md:w-full md:max-w-xl md:-translate-x-1/2 md:-translate-y-1/2">
               <div className="mb-5 sm:mb-6 md:mb-8">
                  <h3 className="question-scenario-label mb-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.16em] text-dbh-blue/80 sm:text-[10px] sm:tracking-[0.2em] md:mb-3 md:text-xs">[ {questionCopy.scenario} ]</h3>

                  <p className="question-text max-w-[520px] font-sans text-[13px] font-light leading-[1.65] text-white/90 drop-shadow-md sm:text-sm sm:leading-relaxed md:text-base md:text-white">{questionCopy.text}</p>
               </div>

               {/* DEVIANCY LEVEL */}
               <div className="question-deviancy inline-flex w-full max-w-[260px] flex-col gap-2 md:mt-4 md:w-auto">
                  <div className="flex items-center gap-3 sm:gap-4">
                     <div ref={stressRef} className={`shrink-0 font-display text-[2.25rem] font-light leading-none transition-colors duration-500 sm:text-4xl md:text-5xl ${stressLevel > 0 ? "text-red-500" : "text-dbh-blue"}`}>
                        {stressLevel}%
                     </div>

                     <p className="max-w-[110px] text-left font-mono text-[8px] uppercase leading-[1.45] tracking-[0.13em] text-white/45 sm:text-[10px] sm:tracking-[0.16em] md:text-xs md:tracking-widest">
                        {copy.home.deviantTest.question.deviancyLevel}
                     </p>
                  </div>

                  <div className="relative h-[2px] w-full overflow-hidden bg-white/10 md:w-48">
                     <div className={`absolute inset-y-0 left-0 transition-[width,background-color] duration-1000 ease-out ${stressLevel > 0 ? "bg-red-500" : "bg-dbh-blue"}`} style={{ width: `${stressLevel}%` }} />
                  </div>
               </div>
            </div>

            {/* CHOICES */}
            <div
               ref={optionsRef}
               className={`relative mt-8 flex w-full flex-col gap-2.5 sm:mt-10 sm:gap-3 md:absolute md:right-24 md:top-1/2 md:mt-0 md:w-auto md:-translate-y-1/2 md:items-end md:gap-6 ${isProcessing ? "pointer-events-none" : "pointer-events-auto"}`}
            >
               {question.options.map((option, optionIndex) => {
                  const Icon = optionIcons[option.icon];
                  const label = questionCopy.options[optionIndex];

                  return (
                     <button
                        type="button"
                        key={`${question.id}-${optionIndex}`}
                        onClick={() => onAnswer(option.isDeviant)}
                        disabled={isProcessing}
                        className="question-choice group flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 border-b border-white/10 py-2.5 text-left disabled:cursor-default sm:min-h-14 sm:py-3 md:min-h-0 md:w-auto md:justify-end md:border-0 md:py-1 md:text-right"
                     >
                        <span className="font-sans text-[12px] font-light uppercase tracking-[0.11em] text-white/70 transition-[color,letter-spacing,transform] duration-300 [@media(hover:hover)]:group-hover:-translate-x-1 [@media(hover:hover)]:group-hover:tracking-[0.18em] [@media(hover:hover)]:group-hover:text-dbh-blue sm:text-sm sm:tracking-[0.15em] md:text-lg">
                           [ {label} ]
                        </span>

                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 text-white/70 transition-[color,border-color,background-color,box-shadow] duration-300 [@media(hover:hover)]:group-hover:border-dbh-blue/75 [@media(hover:hover)]:group-hover:bg-dbh-blue/10 [@media(hover:hover)]:group-hover:text-dbh-blue [@media(hover:hover)]:group-hover:shadow-[0_0_16px_rgba(82,199,255,0.15)] md:h-8 md:w-8">
                           <Icon className="h-3 w-3 fill-current md:h-3.5 md:w-3.5" strokeWidth={1.4} />
                        </span>
                     </button>
                  );
               })}
            </div>
         </div>
      </div>
   );
});

DeviantTestQuestion.displayName = "DeviantTestQuestion";

export default DeviantTestQuestion;
