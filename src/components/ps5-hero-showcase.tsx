"use client";

import { useRef, useState } from "react";
import DetroitGalleryShowcase from "./detroit-gallery-showcase";

interface PS5HeroShowcaseProps {
   className?: string;
}

const HERO_VIDEOS = {
   all: "/videos/YTDown.com_YouTube_Connor-VS-SWAT-Team-Fair-Fight_Media_aI5f4bCSzgw_001_1080p.mp4",
   connor: "/videos/YTDown.com_YouTube_Connor-VS-SWAT-Team-Fair-Fight_Media_aI5f4bCSzgw_001_1080p.mp4",
   markus: "/videos/YTDown.com_YouTube_Markus-final-speech-The-best-possible-en_Media_fhFSFMOU-wM_001_1080p.mp4",
   kara: "/videos/kara-scene.mp4",
};

export default function PS5HeroShowcase({ className = "" }: PS5HeroShowcaseProps) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isPlaying, setIsPlaying] = useState(true);
   const [isMuted, setIsMuted] = useState(true);
   const [activeTab, setActiveTab] = useState<"all" | "connor" | "markus" | "kara">("all");

   const togglePlay = () => {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
         videoRef.current.play();
         setIsPlaying(true);
      } else {
         videoRef.current.pause();
         setIsPlaying(false);
      }
   };

   const toggleMute = () => {
      if (!videoRef.current) return;
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
   };

   const handleTabChange = (tab: "all" | "connor" | "markus" | "kara") => {
      setActiveTab(tab);
      if (videoRef.current) {
         videoRef.current.src = HERO_VIDEOS[tab];
         videoRef.current.muted = isMuted; // Always honor mute setting
         videoRef.current.play().catch(() => {});
         setIsPlaying(true);
      }
   };

   return (
      <div className={`relative w-full overflow-hidden bg-black text-white ${className}`}>
         {/* 1. HERO VIDEO BACKDROP (Full width banner, muted by default, clean header overlay) */}
         <div className="relative aspect-[16/9] min-h-[520px] w-full max-h-[750px] overflow-hidden bg-black pt-16">
            <video
               ref={videoRef}
               src={HERO_VIDEOS[activeTab]}
               autoPlay
               loop
               playsInline
               muted={isMuted}
               className="h-full w-full object-cover transition-opacity duration-700 opacity-80"
            />

            {/* Gradient Overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
            <div className="pointer-events-none absolute inset-0 bg-radial-vignette opacity-75" />

            {/* Upper Right Controls: Play/Pause & Sound Toggle */}
            <div className="absolute right-4 top-20 z-20 flex items-center gap-2 sm:right-8 sm:top-24">
               <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Jeda video gameplay" : "Putar video gameplay"}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/90 hover:scale-105"
               >
                  {isPlaying ? (
                     <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                     </svg>
                  ) : (
                     <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                        <path d="M8 5v14l11-7z" />
                     </svg>
                  )}
               </button>

               <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Nyalakan suara video" : "Matikan suara video"}
                  className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 text-xs text-white backdrop-blur-md transition-all hover:bg-black/90"
               >
                  {isMuted ? (
                     <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                           <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/70">Tanpa Suara</span>
                     </>
                  ) : (
                     <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-dbh-blue">
                           <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-dbh-blue">Audio ON</span>
                     </>
                  )}
               </button>
            </div>

            {/* 2. CENTER HERO CONTENT OVERLAY (Detroit: Become Human Theme) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
               {/* CyberLife LED Ring Badge */}
               <div className="mb-4 flex items-center gap-2.5 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full animate-pulse bg-dbh-blue shadow-[0_0_10px_#00d2ff]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/80">
                     CyberLife Android System 2038
                  </span>
               </div>

               {/* Giant Central Circular Play Button */}
               <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play full video preview"
                  className="group mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-white/90 bg-black/40 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-dbh-blue hover:bg-dbh-blue hover:text-black"
               >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8 sm:h-9 sm:w-9 transition-transform group-hover:scale-110" aria-hidden="true">
                     <path d="M8 5v14l11-7z" />
                  </svg>
               </button>

               {/* Hero Main Title */}
               <h1 className="font-display text-[clamp(2.5rem,7.5vw,6.5rem)] font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-lg">
                  DETROIT: BECOME HUMAN
               </h1>

               {/* Subtitle Description */}
               <p className="mt-4 max-w-3xl text-xs sm:text-base leading-relaxed text-white/85 font-sans drop-shadow sm:mt-5">
                  Tiga android. Tiga takdir yang saling bersinggungan. Setiap keputusan moral, analisis probabilitas, dan tindak refleks yang kamu ambil membentuk masa depan populasi android dan manusia di Detroit 2038.
               </p>

               {/* Oval Tab / Filter Buttons (Connor, Markus, Kara) */}
               <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                     type="button"
                     onClick={() => handleTabChange("all")}
                     className={`rounded-full px-6 py-2.5 text-xs font-semibold shadow-md transition-all ${
                        activeTab === "all"
                           ? "bg-white text-black scale-105"
                           : "border border-white/30 bg-black/40 text-white hover:bg-white/20"
                     }`}
                  >
                     Semua Protagonis
                  </button>

                  <button
                     type="button"
                     onClick={() => handleTabChange("connor")}
                     className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                        activeTab === "connor"
                           ? "bg-dbh-blue text-black font-bold scale-105"
                           : "border border-white/20 bg-black/40 text-white/80 hover:bg-white/20"
                     }`}
                  >
                     Connor // RK800
                  </button>

                  <button
                     type="button"
                     onClick={() => handleTabChange("markus")}
                     className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                        activeTab === "markus"
                           ? "bg-amber-400 text-black font-bold scale-105"
                           : "border border-white/20 bg-black/40 text-white/80 hover:bg-white/20"
                     }`}
                  >
                     Markus // RK200
                  </button>

                  <button
                     type="button"
                     onClick={() => handleTabChange("kara")}
                     className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                        activeTab === "kara"
                           ? "bg-rose-500 text-white font-bold scale-105"
                           : "border border-white/20 bg-black/40 text-white/80 hover:bg-white/20"
                     }`}
                  >
                     Kara // AX400
                  </button>
               </div>
            </div>
         </div>

         {/* 3. QUANTIC DREAM OFFICIAL STYLE SCREENSHOTS & VIDEOS GALLERY SHOWCASE */}
         <DetroitGalleryShowcase />
      </div>
   );
}
