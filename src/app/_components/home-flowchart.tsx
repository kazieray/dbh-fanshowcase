"use client";

import { useLayoutEffect, useRef, useState, type PointerEvent, type WheelEvent } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/hooks/use-language";
import FlowchartBoard from "./flowchart-board";

type Chapter = {
   title: string;
   character: string;
   image: string;
   description?: { en: string; id: string };
};

const chapters: Chapter[] = [
   { title: "The Hostage", character: "Connor", image: "/images/Connor.jpeg" },
   { title: "Opening", character: "Connor", image: "/images/bg-news.jpg" },
   { title: "Shades of Color", character: "Markus", image: "/images/Marcus.jpeg" },
   { title: "A New Home", character: "Kara", image: "/images/Kara.jpeg" },
   { title: "The Painter", character: "Markus", image: "/images/Snowup.jpeg" },
   { title: "Partners", character: "Connor", image: "/images/Hank&Connor.jpeg" },
   {
      title: "The Connor Lineup",
      character: "Connor & Hank",
      image: "/images/Wow-keren.jpeg",
      description: {
         en: "Hank faces a row of Connor models at CyberLife, where every familiar face raises a question of identity, loyalty, and control.",
         id: "Hank berhadapan dengan deretan model Connor di CyberLife. Wajah yang sama menimbulkan pertanyaan tentang identitas, kesetiaan, dan kendali.",
      },
   },
   { title: "Broken", character: "Markus", image: "/images/Fall.jpeg" },
   { title: "The Interrogation", character: "Connor", image: "/images/Sanningthetruth.jpeg" },
];

gsap.registerPlugin(ScrollTrigger);

