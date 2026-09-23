"use client";

import { Download, Mail, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";

function InstagramMark() {
   return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]"><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.7" className="fill-current stroke-none" /></svg>;
}

function YoutubeMark() {
   return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.3V8.7l5.5 3.3L10 15.3Z" /></svg>;
}

function SocialMark({ label }: { label: string }) {
   return <span aria-hidden="true" className="font-mono text-[12px] font-medium">{label}</span>;
}

const socialLinks = [
   { label: "Instagram", href: "https://www.instagram.com/quanticdreamgames/", icon: <InstagramMark /> },
   { label: "YouTube", href: "https://www.youtube.com/@QuanticDreamOfficial", icon: <YoutubeMark /> },
   { label: "Facebook", href: "https://web.facebook.com/officialquanticdream", icon: <SocialMark label="f" /> },
   { label: "LinkedIn", href: "https://www.linkedin.com/company/quantic-dream/", icon: <SocialMark label="in" /> },
   { label: "VK", href: "https://vk.com/quanticdream", icon: <SocialMark label="vk" /> },
   { label: "TikTok", href: "https://www.tiktok.com/@quanticdream", icon: <SocialMark label="tk" /> },
];

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

export default function Footer() {
   const [locationsOpen, setLocationsOpen] = useState(false);
   const [isLocationClosing, setIsLocationClosing] = useState(false);

   function openLocations() {
      setIsLocationClosing(false);
      setLocationsOpen(true);
   }

   function closeLocations() {
      setIsLocationClosing(true);
      window.setTimeout(() => {
         setLocationsOpen(false);
         setIsLocationClosing(false);
      }, 900);
   }

   useEffect(() => {
      if (!locationsOpen) return;

      function closeOnEscape(event: KeyboardEvent) {
         if (event.key === "Escape") closeLocations();
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
         <div className="grid gap-10 pb-12 md:grid-cols-[1.2fr_0.9fr_1.25fr_1fr]">
            <div>
               <p className="font-display text-2xl uppercase tracking-tighter text-white">Detroit<span className="text-dbh-blue">: Become Human</span></p>
               <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">Game drama interaktif dari Quantic Dream tentang manusia, android, pilihan, dan arti kebebasan di masa depan Detroit.</p>
            </div>
            <div>
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">Contact us</p>
               <a href="mailto:hello@dbhshowcase.dev" className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"><Mail size={15} /> hello@dbhshowcase.dev</a>
            </div>
            <div>
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">Follow Quantic Dream</p>
               <div className="grid max-w-52 grid-cols-3 gap-3">
                  {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="flex h-12 w-12 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:scale-110 hover:border-dbh-blue hover:bg-dbh-blue/10 hover:text-dbh-blue">{social.icon}</a>)}
               </div>
            </div>
            <div>
               <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dbh-blue">Official release</p>
               <a href="https://store.steampowered.com/app/1222140/Detroit_Become_Human/" target="_blank" rel="noreferrer" className="footer-action group inline-flex w-fit items-center justify-start gap-4 whitespace-nowrap border border-dbh-blue/60 px-6 py-3 text-left font-mono text-[9px] uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105"><Download size={18} strokeWidth={1.8} className="shrink-0 transition-colors duration-300" /> Download game</a>
               <button type="button" onClick={openLocations} className="footer-action group mt-3 inline-flex w-fit items-center justify-start gap-4 whitespace-nowrap border border-dbh-blue/60 px-6 py-3 text-left font-mono text-[9px] uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105"><MapPin size={18} strokeWidth={1.8} className="shrink-0 transition-colors duration-300" /> Lokasi studio</button>
            </div>
         </div>

         <div className="mt-8 border-t border-white/10 py-6 text-center font-mono text-[10px] leading-relaxed tracking-[0.08em] text-white/40">© 2026 Quantic Dream. Quantic Dream and the Quantic Dream logo are trademarks of Quantic Dream.</div>
         </footer>
         {locationsOpen && <StudioLocations closing={isLocationClosing} onClose={closeLocations} />}
      </>
   );
}

function StudioLocations({ closing, onClose }: { closing: boolean; onClose: () => void }) {
   return (
      <div className={`news-modal fixed inset-0 z-50 flex items-center justify-center bg-[#030609]/85 p-4 backdrop-blur-sm ${closing ? "news-modal-closing" : ""}`} role="dialog" aria-modal="true" aria-labelledby="studio-locations-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
         <section className="news-modal-window relative w-full max-w-xl border border-white/15 bg-[#0b131b] p-6 shadow-2xl sm:p-8">
            <button type="button" onClick={onClose} aria-label="Tutup lokasi studio" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-dbh-blue hover:bg-dbh-blue hover:text-dbh-bg"><X size={17} /></button>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-dbh-blue">Quantic Dream / Offices</p>
            <h2 id="studio-locations-title" className="pr-10 font-display text-3xl uppercase leading-none tracking-tighter text-white">Lokasi studio</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
               {studioLocations.map((studio) => <a key={studio.name} href={studio.map} target="_blank" rel="noreferrer" className="group overflow-hidden border border-white/15 bg-white/3 transition-colors hover:border-dbh-blue/60"><div className="relative aspect-[1.8] overflow-hidden"><img src={studio.image} alt={studio.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-4"><h3 className="font-display text-base uppercase leading-tight text-white">{studio.name}</h3><p className="mt-3 text-xs leading-relaxed text-white/55">{studio.address}</p></div></a>)}
            </div>
         </section>
      </div>
   );
}
