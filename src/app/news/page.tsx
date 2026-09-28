"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Eye, MoveRight, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";

import Navbar from "@/components/navigation/navbar";
import { stories } from "@/data/news";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/hooks/use-language";

const categoryLabels: Record<string, { en: string; id: string }> = {
   Rilis: { en: "Release", id: "Rilis" },
   Industri: { en: "Industry", id: "Industri" },
   Wawancara: { en: "Interview", id: "Wawancara" },
   Pengembangan: { en: "Development", id: "Pengembangan" },
   Penjualan: { en: "Sales", id: "Penjualan" },
   Karakter: { en: "Characters", id: "Karakter" },
   Kritik: { en: "Criticism", id: "Kritik" },
   Trailer: { en: "Trailer", id: "Trailer" },
   Studio: { en: "Studio", id: "Studio" },
   PC: { en: "PC", id: "PC" },
   Review: { en: "Review", id: "Ulasan" },
   Gameplay: { en: "Gameplay", id: "Gameplay" },
   Preview: { en: "Preview", id: "Pratinjau" },
};

function storyTitle(story: Story, language: "en" | "id") {
   return language === "en" ? story.title : story.titleId;
}

export default function News() {
   const { copy, language } = useLanguage();
   const heroRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const [visibleCount, setVisibleCount] = useState(4);
   const [isLoadingMore, setIsLoadingMore] = useState(false);
   const [selectedStory, setSelectedStory] = useState<(typeof stories)[number] | null>(null);
   const [isModalClosing, setIsModalClosing] = useState(false);

   async function loadMoreStories() {
      if (isLoadingMore) return;

      setIsLoadingMore(true);
      await new Promise((resolve) => window.setTimeout(resolve, 520));
      setVisibleCount((count) => Math.min(count + 4, stories.length));
      setIsLoadingMore(false);
   }

   function openStory(story: Story) {
      setIsModalClosing(false);
      setSelectedStory(story);
   }

   function closeStory() {
      setIsModalClosing(true);
      window.setTimeout(() => {
         setSelectedStory(null);
         setIsModalClosing(false);
      }, 900);
   }

   useLayoutEffect(() => {
      if (!heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const context = gsap.context(() => {
         const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

         timeline
            .fromTo(".news-hero-kicker", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
            .fromTo(".news-hero-char", { yPercent: 120, rotateX: -75, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.85, stagger: 0.035 }, "-=0.35")
            .fromTo(".news-hero-second-line", { x: -28, opacity: 0, skewX: -8 }, { x: 0, opacity: 1, skewX: 0, duration: 0.9 }, "-=0.5")
            .fromTo(".news-hero-rule", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.7 }, "-=0.55")
            .fromTo(".news-hero-copy", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.35");

         gsap.to(".news-hero-rule-pulse", {
            xPercent: 500,
            duration: 2.4,
            repeat: -1,
            repeatDelay: 1.6,
            ease: "power2.inOut",
         });

      }, heroRef);

      return () => {
         context.revert();
      };
   }, []);

   function handleTitlePointerMove(event: PointerEvent<HTMLDivElement>) {
      if (!titleRef.current || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

      const characters = titleRef.current.querySelectorAll<HTMLElement>(".news-hero-char");
      const lightCharacters = titleRef.current.querySelectorAll<HTMLElement>(".news-hero-light-char");
      const radius = 175;
      const lightRadius = 125;

      characters.forEach((character) => {
         const bounds = character.getBoundingClientRect();
         const centerX = bounds.left + bounds.width / 2;
         const centerY = bounds.top + bounds.height / 2;
         const distanceX = event.clientX - centerX;
         const distanceY = event.clientY - centerY;
         const distance = Math.hypot(distanceX, distanceY);
         const influence = Math.max(0, 1 - distance / radius);

         gsap.to(character, {
            x: -distanceX * 0.18 * influence,
            y: -distanceY * 0.24 * influence,
            rotation: distanceX * 0.12 * influence,
            color: influence > 0.08 ? "#52c7ff" : "#f3f6f8",
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
         });
      });

      lightCharacters.forEach((character) => {
         const bounds = character.getBoundingClientRect();
         const centerX = bounds.left + bounds.width / 2;
         const centerY = bounds.top + bounds.height / 2;
         const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
         const influence = Math.max(0, 1 - distance / lightRadius);

         gsap.to(character, {
            color: influence > 0 ? "#f3f6f8" : "#ffffff73",
            opacity: 0.45 + influence * 0.55,
            scale: 1 + influence * 0.06,
            textShadow: influence > 0.04 ? `0 0 ${8 + influence * 18}px rgba(243,246,248,${0.25 + influence * 0.55})` : "0 0 0 rgba(243,246,248,0)",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
         });
      });
   }

   function resetTitleMotion() {
      if (!titleRef.current) return;

      gsap.to(titleRef.current.querySelectorAll<HTMLElement>(".news-hero-char"), {
         x: 0,
         y: 0,
         rotation: 0,
         color: "#f3f6f8",
         duration: 0.75,
         stagger: 0.018,
         ease: "elastic.out(1, 0.55)",
         overwrite: "auto",
      });

      gsap.to(titleRef.current.querySelectorAll<HTMLElement>(".news-hero-light-char"), {
         color: "#ffffff73",
         opacity: 0.45,
         scale: 1,
         textShadow: "0 0 0 rgba(243,246,248,0)",
         duration: 0.6,
         stagger: 0.02,
         ease: "power3.out",
         overwrite: "auto",
      });
   }

   useEffect(() => {
      if (!selectedStory) return;

      function closeOnEscape(event: KeyboardEvent) {
         if (event.key === "Escape") closeStory();
      }

      document.addEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "hidden";

      return () => {
         document.removeEventListener("keydown", closeOnEscape);
         document.body.style.overflow = "";
      };
   }, [selectedStory]);

   return (
      <main className="relative isolate min-h-svh overflow-hidden bg-dbh-bg text-white">
         <Navbar active />

         <div className="fixed inset-0 z-0">
            <Image src="/images/bg-news.jpg" alt={copy.news.backgroundAlt} fill priority sizes="100vw" className="object-cover object-center opacity-45" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.78)_0%,rgba(5,8,13,0.55)_35%,#05080d_88%)]" />
         </div>

         <div className="relative z-10 mx-auto max-w-360 px-4 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12">
            <header ref={heroRef} className="mx-auto max-w-4xl text-center">
               <p className="news-hero-kicker mb-5 font-mono text-[9px] uppercase tracking-[0.25em] text-dbh-blue">{copy.news.kicker}</p>
               <div onPointerMove={handleTitlePointerMove} onPointerLeave={resetTitleMotion} className="group mx-auto block cursor-default">
                  <h1 ref={titleRef} aria-label={`${copy.news.title[0]} ${copy.news.title[1]}`} className="font-display text-[clamp(2.8rem,7vw,7rem)] font-medium uppercase leading-[0.86] tracking-[-0.075em] perspective-[700px]">
                     <span className="block overflow-hidden">{copy.news.title[0].split("").map((letter, index) => <span aria-hidden="true" key={`${letter}-${index}`} className="news-hero-char inline-block transition-colors">{letter === " " ? "\u00a0" : letter}</span>)}</span>
                     <span className="news-hero-second-line relative block text-white/45">{copy.news.title[1].split("").map((letter, index) => <span aria-hidden="true" key={`${letter}-${index}`} className="news-hero-light-char inline-block origin-center transition-colors">{letter === " " ? "\u00a0" : letter}</span>)}<span className="news-hero-rule absolute -bottom-3 left-1/2 h-px w-28 -translate-x-1/2 overflow-hidden bg-white/20 sm:w-40"><span className="news-hero-rule-pulse absolute inset-y-0 left-0 w-1/5 bg-dbh-blue" /></span></span>
                  </h1>
               </div>
               <p className="news-hero-copy mx-auto mt-8 max-w-lg font-mono text-[10px] uppercase leading-[1.8] tracking-[0.13em] text-white/55">{copy.news.description}</p>
            </header>

            <section className="mt-14" aria-label={copy.news.featured}>
               <div className="mx-auto grid max-w-350 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {stories.slice(0, visibleCount).map((story, index) => (
                     <StoryCard key={story.title} story={story} index={index} language={language} copy={copy.news} onRead={() => openStory(story)} />
                  ))}
               </div>
               {visibleCount < stories.length && <button type="button" disabled={isLoadingMore} onClick={loadMoreStories} className="nav-glass-control mx-auto mt-10 flex min-h-11 min-w-52 items-center justify-center gap-3 rounded-full px-6 font-mono text-[9px] tracking-[0.04em] disabled:opacity-70">{isLoadingMore ? <><span className="news-loader" /> {copy.news.loading}</> : <>{copy.news.readMore} <MoveRight size={15} /></>}</button>}
            </section>

         </div>
         {selectedStory && createPortal(<StoryModal story={selectedStory} closing={isModalClosing} onClose={closeStory} />, document.body)}
      </main>
   )
}

