"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { useState, type PointerEvent } from "react";

export type StorePlatform = {
   name: string;
   detail: string;
   href: string;
   action: string;
   officialLabel?: string;
   logo: string;
   logoAlt: string;
   image: string;
   imageAlt: string;
};

type PlatformStoreCardProps = {
   platform: StorePlatform;
   className: string;
};

export default function PlatformStoreCard({ platform, className }: PlatformStoreCardProps) {
   const [isHovered, setIsHovered] = useState(false);
   const [isPressed, setIsPressed] = useState(false);

   function handlePointerEnter(event: PointerEvent<HTMLAnchorElement>) {
      setIsHovered(event.pointerType !== "touch");
   }

   return (
      <Link
         href={platform.href}
         target="_blank"
         rel="noreferrer"
         aria-label={`${platform.name} ${platform.detail} — ${platform.action}`}
         onPointerEnter={handlePointerEnter}
         onPointerLeave={() => { setIsHovered(false); setIsPressed(false); }}
         onPointerDown={() => setIsPressed(true)}
         onPointerUp={() => setIsPressed(false)}
         onPointerCancel={() => setIsPressed(false)}
         onFocus={() => setIsHovered(true)}
         onBlur={() => { setIsHovered(false); setIsPressed(false); }}
         style={{
            transform: isPressed ? "translateY(-1px) scale(0.99)" : isHovered ? "translateY(-7px) scale(1.018)" : "translateY(0) scale(1)",
            borderColor: isHovered ? "rgb(255 255 255 / 65%)" : "rgb(255 255 255 / 38%)",
            boxShadow: isHovered
               ? "inset 0 1px 0 rgb(255 255 255 / 52%), inset 0 -1px 0 rgb(255 255 255 / 18%), 0 38px 100px rgb(0 0 0 / 58%), 0 14px 38px rgb(123 213 255 / 22%)"
               : undefined,
            transition: `transform ${isPressed ? "160ms ease-out" : "560ms cubic-bezier(0.16, 1, 0.3, 1)"}, border-color 420ms ease, box-shadow 560ms cubic-bezier(0.16, 1, 0.3, 1)`,
         }}
         className={`liquid-glass glass-store-card group relative isolate flex min-h-[142px] flex-col justify-between overflow-hidden rounded-xl p-3 sm:min-h-[174px] sm:p-5 lg:min-h-[210px] lg:rounded-2xl lg:p-6 ${className}`}
      >
         <Image
            src={platform.image}
            alt={platform.imageAlt}
            fill
            sizes="(max-width: 1024px) 48vw, 27vw"
            className="-z-10 object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
         />
         <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071017]/10 via-[#071017]/30 to-[#071017]/75" />
         <div className="relative flex items-center justify-between gap-2">
            <Image src={platform.logo} alt={platform.logoAlt} width={30} height={30} unoptimized className="h-6 w-6 object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.35)] sm:h-7 sm:w-7" />
            <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/85 sm:text-[8px]">{platform.officialLabel ?? "Official store"}</span>
         </div>
         <div className="relative mt-5">
            <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/55">{platform.name}</p>
            <h2 className="mt-1 font-display text-[18px] font-semibold leading-none tracking-[-0.03em] sm:text-[25px] lg:text-[30px]">{platform.detail}</h2>
            <span className="nav-glass-control play-store-action group mt-3 inline-flex min-h-10 w-fit items-center gap-3 rounded-full px-4 font-mono text-[8px] tracking-[0.04em]">
               <Download size={16} strokeWidth={1.8} className="shrink-0 transition-colors duration-300" />
               {platform.action}
            </span>
         </div>
      </Link>
   );
}