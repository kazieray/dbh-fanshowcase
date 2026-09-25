"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navigation/navbar";

if (typeof window !== "undefined") {
   gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const stats = [
   { value: "40+", label: "Ending berbeda", sub: "Setiap pilihan membentuk cerita" },
   { value: "1.000+", label: "Adegan unik", sub: "Narasi yang tak pernah sama dua kali" },
   { value: "85+", label: "Karakter", sub: "Android & manusia dengan cerita masing-masing" },
   { value: "10 jam+", label: "Durasi rata-rata", sub: "Namun bisa jauh lebih panjang" },
];

const features = [
   {
      id: "branching",
      icon: "◈",
      title: "Branching Narrative",
      description:
         "Setiap keputusan membuka atau menutup jalur cerita. Satu pilihan salah bisa mengubah segalanya — atau justru menyelamatkan semua.",
      accentColor: "#52c7ff",
   },
   {
      id: "qte",
      icon: "◉",
      title: "Quick-Time Events",
      description:
         "Momen-momen kritis menuntut refleks cepat. Aksi yang dasyat, ketegangan yang nyata — berhasil atau gagal mengubah alur cerita.",
      accentColor: "#a78bfa",
   },
   {
      id: "moral",
      icon: "◇",
      title: "Pilihan Moral",
      description:
         "Tidak ada jawaban benar atau salah. Setiap pilihan membawa konsekuensi — untuk karakter, untuk android, untuk masa depan Detroit.",
      accentColor: "#f9a743",
   },
   {
      id: "endings",
      icon: "◆",
      title: "Multiple Endings",
      description:
         "Lebih dari 40 ending yang mungkin. Jalur cerita Connor, Kara, dan Markus bisa berakhir dengan cara yang sangat berbeda tergantung pilihanmu.",
      accentColor: "#34d399",
   },
   {
      id: "deviancy",
      icon: "⬡",
      title: "Sistem Deviancy",
      description:
         "Android yang melampaui program mereka menjadi deviant. Kamu menentukan apakah mereka dipandang sebagai ancaman atau harapan.",
      accentColor: "#fb7185",
   },
   {
      id: "cyberlife",
      icon: "○",
      title: "Dunia CyberLife",
      description:
         "Detroit 2038 — kota yang menggabungkan kemewahan teknologi dengan ketidaksetaraan sosial. Android ada di mana-mana, namun tidak dianggap ada.",
      accentColor: "#52c7ff",
   },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tri-Character Video Showcase (Connor, Markus & Kara from /videos)
// ─────────────────────────────────────────────────────────────────────────────

interface VideoCardProps {
   title: string;
   model: string;
   role: string;
   tagline: string;
   description: string;
   videoSrc: string;
   accentColor: string;
   ledColor: string;
   icon: string;
}

function CharacterVideoCard({
   title,
   model,
   role,
   tagline,
   description,
   videoSrc,
   accentColor,
   ledColor,
   icon,
}: VideoCardProps) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isPlaying, setIsPlaying] = useState(true);
   const [isMuted, setIsMuted] = useState(true);
   const [progress, setProgress] = useState(0);

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

   const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setProgress((cur / dur) * 100);
   };

   return (
      <div className="char-video-card group flex flex-col opacity-0">
         {/* Video Display Box */}
         <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl transition-all duration-500 hover:border-white/20">
            {/* Top info badge */}
            <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-md sm:left-4 sm:top-4">
               <span
                  className="h-2 w-2 rounded-full animate-pulse shadow-sm"
                  style={{ backgroundColor: ledColor, boxShadow: `0 0 8px ${ledColor}` }}
               />
               <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/80 sm:text-[9px]">
                  {model}
               </span>
               <span className="text-white/20">•</span>
               <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/50 sm:text-[8px]">
                  {role}
               </span>
            </div>

            {/* Native Video Element - MUTED BY DEFAULT */}
            <video
               ref={videoRef}
               src={videoSrc}
               playsInline
               autoPlay
               loop
               muted={isMuted}
               onTimeUpdate={handleTimeUpdate}
               onPlay={() => setIsPlaying(true)}
               onPause={() => setIsPlaying(false)}
               className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Subtle Gradient Overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Progress scrubber bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
               <div
                  className="h-full transition-all duration-150"
                  style={{ width: `${progress}%`, backgroundColor: accentColor }}
               />
            </div>

            {/* PlayStation-style Bottom Controls */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between sm:bottom-4 sm:left-4 sm:right-4">
               {/* Play/Pause Button (PS5 Showcase Style) */}
               <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? `Pause ${title} gameplay video` : `Play ${title} gameplay video`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-black/65 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-black/85 hover:text-white active:scale-95"
               >
                  {isPlaying ? (
                     <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                     </svg>
                  ) : (
                     <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                     </svg>
                  )}
               </button>

               {/* Sound & Status Controls - Muted indicator */}
               <div className="flex items-center gap-2">
                  <button
                     type="button"
                     onClick={toggleMute}
                     aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                     className="flex h-9 items-center gap-1.5 rounded-lg border border-white/20 bg-black/65 px-2.5 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-black/85 hover:text-white"
                  >
                     {isMuted ? (
                        <>
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true">
                              <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                           <span className="font-mono text-[7px] uppercase tracking-wider text-white/50 sm:text-[8px]">Tanpa Suara</span>
                        </>
                     ) : (
                        <>
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-dbh-blue" aria-hidden="true">
                              <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                           <span className="font-mono text-[7px] uppercase tracking-wider text-dbh-blue sm:text-[8px]">Audio ON</span>
                        </>
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Content info below video */}
         <div className="mt-4 flex items-start gap-3">
            <div
               className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-base backdrop-blur-sm"
               style={{ color: accentColor }}
               aria-hidden="true"
            >
               {icon}
            </div>

            <div>
               <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-[15px] font-semibold uppercase tracking-[-0.01em] text-white sm:text-[17px]">
                     {title}
                  </h3>
                  <span
                     className="rounded px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest text-white/90"
                     style={{ backgroundColor: `${accentColor}25`, border: `1px solid ${accentColor}50` }}
                  >
                     {tagline}
                  </span>
               </div>
               <p className="mt-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.05em] text-white/50 sm:text-[9px]">
                  {description}
               </p>
            </div>
         </div>
      </div>
   );
}

function TriCharacterVideoSection() {
   const containerRef = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
      if (!containerRef.current) return;
      const ctx = gsap.context(() => {
         gsap.fromTo(
            ".char-video-card",
            { opacity: 0, y: 44 },
            {
               opacity: 1,
               y: 0,
               duration: 1.0,
               stagger: 0.18,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 78%",
               },
            },
         );
      });
      return () => ctx.revert();
   }, []);

   const connorVideo = "/videos/YTDown.com_YouTube_Connor-VS-SWAT-Team-Fair-Fight_Media_aI5f4bCSzgw_001_1080p.mp4";
   const markusVideo = "/videos/YTDown.com_YouTube_Markus-final-speech-The-best-possible-en_Media_fhFSFMOU-wM_001_1080p.mp4";
   const karaVideo = "/videos/kara-scene.mp4";

   return (
      <section aria-labelledby="gameplay-video-title" className="relative px-4 py-16 sm:px-7 sm:py-24 lg:px-12 lg:py-28">
         {/* ambient glows */}
         <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/6 top-1/2 h-[45vw] max-h-[500px] w-[40vw] max-w-[500px] -translate-y-1/2 rounded-full bg-dbh-blue/[0.04] blur-[120px]"
         />
         <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/6 top-1/2 h-[45vw] max-h-[500px] w-[40vw] max-w-[500px] -translate-y-1/2 rounded-full bg-rose-500/[0.04] blur-[120px]"
         />

         <div ref={containerRef} className="relative mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-10 sm:mb-14">
               <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-dbh-blue" />
                  <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-dbh-blue sm:text-[9px]">
                     In-Game Character Gameplay (Muted by Default)
                  </p>
               </div>
               <h2
                  id="gameplay-video-title"
                  className="mt-3 font-display text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium uppercase leading-[0.92] tracking-[-0.04em] text-white"
               >
                  Connor, Markus & Kara
                  <br />
                  <span className="text-white/40">Tiga Sudut Pandang, Satu Takdir Utama</span>
               </h2>
               <p className="mt-3 max-w-2xl font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-white/40 sm:text-[9px]">
                  Saksikan langsung footage gameplay dari ketiga karakter utama. Semua video diputar tanpa suara (muted) secara default. Klik tombol kontrol pada video untuk memutar/menjeda.
               </p>
            </div>

            {/* Tri Video Grid (3 Columns for Connor, Markus, Kara) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
               {/* Connor Showcase Card */}
               <CharacterVideoCard
                  title="Connor // RK800"
                  model="MODEL RK800 #313 248 317"
                  role="Deviant Hunter"
                  tagline="Tactical Combat"
                  description="Kombinasi analisis forensik real-time, rekonstruksi probabilitas kejadian, dan aksi Quick-Time Event berkecepatan tinggi saat menghadapi perlawanan bersenjata."
                  videoSrc={connorVideo}
                  accentColor="#52c7ff"
                  ledColor="#00d2ff"
                  icon="⌖"
               />

               {/* Markus Showcase Card */}
               <CharacterVideoCard
                  title="Markus // RK200"
                  model="MODEL RK200 #684 842 971"
                  role="Jericho Leader"
                  tagline="Deviant Revolution"
                  description="Dilema moral kepemimpinan, orasi pembebasan bangsa android, dan konsekuensi pilihan perdamaian atau revolusi terbuka yang mengubah sejarah Detroit."
                  videoSrc={markusVideo}
                  accentColor="#f59e0b"
                  ledColor="#f59e0b"
                  icon="◈"
               />

               {/* Kara Showcase Card (ADDED) */}
               <CharacterVideoCard
                  title="Kara // AX400"
                  model="MODEL AX400 #589 421 993"
                  role="Fugitive Android"
                  tagline="Maternal Deviancy"
                  description="Perjuangan emosional melarikan diri bersama Alice, menembus batas program demi rasa kasih sayang, dan melintasi perbatasan Kanada untuk mencari kedamaian."
                  videoSrc={karaVideo}
                  accentColor="#f43f5e"
                  ledColor="#ec4899"
                  icon="◇"
               />
            </div>

            {/* Sub-caption bar */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4 font-mono text-[7px] uppercase tracking-[0.2em] text-white/30 sm:text-[8px]">
               <p>Detroit: Become Human — Footage Gameplay Resmi (Connor, Markus & Kara)</p>
               <p className="text-dbh-blue/60">Interaktif • Audio Muted (Tanpa Suara)</p>
            </div>
         </div>
      </section>
   );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────────────────────────

function GameplayHero() {
   const rootRef = useRef<HTMLElement>(null);

   useLayoutEffect(() => {
      if (!rootRef.current) return;
      const ctx = gsap.context(() => {
         gsap.set(".ghero-reveal", { yPercent: 110 });
         gsap.set(".ghero-fade", { y: 14, opacity: 0 });

         const tl = gsap.timeline({ delay: 0.25 });
         tl.to(".ghero-reveal", {
            yPercent: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: "power4.out",
         }).to(
            ".ghero-fade",
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "power3.out" },
            "-=0.55",
         );
      }, rootRef);
      return () => ctx.revert();
   }, []);

   return (
      <section
         ref={rootRef}
         aria-labelledby="gameplay-hero-title"
         className="relative isolate flex min-h-[55vh] items-end overflow-hidden bg-dbh-bg px-4 pb-14 pt-36 sm:px-7 sm:pb-20 lg:px-12 lg:pb-24"
      >
         {/* dim gradient */}
         <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dbh-bg via-dbh-bg/80 to-transparent" />

         {/* ambient orbs */}
         <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] top-[15%] h-[35vw] max-h-[400px] w-[35vw] max-w-[400px] rounded-full bg-dbh-blue/[0.04] blur-[100px]"
         />
         <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[5%] top-[30%] h-[28vw] max-h-[320px] w-[28vw] max-w-[320px] rounded-full bg-violet-500/[0.04] blur-[100px]"
         />

         {/* horizontal separator line */}
         <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:left-7 sm:right-7 lg:left-12 lg:right-12"
         />

         <div className="relative z-10 w-full">
            {/* eyebrow */}
            <div className="overflow-hidden">
               <p className="ghero-reveal font-mono text-[8px] uppercase tracking-[0.3em] text-dbh-blue sm:text-[9px]">
                  Detroit: Become Human — Sistem Permainan
               </p>
            </div>

            <div className="mt-4 overflow-hidden sm:mt-5">
               <h1
                  id="gameplay-hero-title"
                  className="ghero-reveal font-display text-[clamp(2.8rem,9vw,8rem)] font-medium uppercase leading-[0.88] tracking-[-0.055em] text-white"
               >
                  Gameplay
               </h1>
            </div>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
               <div className="overflow-hidden">
                  <p className="ghero-reveal font-display text-[clamp(1rem,2.5vw,2.2rem)] font-light uppercase leading-none tracking-[0.03em] text-white/50">
                     Pilih. Konsekuensi. Selesaikan.
                  </p>
               </div>

               <p className="ghero-fade max-w-[280px] font-mono text-[8px] uppercase leading-[1.75] tracking-[0.14em] text-white/35 sm:text-[9px]">
                  Setiap aksi memiliki bobot.
                  <br />
                  Setiap diam pun adalah sebuah pilihan.
               </p>
            </div>
         </div>
      </section>
   );
}