type Story = (typeof stories)[number];

function StoryCard({ story, index, language, copy, onRead }: { story: Story; index: number; language: "en" | "id"; copy: (typeof import("@/data/translations/en").en)["news"]; onRead: () => void }) {
   const category = categoryLabels[story.category]?.[language] ?? story.category;
   const date = localizeDate(story.date, language);
   const readTime = language === "en" ? story.readTime.replace("menit baca", copy.minRead) : story.readTime;
   const title = storyTitle(story, language);

   return (
      <article
         role="button"
         tabIndex={0}
         aria-label={`${copy.readArticle}: ${title}`}
         onClick={onRead}
         onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
               event.preventDefault();
               onRead();
            }
         }}
         className="news-card liquid-glass group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dbh-blue"
         style={{ animationDelay: `${index * 90}ms` }}
         onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            event.currentTarget.style.setProperty("--card-rotate-x", `${x * 2.4}deg`);
            event.currentTarget.style.setProperty("--card-rotate-y", `${y * -2.4}deg`);
            event.currentTarget.style.setProperty("--card-image-x", `${x * 1.5}%`);
            event.currentTarget.style.setProperty("--card-image-y", `${y * 1.5}%`);
         }}
         onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
            event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
            event.currentTarget.style.setProperty("--card-image-x", "0%");
            event.currentTarget.style.setProperty("--card-image-y", "0%");
         }}
      >
         <div className="relative block aspect-[1.15] w-full shrink-0 overflow-hidden">
            <Image src={story.image} alt="" fill sizes="(max-width: 1024px) 50vw, 33vw" className="news-card-image object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/5 to-transparent" />
            <span className="glass-label absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.14em] text-white/90">{String(index + 1).padStart(2, "0")} / {category}</span>
         </div>
         <div className="relative flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/40"><span>{date}</span><span className="h-1 w-1 rounded-full bg-dbh-blue" /><span className="flex items-center gap-1"><Clock3 size={10} /> {readTime}</span></div>
            <h2 className="font-display text-xl font-medium uppercase leading-[0.96] tracking-[-0.045em] text-white">{title}</h2>
            <p className="mt-3 text-xs leading-relaxed text-white/50">{language === "en" ? story.excerptEn : story.excerpt}</p>
            <div className="news-story-action mt-auto flex min-h-11 w-full items-center justify-between px-4 text-left font-mono text-[10px] tracking-[0.04em]"><span className="flex items-center gap-2"><Eye size={14} /> {copy.readArticle}</span><ArrowUpRight size={16} /></div>
         </div>
      </article>
   );
}

