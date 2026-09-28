"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Navbar from "@/components/navigation/navbar";
import FeelGameTitle from "./feel-game-title";
import PlatformStoreCard from "./platform-store-card";
import StudioGameLibrary from "./studio-game-library";
import { useLanguage } from "@/hooks/use-language";

const platforms = [
   {
      name: "PC",
      detail: "Steam",
      availability: "Tersedia sekarang",
      href: "https://store.steampowered.com/app/1222140/Detroit_Become_Human/",
      action: "Download game",
      logo: "https://cdn.simpleicons.org/steam/FFFFFF",
      logoAlt: "Steam",
      image: "/img/connor-cover.jpg",
      accent: "from-cyan-300/25",
   },
   {
      name: "PC",
      detail: "Epic Games",
      availability: "Tersedia sekarang",
      href: "https://store.epicgames.com/en-US/p/detroit-become-human",
      action: "Download game",
      logo: "https://cdn.simpleicons.org/epicgames/FFFFFF",
      logoAlt: "Epic Games",
      image: "/img/dbh-kara.jpg",
      accent: "from-white/20",
   },
   {
      name: "PlayStation",
      detail: "PS4 · PS5",
      availability: "Tersedia sekarang",
      href: "https://www.playstation.com/en-us/games/detroit-become-human/",
      action: "Download game",
      logo: "https://cdn.simpleicons.org/playstation/FFFFFF",
      logoAlt: "PlayStation",
      image: "/img/markus-cover.jpg",
      accent: "from-rose-300/25",
   },
];

const protagonists = [
   { name: "Kara", image: "/img/kara.png" },
   { name: "Markus", image: "/img/markus.png" },
   { name: "Connor", image: "/img/connor.png" },
];

export default function PlayExperience() {
   const { copy } = useLanguage();

   return (
      <main className="overflow-hidden bg-[#071017] text-white">
         <Navbar active />

         <section className="play-hero relative isolate min-h-[880px] overflow-hidden bg-[#071017] lg:min-h-svh">
            <Image src="/img/detroit-become-human.avif" alt="Detroit: Become Human" fill priority sizes="100vw" className="-z-30 object-cover object-center" />
            <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(4,10,17,0.28)_0%,rgba(4,10,17,0.08)_38%,rgba(4,10,17,0.52)_72%,#071017_100%)]" />
            <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(4,10,17,0.44),transparent_48%,rgba(4,10,17,0.3))]" />
            <div className="play-grid pointer-events-none absolute inset-0 -z-20 opacity-20" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[46%] bg-gradient-to-b from-transparent via-[#071017]/45 to-[#071017] [mask-image:linear-gradient(to_bottom,transparent,black_30%)]" />

            <div className="relative mx-auto min-h-[880px] w-full max-w-[1600px] px-5 pb-7 pt-28 sm:px-8 sm:pt-32 lg:min-h-svh lg:px-14 lg:pb-9">
               <header className="play-rise absolute inset-x-4 top-[17%] z-10 text-center sm:top-[15%] lg:inset-x-0 lg:top-[16%]">
                  <p className="font-mono text-[8px] uppercase tracking-[0.32em] text-white/80 sm:text-[10px]">{copy.play.kicker}</p>
                  <FeelGameTitle title={copy.play.heroTitle} />
               </header>

               <div className="pointer-events-none absolute inset-x-0 top-[30%] z-20 mx-auto grid h-[43%] min-h-[330px] max-h-[560px] w-[min(100%,850px)] grid-cols-3 items-end [mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] lg:top-[25%] lg:h-[68%] lg:max-h-[690px] lg:w-[min(63vw,900px)]">
                  {protagonists.map((protagonist, index) => (
                     <div key={protagonist.name} className={`relative h-[88%] min-w-0 ${index === 1 ? "z-10 h-full" : "z-0"}`}>
                        <Image
                           src={protagonist.image}
                           alt={copy.play.protagonistImageAlts[index]}
                           fill
                           priority
                           sizes="(max-width: 1024px) 32vw, 21vw"
                           className={`object-contain object-bottom drop-shadow-[0_18px_48px_rgba(0,0,0,0.58)] ${index === 1 ? "scale-[1.12]" : "scale-[1.06]"}`}
                        />
                     </div>
                  ))}
               </div>

               <div className="absolute inset-x-5 bottom-6 z-30 grid grid-cols-2 gap-3 sm:inset-x-8 sm:bottom-8 sm:gap-5 lg:inset-0 lg:block">
                  {platforms.map((platform, index) => {
                     const placement = platform.detail === "Epic Games"
                        ? "order-1 mx-auto min-w-[132px] w-[min(34vw,190px)] sm:min-w-[170px] sm:w-[min(34vw,230px)] lg:order-none lg:absolute lg:left-[3.5%] lg:top-[57%] lg:w-[min(27.5vw,410px)] lg:p-6"
                        : platform.detail === "PS4 · PS5"
                           ? "order-3 col-span-2 mx-auto min-w-[132px] w-[min(34vw,190px)] sm:min-w-[170px] sm:w-[min(34vw,230px)] lg:order-none lg:absolute lg:left-[36.6%] lg:top-[68%] lg:w-[min(27.5vw,410px)] lg:p-6"
                           : "order-2 mx-auto min-w-[132px] w-[min(34vw,190px)] sm:min-w-[170px] sm:w-[min(34vw,230px)] lg:order-none lg:absolute lg:left-[69.7%] lg:top-[57%] lg:w-[min(27.5vw,410px)] lg:p-6";
                     const motionClass = platform.detail === "Epic Games"
                        ? "play-platform-epic"
                        : platform.detail === "PS4 · PS5"
                           ? "play-platform-playstation"
                           : "play-platform-steam";

                     return <PlatformStoreCard key={platform.detail} platform={{ ...platform, imageAlt: copy.play.platformImageAlts[index], action: copy.play.downloadGame, officialLabel: copy.play.officialStore }} className={`${motionClass} ${placement}`} />;
                  })}
               </div>
            </div>
         </section>

         <StudioGameLibrary />

         <section className="relative isolate overflow-hidden bg-[#071017] px-5 py-14 text-center sm:px-8 sm:py-18 lg:px-14 lg:py-20">
            <div className="play-grid pointer-events-none absolute inset-0 -z-10 opacity-10" />
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/45">{copy.play.aboutKicker}</p>
            <h2 className="mt-3 font-display text-[24px] font-medium tracking-[-0.025em] text-white sm:text-[30px]">{copy.play.aboutTitle}</h2>
            <Link href="https://www.quanticdream.com/" target="_blank" rel="noreferrer" className="nav-glass-control mt-6 inline-flex min-h-11 items-center gap-3 rounded-full px-5 font-mono text-[9px] tracking-[0.04em]">
               {copy.play.aboutLink}
               <ArrowUpRight size={14} />
            </Link>
         </section>
      </main>
   );
}
