"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/data/nav-items";
import { useLanguage } from "@/hooks/use-language";

type SocialPlatform = "Instagram" | "YouTube" | "Facebook" | "LinkedIn" | "VK" | "TikTok";

function SocialMark({ platform }: { platform: SocialPlatform }) {
   if (platform === "Instagram") {
      return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6"><defs><linearGradient id="instagram-gradient" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#ffd776" /><stop offset=".48" stopColor="#ff416c" /><stop offset="1" stopColor="#7043e9" /></linearGradient></defs><rect x="2" y="2" width="44" height="44" rx="13" fill="url(#instagram-gradient)" /><rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="white" strokeWidth="3" /><circle cx="24" cy="24" r="6.5" fill="none" stroke="white" strokeWidth="3" /><circle cx="33" cy="15" r="2" fill="white" /></svg>;
   }

   if (platform === "YouTube") {
      return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6"><rect x="2" y="8" width="44" height="32" rx="10" fill="#ff0033" /><path d="M20 16.5 33 24l-13 7.5z" fill="white" /></svg>;
   }

   if (platform === "Facebook") {
      return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6"><rect x="2" y="2" width="44" height="44" rx="12" fill="#0866ff" /><path d="M27 42V27h6l1-7h-7v-4c0-2 1-3 3-3h4V7h-6c-7 0-10 4-10 10v3h-5v7h5v15z" fill="white" /></svg>;
   }

   if (platform === "LinkedIn") {
      return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6"><rect x="2" y="2" width="44" height="44" rx="10" fill="#0a66c2" /><text x="24" y="33" fill="white" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="700" textAnchor="middle">in</text></svg>;
   }

   if (platform === "VK") {
      return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6"><rect x="2" y="2" width="44" height="44" rx="12" fill="#0077ff" /><text x="24" y="31" fill="white" fontFamily="Arial, sans-serif" fontSize="19" fontWeight="700" textAnchor="middle">vk</text></svg>;
   }

   return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6"><rect x="2" y="2" width="44" height="44" rx="12" fill="#090909" /><path d="M27 9v18a8 8 0 1 1-7-7.9v6a2.5 2.5 0 1 0 1 2V9z" fill="#25f4ee" transform="translate(-2 1)" /><path d="M27 9v18a8 8 0 1 1-7-7.9v6a2.5 2.5 0 1 0 1 2V9z" fill="#fe2c55" transform="translate(2 -1)" /><path d="M27 9v18a8 8 0 1 1-7-7.9v6a2.5 2.5 0 1 0 1 2V9z" fill="white" /></svg>;
}

const socialLinks = [
   { label: "Instagram", href: "https://www.instagram.com/quanticdreamgames/" },
   { label: "YouTube", href: "https://www.youtube.com/@QuanticDreamOfficial" },
   { label: "Facebook", href: "https://web.facebook.com/officialquanticdream" },
   { label: "LinkedIn", href: "https://www.linkedin.com/company/quantic-dream/" },
   { label: "VK", href: "https://vk.com/quanticdream" },
   { label: "TikTok", href: "https://www.tiktok.com/@quanticdream" },
] as const;

const studioLocations = [
   {
      name: "Quantic Dream - Paris, France",
      image: "/images/lokasi-studio-1.jpeg",
      address: <>30 rue Raoul Wallenberg<br />75019 Paris (France)<br /><span className="text-dbh-blue">+33 1 44 64 00 90</span></>,
      map: "https://www.google.com/maps/search/?api=1&query=Quantic+Dream+30+rue+Raoul+Wallenberg+75019+Paris",
   },
   {
      name: "Quantic Dream - Montreal, Québec",
      image: "/images/lokasi-studio-2.jpeg",
      address: <>2050 Rue de Bleury, Suite 800<br />Montréal, QC H3A 3S1</>,
      map: "https://www.google.com/maps/search/?api=1&query=Quantic+Dream+2050+Rue+de+Bleury+Montreal",
   },
];

export default function Footer({ tightTop = false }: { tightTop?: boolean }) {
   const { copy } = useLanguage();
   const footerCopy = copy.footer;

   return (
      <>
         <footer className={`mx-auto ${tightTop ? "mt-0" : "mt-24"} max-w-6xl border-t border-dbh-blue/30 pt-8`}>
         <div className="mx-auto grid w-full max-w-5xl justify-items-center gap-x-4 gap-y-9 pb-10 text-center sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-[1.2fr_0.75fr_0.95fr_1.4fr] lg:gap-x-6">
            <div className="flex flex-col items-center">
               <Image src="/images/logo-white.webp" alt="Detroit: Become Human" width={180} height={55} className="h-auto w-[150px]" />
               <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">{footerCopy.description}</p>
            </div>
            <div className="flex flex-col items-center">
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">{footerCopy.menu}</p>
               <nav aria-label="Footer navigation" className="flex flex-col items-center gap-3">
                  {navItems.map((item) => <Link key={item.href} href={item.href} className="footer-navigation-link font-mono text-[10px] uppercase tracking-[0.1em] text-white/55 transition-colors">{copy.nav[item.key]}</Link>)}
                  <Link href="/play" className="footer-navigation-link font-mono text-[10px] uppercase tracking-[0.1em] text-white/55 transition-colors">{copy.nav.download}</Link>
               </nav>
            </div>
            <div className="flex flex-col items-center">
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">{footerCopy.follow}</p>
               <div className="mx-auto grid w-full max-w-60 grid-cols-2 gap-2">
                  {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="footer-social-link flex min-h-11 min-w-0 items-center justify-start gap-2 px-2"><span className="social-brand-mark flex h-6 w-6 shrink-0 items-center justify-center"><SocialMark platform={social.label} /></span><span className="truncate font-mono text-[8px] text-white/75 sm:text-[9px]">{social.label}</span></a>)}
               </div>
            </div>
            <div className="flex flex-col items-center">
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">{footerCopy.studioLocations}</p>
               <div className="grid w-full grid-cols-2 gap-2 text-left">
                  {studioLocations.map((studio) => (
                     <a key={studio.name} href={studio.map} target="_blank" rel="noreferrer" className="group min-w-0 overflow-hidden p-2 transition-transform duration-300 hover:-translate-y-1 sm:p-2.5">
                        <div className="relative aspect-[1.7] overflow-hidden rounded-lg">
                           <Image src={studio.image} alt={studio.name} fill sizes="(max-width: 640px) 44vw, 150px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h3 className="mt-2 flex items-start gap-1 font-display text-[10px] font-medium leading-tight text-white sm:text-[11px]">
                           <MapPin size={12} className="mt-0.5 shrink-0 text-dbh-blue" />
                           <span>{studio.name}</span>
                        </h3>
                        <p className="mt-1.5 pl-4 text-[9px] leading-relaxed text-white/55 sm:text-[10px]">{studio.address}</p>
                     </a>
                  ))}
               </div>
            </div>
         </div>

         <div className="mt-8 border-t border-white/10 py-6 text-center font-mono text-[10px] leading-relaxed tracking-[0.08em] text-white/40">{footerCopy.copyright}</div>
         </footer>
      </>
   );
}