export default function HomeFlowchart() {
   const rootRef = useRef<HTMLDivElement>(null);
   const diagramRef = useRef<HTMLElement>(null);
   const chapterSectionRef = useRef<HTMLElement>(null);
   const stageRef = useRef<HTMLDivElement>(null);
   const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
   const connectorRefs = useRef<(SVGPathElement | null)[]>([]);
   const previousIndexRef = useRef(0);
   const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
   const suppressClickRef = useRef(false);
   const wheelDeltaRef = useRef(0);
   const wheelLockedRef = useRef(false);
   const wheelResetRef = useRef<gsap.core.Tween | null>(null);
   const previewCloseTimerRef = useRef<number | null>(null);
   const [activeIndex, setActiveIndex] = useState(0);
   const [showPreview, setShowPreview] = useState(false);
   const [isPreviewClosing, setIsPreviewClosing] = useState(false);
   const { copy, language } = useLanguage();
   const activeChapter = chapters[activeIndex];

   const selectChapter = (index: number) => {
      setActiveIndex(index);
      setShowPreview(false);
   };

   const handleChapterWheel = (event: WheelEvent<HTMLDivElement>) => {
      if (window.innerWidth < 768 || showPreview || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      event.preventDefault();
      wheelDeltaRef.current += event.deltaX;

      if (!wheelLockedRef.current && Math.abs(wheelDeltaRef.current) >= 48) {
         selectChapter(Math.max(0, Math.min(chapters.length - 1, activeIndex + Math.sign(wheelDeltaRef.current))));
         wheelDeltaRef.current = 0;
         wheelLockedRef.current = true;
      }

      wheelResetRef.current?.kill();
      wheelResetRef.current = gsap.delayedCall(0.2, () => {
         wheelDeltaRef.current = 0;
         wheelLockedRef.current = false;
      });
   };

   const handleChapterPointerDown = (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "touch" || !event.isPrimary || showPreview) return;
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      suppressClickRef.current = false;
   };

   const handleChapterPointerUp = (event: PointerEvent<HTMLDivElement>) => {
      const start = pointerStartRef.current;
      pointerStartRef.current = null;
      if (!start || event.pointerType !== "touch") return;

      const distanceX = event.clientX - start.x;
      const distanceY = event.clientY - start.y;
      if (Math.abs(distanceX) < 48 || Math.abs(distanceX) <= Math.abs(distanceY) * 1.2) return;

      suppressClickRef.current = true;
      selectChapter(Math.max(0, Math.min(chapters.length - 1, activeIndex + (distanceX < 0 ? 1 : -1))));
   };

   const handleChapterClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!suppressClickRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
   };

   const openChapterPreview = (index: number) => {
      if (previewCloseTimerRef.current !== null) window.clearTimeout(previewCloseTimerRef.current);
      previewCloseTimerRef.current = null;
      setIsPreviewClosing(false);
      setActiveIndex(index);
      setShowPreview(true);
   };

   const closeChapterPreview = () => {
      if (previewCloseTimerRef.current !== null) return;

      setIsPreviewClosing(true);
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 900;
      previewCloseTimerRef.current = window.setTimeout(() => {
         setShowPreview(false);
         setIsPreviewClosing(false);
         previewCloseTimerRef.current = null;
      }, duration);
   };

   useLayoutEffect(() => () => {
      wheelResetRef.current?.kill();
      if (previewCloseTimerRef.current !== null) window.clearTimeout(previewCloseTimerRef.current);
   }, []);

   useLayoutEffect(() => {
      const root = rootRef.current;
      const diagramSection = diagramRef.current;
      const chapterSection = chapterSectionRef.current;
      if (!root || !diagramSection || !chapterSection) return;

      const ctx = gsap.context(() => {
         gsap.set(".diagram-heading", { y: 35, opacity: 0 });
         gsap.set(".diagram-panel", { y: 35, opacity: 0 });
         gsap.set(".chapter-heading", { y: 35, opacity: 0 });
         gsap.set(".flowchart-node", { opacity: 0, filter: "blur(6px)" });
         gsap.set(".chapter-carousel-stage", { y: 50, opacity: 0 });
         gsap.set(".chapter-branch", { strokeDasharray: 1800, strokeDashoffset: 1800 });
         gsap.set(".chapter-card", { opacity: 0, scale: 0.94 });

         gsap.timeline({ scrollTrigger: { trigger: diagramSection, start: "top 68%", toggleActions: "play reverse play reverse" } })
            .to(".diagram-heading", { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" })
            .to(".diagram-panel", { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.3")
            .to(".flowchart-node", { opacity: 1, filter: "blur(0px)", duration: 0.45, stagger: 0.055, ease: "power2.out" }, "-=0.45");

         gsap.timeline({ scrollTrigger: { trigger: chapterSection, start: "top 68%", toggleActions: "play reverse play reverse" } })
            .to(".chapter-heading", { y: 0, opacity: 1, duration: 0.55, ease: "power4.out" })
            .to(".chapter-carousel-stage", { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.2")
            .to(".chapter-card", { opacity: 1, scale: 1, duration: 0.36, stagger: 0.05, ease: "power2.out" }, "-=0.28")
            .to(".chapter-branch", { strokeDashoffset: 0, duration: 1, stagger: 0.08, ease: "power2.inOut" }, "<");
      }, root);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!chapterSectionRef.current) return;

      const root = chapterSectionRef.current;
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
                  ".chapter-header",
                  {
                     y: -18,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0,
               )
               .to(
                  ".chapter-heading",
                  {
                     y: -22,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0.04,
               )
               .to(
                  ".chapter-carousel-stage",
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
                  ".chapter-header",
                  {
                     y: -22,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0,
               )
               .to(
                  ".chapter-heading",
                  {
                     y: -30,
                     opacity: 0,
                     ease: "none",
                     immediateRender: false,
                  },
                  0.04,
               )
               .to(
                  ".chapter-carousel-stage",
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

   useLayoutEffect(() => {
      const stage = stageRef.current;
      if (!stage) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
         gsap.set(stage, { y: 0, autoAlpha: 1 });
         return;
      }

      const tween = gsap.fromTo(stage, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out", overwrite: "auto" });
      return () => {
         tween.kill();
      };
   }, []);

   useLayoutEffect(() => {
      const root = rootRef.current;
      if (!root) return;

      const didChange = previousIndexRef.current !== activeIndex;
      previousIndexRef.current = activeIndex;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = cardRefs.current;
      const cardHalfWidth = window.innerWidth < 768 ? "min(33vw, 250px)" : "min(18.5vw, 250px)";

      const updateCardPositions = (immediate = false) => {
         const step = window.innerWidth < 768 ? window.innerWidth * 0.68 : Math.min(window.innerWidth * 0.4, 560);

         cards.forEach((card, index) => {
            if (!card) return;

            const offset = index - activeIndex;
            const distance = Math.abs(offset);
            const targets: gsap.TweenVars = {
               left: `calc(50% + ${offset * step}px - ${cardHalfWidth})`,
               y: offset === 0 ? 0 : offset > 0 && index % 2 === 1 ? 32 : -32,
               yPercent: offset === 0 ? -50 : 0,
               scale: offset === 0 ? 1 : 0.9,
               zIndex: 20 - distance,
            };

            if (didChange) {
               targets.autoAlpha = distance > 2 ? 0 : distance === 2 ? 0.36 : distance === 1 ? 0.68 : 1;
            }

            if (immediate || !didChange || reducedMotion) {
               gsap.set(card, targets);
            } else {
               gsap.to(card, {
                  ...targets,
                  duration: 0.95,
                  delay: Math.min(distance * 0.035, 0.12),
                  ease: "power3.inOut",
                  overwrite: "auto",
               });
            }
         });
      };

      const handleResize = () => updateCardPositions(true);
      updateCardPositions(didChange && reducedMotion);
      window.addEventListener("resize", handleResize);

      if (didChange && !reducedMotion) {
         const activeCard = cardRefs.current[activeIndex];
         const image = activeCard?.querySelector(".chapter-artwork");
         const ribbon = activeCard?.querySelector(".chapter-ribbon");

         if (image && ribbon) {
            gsap.timeline({ defaults: { overwrite: "auto" } })
               .fromTo(image, { scale: 1.08, filter: "grayscale(0.8) brightness(0.75)" }, { scale: 1, filter: "grayscale(0) brightness(1)", duration: 0.85, ease: "power3.out" }, 0)
               .fromTo(ribbon, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.75, ease: "power3.inOut" }, 0.08);
         }
      }

      return () => {
         window.removeEventListener("resize", handleResize);
         gsap.killTweensOf(cards.filter(Boolean));
      };
   }, [activeIndex]);

   useLayoutEffect(() => {
      const stage = stageRef.current;
      if (!stage) return;

      const cards = cardRefs.current;
      const connectors = connectorRefs.current;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const updateConnectors = () => {
         const stageRect = stage.getBoundingClientRect();
         const activeCard = cards[activeIndex];
         if (!activeCard) return;

         const activeRect = activeCard.getBoundingClientRect();
         const activeLeft = activeRect.left - stageRect.left;
         const activeRight = activeRect.right - stageRect.left;
         const activeY = activeRect.top - stageRect.top + activeRect.height * 0.78;

         cards.forEach((card, index) => {
            const connector = connectors[index];
            if (!card || !connector) return;

            const distance = Math.abs(index - activeIndex);
            if (distance !== 1) {
               connector.setAttribute("d", "");
               return;
            }

            const cardRect = card.getBoundingClientRect();
            const left = cardRect.left - stageRect.left;
            const right = cardRect.right - stageRect.left;
            const startX = index > activeIndex ? activeRight : activeLeft;
            const endX = index > activeIndex ? left : right;
            const endY = cardRect.top - stageRect.top + cardRect.height * 0.78;
            const middle = ((startX + endX) / 2 / stageRect.width) * 100;
            const startPercentX = (startX / stageRect.width) * 100;
            const startPercentY = (activeY / stageRect.height) * 100;
            const endPercentX = (endX / stageRect.width) * 100;
            const endPercentY = (endY / stageRect.height) * 100;

            connector.setAttribute("d", `M ${startPercentX} ${startPercentY} H ${middle} V ${endPercentY} H ${endPercentX}`);
            connector.style.opacity = "0.72";
         });
      };

      updateConnectors();
      const observer = new ResizeObserver(updateConnectors);
      observer.observe(stage);

      if (!reducedMotion) gsap.ticker.add(updateConnectors);
      if (!reducedMotion) {
         gsap.fromTo(connectors.filter(Boolean), { strokeDasharray: "1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, stagger: 0.06, ease: "power2.out" });
      }
      const tickerStop = gsap.delayedCall(1.1, () => gsap.ticker.remove(updateConnectors));

      return () => {
         observer.disconnect();
         gsap.ticker.remove(updateConnectors);
         tickerStop.kill();
      };
   }, [activeIndex]);

   return (
      <div
         ref={rootRef}
         tabIndex={0}
         aria-label={copy.home.flowchart.title}
         onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
               event.preventDefault();
               selectChapter(Math.max(0, activeIndex - 1));
            } else if (event.key === "ArrowRight") {
               event.preventDefault();
               selectChapter(Math.min(chapters.length - 1, activeIndex + 1));
            } else if (event.key === "Escape") {
               closeChapterPreview();
            }
         }}
         className="relative z-10 bg-transparent text-dbh-white outline-none focus-visible:outline-none"
      >
         <section ref={diagramRef} id="flowchart-section" aria-label={copy.home.flowchart.statistics} className="relative min-h-svh scroll-mt-0 overflow-hidden">
            <div className="mx-auto flex min-h-svh w-full max-w-400 flex-col px-5 pb-8 pt-28 sm:px-8 md:px-12 md:pb-10 md:pt-29.5 lg:px-16">
               <header className="diagram-heading mb-4 flex shrink-0 flex-col items-center text-center">
                  <h2 className="font-display text-[clamp(2.2rem,7vw,3.5rem)] font-bold uppercase leading-none text-white">STATISTICS</h2>
                  <p className="mt-3 max-w-[56ch] text-pretty text-[12px] leading-5 text-white/70 sm:text-sm sm:leading-6">{copy.home.flowchart.statisticsDescription}</p>
               </header>
               <div className="diagram-panel flex min-h-96 flex-1 items-center overflow-hidden md:min-h-[min(58svh,34rem)]">
                  <FlowchartBoard />
               </div>
            </div>
         </section>

         <section ref={chapterSectionRef} id="chapter-section" aria-label={copy.home.flowchart.title} className="relative z-10 min-h-svh scroll-mt-0 overflow-hidden">
            <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-400 flex-col px-5 pb-16 pt-20 sm:px-8 md:px-12 md:pb-20 md:pt-24 lg:px-16">
            <header className="chapter-header mb-2 flex shrink-0 flex-col items-center text-center">
               <div className="chapter-heading">
                  <h2 className="font-display text-[clamp(2.2rem,7vw,3.5rem)] font-bold uppercase leading-none text-white">{copy.home.flowchart.title}</h2>
                  <p className="mt-3 max-w-[56ch] text-pretty text-[12px] leading-5 text-white/70 sm:text-sm sm:leading-6">{copy.home.flowchart.chaptersDescription}</p>
               </div>
            </header>

            <div
               ref={stageRef}
               onWheel={handleChapterWheel}
               onPointerDown={handleChapterPointerDown}
               onPointerUp={handleChapterPointerUp}
               onPointerCancel={() => { pointerStartRef.current = null; }}
               onClickCapture={handleChapterClickCapture}
               className="chapter-carousel-stage relative -mx-5 mt-3 h-[min(68svh,500px)] flex-none touch-pan-y overflow-hidden sm:-mx-8 md:-mx-12 md:mt-4 md:h-[min(72svh,600px)] lg:-mx-16"
            >
               <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {chapters.map((chapter, index) => (
                     <path key={chapter.title} ref={(element) => { connectorRefs.current[index] = element; }} className="chapter-branch" d="" pathLength={1} fill="none" stroke="#ffffff" strokeOpacity="0.76" strokeWidth="0.18" strokeLinecap="square" strokeLinejoin="miter" />
                  ))}
               </svg>

               {chapters.map((chapter, index) => {
                  const isActive = index === activeIndex;
                  const distance = Math.abs(index - activeIndex);

                  return (
                     <button
                        key={chapter.title}
                        ref={(element) => { cardRefs.current[index] = element; }}
                        type="button"
                        disabled={distance > 1}
                        aria-hidden={distance > 1}
                        aria-pressed={isActive}
                        aria-label={`${chapter.title}, ${chapter.character}`}
                        onClick={() => isActive ? openChapterPreview(index) : selectChapter(index)}
                        style={{ pointerEvents: distance <= 1 ? "auto" : "none" }}
                        className={`chapter-card group absolute left-0 top-[38%] w-[min(66vw,500px)] text-left transition-[filter,translate] duration-500 [@media(hover:hover)]:hover:-translate-y-1 md:w-[min(37vw,500px)] ${distance <= 1 ? "cursor-pointer" : "cursor-default"}`}
                     >
                        <span className="chapter-card-content block">
                        <span className="chapter-artwork relative block aspect-[2.05/1] overflow-hidden border border-white/50 bg-[#c5d1d6] transition-[border-color] duration-500 group-hover:border-white [clip-path:polygon(0_0,82%_0,100%_100%,10%_100%)]">
                           <Image
                              src={chapter.image}
                              alt={`${chapter.title} chapter scene featuring ${chapter.character}`}
                              fill
                              sizes="(max-width: 767px) 66vw, 37vw"
                              loading={distance <= 1 ? "eager" : "lazy"}
                              unoptimized
                              className={`h-full w-full object-cover transition-[filter,transform] duration-700 [@media(hover:hover)]:group-hover:scale-[1.04] ${isActive ? "saturate-100" : "grayscale-[0.7] brightness-90 group-hover:grayscale-[0.25]"}`}
                           />
                           <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#07131b]/70 via-transparent to-white/10" />
                           <span className="pointer-events-none absolute right-[16%] top-0 h-full w-[18%] bg-white/10 [clip-path:polygon(55%_0,100%_0,45%_100%,0_100%)]" />
                           <span className="absolute bottom-3 left-[9%] font-mono text-[7px] uppercase tracking-[0.18em] text-white/75 sm:text-[8px]">Detroit · 2038</span>
                        </span>
                        <span className={`chapter-ribbon relative -mt-1 flex min-h-9 w-[72%] items-center justify-between gap-3 px-3 font-sans text-[9px] font-semibold uppercase tracking-widest shadow-[0_8px_22px_rgba(0,0,0,0.18)] sm:min-h-10 sm:px-4 sm:text-[10px] ${isActive ? "bg-white text-[#101318]" : "bg-white/20 text-white"}`}>
                           <span className="truncate">{chapter.title}</span>
                           <span className="shrink-0 font-mono text-[8px] text-white/70">{String(index + 1).padStart(2, "0")}</span>
                        </span>
                        <span className="mt-2 flex w-[72%] items-center justify-between px-2 font-mono text-[7px] uppercase tracking-[0.08em] text-white/55 sm:text-[8px]">
                           <span>{chapter.character}</span>
                           <span>Detroit, Michigan</span>
                        </span>
                        </span>
                     </button>
                  );
               })}
            </div>

         </div>

         {showPreview && (
            <div onClick={(event) => { if (event.target === event.currentTarget) closeChapterPreview(); }} className={`absolute inset-0 z-40 flex items-center justify-center bg-transparent px-4 py-6 backdrop-blur-[2px] sm:p-8 ${isPreviewClosing ? "news-modal-closing" : ""}`}>
               <div role="dialog" aria-modal="true" aria-label={`${activeChapter.title} chapter preview`} className="chapter-preview-panel news-modal-window relative grid max-h-[calc(100svh-3rem)] w-full max-w-262.5 items-start gap-5 overflow-y-auto border border-white/20 bg-[#07111b]/90 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.6)] sm:max-h-[calc(100svh-4rem)] sm:gap-7 sm:p-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10 lg:p-9">
                  <button type="button" onClick={closeChapterPreview} aria-label={copy.home.flowchart.close} title={copy.home.flowchart.close} className="nav-glass-control absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full">
                     <X className="h-5 w-5" />
                  </button>
                  <div className="relative aspect-[1.8/1] overflow-hidden [clip-path:polygon(0_0,92%_0,100%_100%,8%_100%)]">
                     <Image src={activeChapter.image} alt={`${activeChapter.title} chapter scene`} fill sizes="(max-width: 639px) 90vw, 55vw" unoptimized className="object-cover" />
                  </div>
                  <div className="min-w-0 pr-5 sm:pr-8">
                     <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">{String(activeIndex + 1).padStart(2, "0")} / {activeChapter.character} / DETROIT</p>
                     <h3 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium uppercase leading-[0.9] text-white">{activeChapter.title}</h3>
                     <p className="mt-5 max-w-[48ch] text-[13px] leading-6 text-white/65 sm:text-sm sm:leading-7">{activeChapter.description?.[language] ?? copy.home.flowchart.preview}</p>
                  </div>
               </div>
            </div>
         )}

         </section>
      </div>
   );
}
