"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { useLanguage } from "@/hooks/use-language";

const studioGames = [
   {
      title: "Heavy Rain",
      category: "Psychological thriller · 2010",
      description: "Empat sudut pandang, satu misteri, dan keputusan yang menentukan siapa yang bertahan.",
      image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960910/page_bg_raw.jpg",
      href: "https://store.steampowered.com/app/960910/Heavy_Rain/",
      accent: "text-[#e8c48a]",
   },
   {
      title: "Detroit: Become Human",
      category: "Interactive drama · 2018",
      description: "Tiga android. Ribuan pilihan. Nasib Detroit ada di tanganmu.",
      image: "/images/bg-dbh.jpg",
      href: "https://store.steampowered.com/app/1222140/Detroit_Become_Human/",
      accent: "text-[#8adfff]",
   },
   {
      title: "Beyond: Two Souls",
      category: "Supernatural thriller · 2013",
      description: "Jalani hidup Jodie Holmes dan ikatan istimewanya dengan entitas bernama Aiden.",
      image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960990/header.jpg",
      href: "https://store.steampowered.com/app/960990/Beyond_Two_Souls/",
      accent: "text-[#d6a9f5]",
   },
];

export default function StudioGameLibrary() {
   const { copy } = useLanguage();
   const [isOpen, setIsOpen] = useState(false);
   const [isOpening, setIsOpening] = useState(false);
   const games = studioGames.map((game, index) => ({ ...game, ...copy.play.games[index] }));

   useEffect(() => {
      if (!isOpening) return;

      const duration = window.matchMedia("(max-width: 1023px)").matches ? 900 : 2700;
      const timeout = window.setTimeout(() => setIsOpening(false), duration);

      return () => window.clearTimeout(timeout);
   }, [isOpening]);

   function openFolder() {
      setIsOpen(true);
      setIsOpening(true);
   }

   return (
      <section id="studio-games" className="game-library-section relative isolate overflow-hidden px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:px-14 lg:pb-28 lg:pt-14">
         <Image src="/images/Cyberlife.jpeg" alt="" fill sizes="100vw" className="-z-30 scale-110 object-cover object-center opacity-35 blur-[11px]" />
         <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#05080d_0%,rgba(5,8,13,0.62)_18%,rgba(5,8,13,0.42)_52%,#05080d_100%)]" />
         <div className="play-grid pointer-events-none absolute inset-0 -z-20 opacity-20" />
         <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-[#05080d] backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_48%)]" />

         <div className="relative mx-auto max-w-[1440px]">
            <header className="mx-auto mb-7 max-w-5xl px-5 text-center sm:mb-10 sm:px-8">
               <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8adfff]">{copy.play.libraryKicker}</p>
               <h2 className="mt-3 font-display text-[36px] font-medium leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{copy.play.libraryTitle}</h2>
               <p className="mx-auto mt-4 max-w-xl font-mono text-[9px] leading-[1.9] text-white/65 sm:text-[10px]">
                  {copy.play.libraryDescription}
               </p>
            </header>

            {!isOpen ? (
               <div className="game-folder-stage relative mx-auto">
                  <button type="button" aria-expanded={false} aria-label={copy.play.openLibrary} onClick={openFolder} className="game-folder-trigger group relative mx-auto block h-full w-full max-w-[570px] text-left">
                     <span className="game-folder-stack absolute inset-x-0 top-0 mx-auto block h-[90%] w-full max-w-[520px]" aria-hidden="true">
                        {games.map((game, index) => (
                           <span key={game.title} className={`game-folder-sheet absolute overflow-hidden rounded-xl ${index === 0 ? "game-folder-sheet-back" : index === 1 ? "game-folder-sheet-front" : "game-folder-sheet-middle"}`}>
                              <Image src={game.image} alt="" fill unoptimized={game.image.startsWith("https://")} sizes="(max-width: 640px) 70vw, 470px" className="object-cover" />
                              <span className="absolute inset-0 bg-gradient-to-t from-[#06101a]/60 to-transparent" />
                           </span>
                        ))}
                     </span>
                     <span className="game-folder-face absolute inset-x-0 bottom-0 z-[2] flex h-[57%] flex-col justify-between overflow-hidden rounded-[24px] border border-white/50 p-5 sm:p-7">
                        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/75">{copy.play.folderLabel}</span>
                        <span className="flex items-end justify-between gap-4">
                           <span className="font-display text-[18px] font-medium leading-tight sm:text-[22px]">{copy.play.folderTitle}</span>
                           <span className="game-folder-open-icon nav-glass-control flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16">
                              <ArrowUpRight size={24} strokeWidth={1.7} />
                           </span>
                        </span>
                     </span>
                  </button>
               </div>
            ) : (
               <div className="game-fan-stage game-fan-stage-open relative mx-auto h-[490px] max-w-[1160px] lg:h-[530px]">
                  {games.map((game, index) => {
                     const offset = (index - 1) * 300;
                     const angle = (index - 1) * 9;
                     const lift = index === 1 ? -10 : 12;
                     const fanStyle = {
                        "--fan-offset": `${offset}px`,
                        "--fan-angle": `${angle}deg`,
                        "--fan-lift": `${lift}px`,
                        animationDelay: `${index * 70}ms`,
                     } as CSSProperties;

                     return (
                        <Link key={game.title} href={game.href} target="_blank" rel="noreferrer" aria-label={`${copy.play.exploreGame} ${game.title}`} style={fanStyle} className={`liquid-glass game-fan-card group absolute left-1/2 top-1/2 z-10 w-[min(72vw,380px)] overflow-hidden rounded-2xl ${isOpening ? "game-fan-card-opening" : ""} ${index === 1 ? "z-20" : ""}`}>
                           <div className="relative aspect-[1.82] overflow-hidden">
                              <Image src={game.image} alt={game.imageAlt} fill unoptimized={game.image.startsWith("https://")} sizes="(max-width: 1024px) 82vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#06101a]/90 via-[#06101a]/5 to-[#06101a]/15" />
                              <span className="glass-label absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/90">0{index + 1} / Quantic Dream</span>
                           </div>
                           <div className="relative p-5 sm:p-6">
                              <p className={`font-mono text-[8px] uppercase tracking-[0.14em] ${game.accent}`}>{game.category}</p>
                              <h3 className="mt-2 font-display text-[23px] font-medium leading-tight tracking-[-0.025em] sm:text-[27px]">{game.title}</h3>
                              <p className="mt-3 min-h-[48px] max-w-sm text-[12px] leading-relaxed text-white/75">{game.description}</p>
                              <span className="nav-glass-control mt-5 inline-flex min-h-10 items-center gap-3 rounded-full px-4 font-mono text-[8px] tracking-[0.04em]">
                                 {copy.play.exploreGame}
                                 <ArrowUpRight size={14} />
                              </span>
                           </div>
                        </Link>
                     );
                  })}
               </div>
            )}
         </div>
      </section>
   );
}