function StoryModal({ story, closing, onClose }: { story: Story; closing: boolean; onClose: () => void }) {
   const { copy, language } = useLanguage();
   const date = localizeDate(story.date, language);
   const readTime = language === "en" ? story.readTime.replace("menit baca", copy.news.minRead) : story.readTime;
   const title = storyTitle(story, language);

   return (
      <div className={`news-modal fixed inset-0 z-50 flex min-h-svh items-center justify-center overflow-y-auto bg-[#030609]/72 p-4 backdrop-blur-xl sm:p-8 ${closing ? "news-modal-closing" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
         <button type="button" onClick={onClose} aria-label={copy.news.close} className="nav-glass-control fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full"><X size={20} /></button>
         <article className="news-modal-window nav-glass-panel grid max-h-[calc(100svh-2rem)] w-full max-w-6xl overflow-y-auto rounded-2xl lg:grid-cols-[0.9fr_1.1fr] sm:max-h-[calc(100svh-4rem)]">
            <div className="relative min-h-70 lg:min-h-155"><Image src={story.image} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /><div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" /></div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14"><p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-dbh-blue">{categoryLabels[story.category]?.[language] ?? story.category} / {date}</p><h2 className="font-display text-3xl font-medium uppercase leading-[0.9] tracking-[-0.055em] text-white sm:text-5xl">{title}</h2><div className="my-7 h-px w-16 bg-dbh-blue" /><div className="max-w-xl space-y-5 text-sm leading-[1.9] text-white/65">{(language === "en" ? story.bodyEn : story.body).split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5"><p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35"><Clock3 size={12} /> {readTime}</p><a href={story.source} target="_blank" rel="noreferrer" className="nav-glass-control inline-flex min-h-10 items-center gap-2 rounded-full px-4 font-mono text-[9px] tracking-[0.04em]">{copy.news.source} <ArrowUpRight size={13} /></a></div></div>
         </article>
      </div>
   );
}

function localizeDate(date: string, language: "en" | "id") {
   if (language === "id") return date;

   return date.replace("MEI", "MAY").replace("AGU", "AUG").replace("OKT", "OCT").replace("DES", "DEC");
}