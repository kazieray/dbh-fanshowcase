"use client";

import Link from "next/link";
import { ArrowUpRight, Download, Mail, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";

function InstagramMark() {
   return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
         <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
         <circle cx="12" cy="12" r="4" />
         <circle cx="17.5" cy="6.5" r="0.7" className="fill-current stroke-none" />
      </svg>
   );
}

function YoutubeMark() {
   return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
         <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.3V8.7l5.5 3.3L10 15.3Z" />
      </svg>
   );
}

function SocialMark({ label }: { label: string }) {
   return <span aria-hidden="true" className="font-mono text-[9px] font-medium">{label}</span>;
}

export default function Footer() {
   const [locationsOpen, setLocationsOpen] = useState(false);

   useEffect(() => {
      if (!locationsOpen) return;

      function closeOnEscape(event: KeyboardEvent) {
         if (event.key === "Escape") setLocationsOpen(false);
      }

      document.addEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "hidden";

      return () => {
         document.removeEventListener("keydown", closeOnEscape);
         document.body.style.overflow = "";
      };
   }, [locationsOpen]);

   return (
      <>
         <footer className="mx-auto mt-24 max-w-6xl border-t border-dbh-blue/30 pt-8">
         <div className="grid gap-10 pb-10 md:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
            <div>
               <p className="font-display text-2xl uppercase tracking-tighter text-white">Detroit<span className="text-dbh-blue">.</span></p>
               <p className="mt-4 max-w-xs font-mono text-[9px] uppercase leading-[1.8] tracking-[0.12em] text-white/40">Fan showcase untuk dunia Detroit: Become Human, dibuat untuk para pemain yang masih ingin menemukan setiap kemungkinan.</p>
            </div>
            <div>
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">Contact us</p>
               <a href="mailto:hello@dbhshowcase.dev" className="flex items-center gap-2 font-mono text-[10px] text-white/60 transition-colors hover:text-white"><Mail size={13} /> hello@dbhshowcase.dev</a>
            </div>
            <div>
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">Follow signal</p>
               <div className="flex items-center gap-3">
                  <a href="https://www.instagram.com/quanticdreamgames/" target="_blank" rel="noreferrer" aria-label="Instagram Quantic Dream" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-dbh-blue hover:text-dbh-blue"><InstagramMark /></a>
                  <a href="https://www.youtube.com/@QuanticDreamOfficial" target="_blank" rel="noreferrer" aria-label="YouTube Quantic Dream" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-dbh-blue hover:text-dbh-blue"><YoutubeMark /></a>
                  <a href="https://web.facebook.com/officialquanticdream" target="_blank" rel="noreferrer" aria-label="Facebook Quantic Dream" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-dbh-blue hover:text-dbh-blue"><SocialMark label="f" /></a>
                  <a href="https://www.linkedin.com/company/quantic-dream/" target="_blank" rel="noreferrer" aria-label="LinkedIn Quantic Dream" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-dbh-blue hover:text-dbh-blue"><SocialMark label="in" /></a>
                  <a href="https://vk.com/quanticdream" target="_blank" rel="noreferrer" aria-label="VK Quantic Dream" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-dbh-blue hover:text-dbh-blue"><SocialMark label="vk" /></a>
                  <a href="https://www.tiktok.com/@quanticdream" target="_blank" rel="noreferrer" aria-label="TikTok Quantic Dream" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-dbh-blue hover:text-dbh-blue"><SocialMark label="tk" /></a>
               </div>
            </div>
            <div>
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">Official release</p>
               <a href="https://store.playstation.com/en-us/concept/234571" target="_blank" rel="noreferrer" className="flex w-fit items-center gap-3 border border-dbh-blue/60 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-dbh-blue transition-colors hover:bg-dbh-blue hover:text-dbh-bg"><Download size={14} /> Download game</a>
               <button type="button" onClick={() => setLocationsOpen(true)} className="mt-3 flex w-fit items-center gap-3 border border-white/15 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-dbh-blue hover:text-dbh-blue"><MapPin size={14} /> Lokasi studio</button>
            </div>
         </div>
         <div className="flex flex-col gap-3 border-t border-white/10 py-5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/30 sm:flex-row sm:items-center sm:justify-between"><span>End of transmission / Detroit 2038</span><span>Developed by Quantic Dream</span><Link href="/" className="flex items-center gap-1 text-white/60 transition-colors hover:text-dbh-blue">Kembali ke beranda <ArrowUpRight size={11} /></Link></div>
         <div className="border-t border-white/10 py-5 font-mono text-[8px] leading-relaxed tracking-[0.08em] text-white/25">© 2026 Quantic Dream. Quantic Dream and the Quantic Dream logo are trademarks of Quantic Dream.</div>
      </footer>

         {locationsOpen && <StudioLocations onClose={() => setLocationsOpen(false)} />}
      </>
   );
}

function StudioLocations({ onClose }: { onClose: () => void }) {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030609]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="studio-locations-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
         <section className="relative w-full max-w-xl border border-white/15 bg-[#0b131b] p-6 shadow-2xl sm:p-8">
            <button type="button" onClick={onClose} aria-label="Tutup lokasi studio" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-dbh-blue hover:bg-dbh-blue hover:text-dbh-bg"><X size={17} /></button>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-dbh-blue">Quantic Dream / Offices</p>
            <h2 id="studio-locations-title" className="pr-10 font-display text-3xl uppercase leading-none tracking-tighter text-white">Lokasi studio</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
               <address className="overflow-hidden border-t border-dbh-blue/40 pt-4 not-italic"><div className="relative mb-5 aspect-[1.8] overflow-hidden border border-white/10"><img src="/images/lokasi-studio-1.jpeg" alt="Gedung Quantic Dream di Paris" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div><h3 className="font-display text-base uppercase text-white">Quantic Dream - Paris, France</h3><p className="mt-3 text-xs leading-relaxed text-white/55">30 rue Raoul Wallenberg<br />75019 Paris (France)<br /><a href="tel:+33144640090" className="mt-2 inline-block text-dbh-blue">+33 1 44 64 00 90</a></p></address>
               <address className="overflow-hidden border-t border-dbh-blue/40 pt-4 not-italic"><div className="relative mb-5 aspect-[1.8] overflow-hidden border border-white/10"><img src="/images/lokasi-studio-2.jpeg" alt="Gedung Quantic Dream di Montreal" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div><h3 className="font-display text-base uppercase text-white">Quantic Dream - Montreal, Québec</h3><p className="mt-3 text-xs leading-relaxed text-white/55">2050 Rue de Bleury, Suite 800<br />Montréal, QC H3A 3S1</p></address>
            </div>
         </section>
      </div>
   );
}
