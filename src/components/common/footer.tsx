"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/hooks/use-language";

type SocialPlatform = "Instagram" | "YouTube" | "Facebook" | "LinkedIn" | "VK" | "TikTok";

function SocialMark({ platform }: { platform: SocialPlatform }) {
   if (platform === "Instagram") {
      return (
         <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
            <defs>
               <linearGradient id="instagram-gradient" x1="0" x2="1" y1="1" y2="0">
                  <stop stopColor="#ffd776" />
                  <stop offset=".48" stopColor="#ff416c" />
                  <stop offset="1" stopColor="#7043e9" />
               </linearGradient>
            </defs>

            <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#instagram-gradient)" />
            <rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="24" cy="24" r="6.5" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="33" cy="15" r="2" fill="white" />
         </svg>
      );
   }

   if (platform === "YouTube") {
      return (
         <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
            <rect x="2" y="8" width="44" height="32" rx="10" fill="#ff0033" />
            <path d="M20 16.5 33 24l-13 7.5z" fill="white" />
         </svg>
      );
   }

   if (platform === "Facebook") {
      return (
         <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
            <rect x="2" y="2" width="44" height="44" rx="12" fill="#0866ff" />
            <path d="M27 42V27h6l1-7h-7v-4c0-2 1-3 3-3h4V7h-6c-7 0-10 4-10 10v3h-5v7h5v15z" fill="white" />
         </svg>
      );
   }

   if (platform === "LinkedIn") {
      return (
         <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
            <rect x="2" y="2" width="44" height="44" rx="10" fill="#0a66c2" />
            <text x="24" y="33" fill="white" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">
               in
            </text>
         </svg>
      );
   }

   if (platform === "VK") {
      return (
         <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
            <rect x="2" y="2" width="44" height="44" rx="12" fill="#0077ff" />
            <text x="24" y="31" fill="white" fontFamily="Arial, sans-serif" fontSize="19" fontWeight="700" textAnchor="middle">
               vk
            </text>
         </svg>
      );
   }

   return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
         <rect x="2" y="2" width="44" height="44" rx="12" fill="#090909" />
         <path d="M27 9v18a8 8 0 1 1-7-7.9v6a2.5 2.5 0 1 0 1 2V9z" fill="#25f4ee" transform="translate(-2 1)" />
         <path d="M27 9v18a8 8 0 1 1-7-7.9v6a2.5 2.5 0 1 0 1 2V9z" fill="#fe2c55" transform="translate(2 -1)" />
         <path d="M27 9v18a8 8 0 1 1-7-7.9v6a2.5 2.5 0 1 0 1 2V9z" fill="white" />
      </svg>
   );
}

const socialLinks = [
   {
      label: "Instagram",
      href: "https://www.instagram.com/quanticdreamgames/",
   },
   {
      label: "YouTube",
      href: "https://www.youtube.com/@QuanticDreamOfficial",
   },
   {
      label: "Facebook",
      href: "https://web.facebook.com/officialquanticdream",
   },
   {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/quantic-dream/",
   },
   {
      label: "VK",
      href: "https://vk.com/quanticdream",
   },
   {
      label: "TikTok",
      href: "https://www.tiktok.com/@quanticdream",
   },
] as const;

const studioLocations = [
   {
      city: "Paris",
      country: "France",
      address: "30 rue Raoul Wallenberg, 75019 Paris",
      href: "https://www.google.com/maps/search/?api=1&query=Quantic+Dream+30+rue+Raoul+Wallenberg+75019+Paris",
   },
   {
      city: "Montréal",
      country: "Québec, Canada",
      address: "2050 Rue de Bleury, Suite 800, Montréal, QC H3A 3S1",
      href: "https://www.google.com/maps/search/?api=1&query=Quantic+Dream+2050+Rue+de+Bleury+Montreal",
   },
] as const;

export default function Footer({ tightTop = false }: { tightTop?: boolean }) {
   const { copy } = useLanguage();
   const footerCopy = copy.footer;

   return (
      <footer className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${tightTop ? "mt-0" : "mt-16"}`}>
         <div className="border-t border-white/10">
            {/* MAIN */}
            <div className="grid gap-8 py-8 md:grid-cols-2 md:gap-x-12 md:gap-y-9 lg:grid-cols-[0.9fr_1fr_1.15fr] lg:gap-14 lg:py-9">
               {/* BRAND */}
               <div className="max-w-[360px]">
                  <Image src="/images/logo-white.webp" alt="Detroit: Become Human" width={180} height={55} className="h-auto w-[135px] sm:w-[145px]" />

                  <p className="mt-4 max-w-[340px] text-[11px] font-light leading-[1.7] text-white/45 sm:text-[12px]">{footerCopy.description}</p>
               </div>

               {/* OFFICIAL CHANNELS */}
               <div>
                  <p className="mb-4 font-mono text-[8px] font-medium uppercase tracking-[0.2em] text-white/40">Official Channels</p>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                     {socialLinks.map((social) => (
                        <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Quantic Dream ${social.label}`} className="group flex min-h-7 items-center gap-2">
                           <span className="flex h-4 w-4 shrink-0 items-center justify-center opacity-55 transition-[opacity,transform] duration-300 group-hover:scale-105 group-hover:opacity-100">
                              <SocialMark platform={social.label} />
                           </span>

                           <span className="whitespace-nowrap font-mono text-[8px] text-white/40 transition-colors duration-300 group-hover:text-white/75">{social.label}</span>
                        </a>
                     ))}
                  </div>

                  <p className="mt-4 font-mono text-[7px] leading-[1.6] tracking-[0.03em] text-white/15">Official Quantic Dream social channels.</p>
               </div>

               {/* STUDIOS */}
               <div className="md:col-span-2 lg:col-span-1">
                  <p className="mb-4 font-mono text-[8px] font-medium uppercase tracking-[0.2em] text-white/40">Studios</p>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                     {studioLocations.map((studio) => (
                        <a key={studio.city} href={studio.href} target="_blank" rel="noreferrer" aria-label={`Quantic Dream studio in ${studio.city}`} className="group flex items-start gap-3">
                           <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-dbh-blue" strokeWidth={1.5} />

                           <div className="min-w-0">
                              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                 <span className="font-display text-[11px] font-medium text-white/60 transition-colors duration-300 group-hover:text-white sm:text-[12px]">{studio.city}</span>

                                 <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/20">{studio.country}</span>
                              </div>

                              <p className="mt-1 max-w-[270px] text-[9px] font-light leading-[1.55] text-white/30 sm:text-[10px]">{studio.address}</p>
                           </div>
                        </a>
                     ))}
                  </div>
               </div>
            </div>

            {/* LEGAL */}
            <div className="flex flex-col gap-4 border-t border-white/8 py-5 sm:flex-row sm:items-center sm:justify-between">
               <p className="max-w-[680px] font-mono text-[8px] leading-[1.7] tracking-[0.025em] text-white/20">
                  Fan-made showcase project. Not affiliated with or endorsed by Quantic Dream. Detroit: Become Human and related properties belong to their respective owners.
               </p>

               <div className="shrink-0 sm:text-right">
                  <p className="font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-white/30">Tim Ayam Mail</p>

                  <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-white/15">DBH Fan Showcase — 2026</p>
               </div>
            </div>
         </div>
      </footer>
   );
}