// ─────────────────────────────────────────────────────────────────────────────
// Features Section
// ─────────────────────────────────────────────────────────────────────────────

function FeaturesSection() {
   const rootRef = useRef<HTMLElement>(null);

   useLayoutEffect(() => {
      if (!rootRef.current) return;
      const ctx = gsap.context(() => {
         gsap.fromTo(
            ".feature-card",
            { y: 40, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 0.85,
               stagger: 0.08,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top 75%",
               },
            },
         );
      }, rootRef);
      return () => ctx.revert();
   }, []);

   return (
      <section
         ref={rootRef}
         aria-labelledby="features-title"
         className="relative px-4 py-20 sm:px-7 sm:py-28 lg:px-12 lg:py-36"
      >
         {/* top separator */}
         <div aria-hidden="true" className="mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent sm:mb-20" />

         <div className="mx-auto max-w-6xl">
            {/* section header */}
            <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
               <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-dbh-blue sm:text-[9px]">
                     Fitur Utama
                  </p>
                  <h2
                     id="features-title"
                     className="mt-3 font-display text-[clamp(1.6rem,4vw,3.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.04em] text-white"
                  >
                     Sistem yang Membuat
                     <br />
                     <span className="text-white/40">DBH Berbeda</span>
                  </h2>
               </div>

               <p className="max-w-[240px] font-mono text-[8px] uppercase leading-[1.75] tracking-[0.14em] text-white/30 sm:text-[9px]">
                  Enam pilar gameplay yang menjadikan Detroit: Become Human karya Quantic Dream masterpiece interaktif.
               </p>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
               {features.map((feat) => (
                  <article
                     key={feat.id}
                     className="feature-card group relative bg-dbh-bg p-7 opacity-0 transition-colors duration-500 hover:bg-dbh-surface sm:p-8"
                  >
                     {/* accent corner */}
                     <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-5 w-px opacity-0 transition-all duration-500 group-hover:h-8 group-hover:opacity-100"
                        style={{ backgroundColor: feat.accentColor }}
                     />
                     <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-px w-5 opacity-0 transition-all duration-500 group-hover:w-8 group-hover:opacity-100"
                        style={{ backgroundColor: feat.accentColor }}
                     />

                     {/* icon */}
                     <p
                        className="mb-5 text-2xl transition-transform duration-500 group-hover:scale-110"
                        style={{ color: feat.accentColor }}
                        aria-hidden="true"
                     >
                        {feat.icon}
                     </p>

                     <h3 className="font-display text-[13px] font-medium uppercase tracking-[-0.01em] text-white sm:text-[14px]">
                        {feat.title}
                     </h3>

                     <p className="mt-3 font-mono text-[8px] leading-[1.8] tracking-[0.05em] text-white/40 sm:text-[9px]">
                        {feat.description}
                     </p>
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats Section
// ─────────────────────────────────────────────────────────────────────────────

function StatsSection() {
   const rootRef = useRef<HTMLElement>(null);

   useLayoutEffect(() => {
      if (!rootRef.current) return;
      const ctx = gsap.context(() => {
         gsap.fromTo(
            ".stat-item",
            { y: 32, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 0.9,
               stagger: 0.1,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top 80%",
               },
            },
         );
      }, rootRef);
      return () => ctx.revert();
   }, []);

   return (
      <section
         ref={rootRef}
         aria-labelledby="stats-title"
         className="relative overflow-hidden px-4 py-20 sm:px-7 sm:py-28 lg:px-12"
      >
         {/* bg band */}
         <div aria-hidden="true" className="absolute inset-0 bg-dbh-surface" />
         <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dbh-bg via-transparent to-dbh-bg" />

         {/* scanline aesthetic */}
         <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
               backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
            }}
         />

         <div className="relative mx-auto max-w-5xl">
            <div className="mb-12 text-center sm:mb-16">
               <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-dbh-blue sm:text-[9px]">Statistik</p>
               <h2
                  id="stats-title"
                  className="mt-3 font-display text-[clamp(1.5rem,4vw,3rem)] font-medium uppercase leading-[0.92] tracking-[-0.04em] text-white"
               >
                  Skala yang Tak Tertandingi
               </h2>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/[0.06] lg:grid-cols-4">
               {stats.map((stat, i) => (
                  <div key={i} className="stat-item group bg-dbh-bg p-8 text-center opacity-0 transition-colors duration-500 hover:bg-white/[0.03] sm:p-10">
                     <p
                        className="font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-[-0.05em] text-dbh-blue"
                        aria-label={stat.value}
                     >
                        {stat.value}
                     </p>
                     <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 sm:text-[10px]">
                        {stat.label}
                     </p>
                     <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-white/25 sm:text-[8px]">
                        {stat.sub}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────────────────────────────────────

function CtaSection() {
   const rootRef = useRef<HTMLElement>(null);

   useLayoutEffect(() => {
      if (!rootRef.current) return;
      const ctx = gsap.context(() => {
         gsap.fromTo(
            ".cta-reveal",
            { y: 28, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 0.9,
               stagger: 0.09,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top 82%",
               },
            },
         );
      }, rootRef);
      return () => ctx.revert();
   }, []);

   return (
      <section
         ref={rootRef}
         aria-labelledby="cta-title"
         className="relative px-4 py-24 sm:px-7 sm:py-32 lg:px-12 lg:py-40"
      >
         {/* separator */}
         <div aria-hidden="true" className="mb-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent sm:mb-24" />

         {/* ambient */}
         <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] max-h-[500px] w-[60vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dbh-blue/[0.03] blur-[100px]"
         />

         <div className="relative mx-auto max-w-3xl text-center">
            <div className="cta-reveal opacity-0">
               <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-dbh-blue sm:text-[9px]">
                  Mulai Perjalananmu
               </p>
            </div>

            <div className="mt-4 overflow-hidden cta-reveal opacity-0">
               <h2
                  id="cta-title"
                  className="font-display text-[clamp(2rem,6vw,5rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-white"
               >
                  Siap Menjadi
                  <br />
                  <span className="text-white/35">Lebih dari Mesin?</span>
               </h2>
            </div>

            <p className="cta-reveal mx-auto mt-6 max-w-[380px] font-mono text-[8px] uppercase leading-[1.75] tracking-[0.14em] text-white/35 opacity-0 sm:text-[9px]">
               Bergabunglah dengan jutaan pemain yang sudah merasakan dunia Detroit 2038. Pilihan ada di tanganmu.
            </p>

            <div className="cta-reveal mt-10 flex flex-col items-center gap-4 opacity-0 sm:flex-row sm:justify-center">
               {/* primary CTA */}
               <a
                  id="cta-buy-now"
                  href="https://store.steampowered.com/app/1222140/Detroit_Become_Human/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-14 items-center px-10"
               >
                  <span aria-hidden="true" className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                  <span aria-hidden="true" className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                  <span aria-hidden="true" className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                  <span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/20 transition-all duration-500 ease-out group-hover:h-5 group-hover:w-5 group-hover:border-dbh-blue" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 transition-colors duration-500 group-hover:text-white">
                     Beli di Steam
                  </span>
               </a>

               {/* secondary CTA */}
               <Link
                  id="cta-characters"
                  href="/characters"
                  className="group flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-8 backdrop-blur-sm transition-all duration-400 hover:border-white/20 hover:bg-white/[0.09]"
               >
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 transition-colors duration-400 group-hover:text-white/80">
                     Jelajahi Karakter
                  </span>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5 text-white/30 transition-all duration-400 group-hover:translate-x-0.5 group-hover:text-white/60" aria-hidden="true">
                     <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </Link>
            </div>

            {/* footnote */}
            <p className="cta-reveal mt-8 font-mono text-[7px] uppercase tracking-[0.16em] text-white/20 opacity-0 sm:text-[8px]">
               Tersedia di PC (Steam), PlayStation 4 & 5 · Quantic Dream · 2018
            </p>
         </div>
      </section>
   );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root experience
// ─────────────────────────────────────────────────────────────────────────────

export default function GameplayExperience() {
   return (
      <main className="relative min-h-svh bg-dbh-bg">
         {/* Navbar always active (no preloader on sub-pages) */}
         <Navbar active={true} />

         <GameplayHero />
         <TriCharacterVideoSection />
         <FeaturesSection />
         <StatsSection />
         <CtaSection />

         {/* footer micro */}
         <footer className="border-t border-white/[0.06] px-4 py-8 sm:px-7 lg:px-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20 sm:text-[8px]">
                  Detroit: Become Human © 2018 Quantic Dream / Sony Interactive Entertainment
               </p>
               <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-dbh-blue/40 sm:text-[8px]">
                  Fan Showcase — Bukan situs resmi
               </p>
            </div>
         </footer>
      </main>
   );
}
