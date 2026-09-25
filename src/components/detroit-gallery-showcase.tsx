"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ScreenshotItem {
   id: number;
   title: string;
   chapter: string;
   src: string;
   placeholderGradient: string;
}

interface VideoItem {
   id: number;
   title: string;
   tagline: string;
   videoUrl: string;
   thumbnailSrc: string;
   placeholderGradient: string;
}

const SCREENSHOTS_PAGE_1: ScreenshotItem[] = [
   {
      id: 1,
      title: "The Hostage — Negosiasi Atap Gedung",
      chapter: "Connor // RK800",
      src: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-blue-900 via-slate-900 to-black",
   },
   {
      id: 2,
      title: "Jimmy's Bar — Pencarian Letnan Hank Anderson",
      chapter: "Connor & Hank",
      src: "/images/bg-dbh.jpg",
      placeholderGradient: "from-amber-950 via-zinc-900 to-black",
   },
   {
      id: 3,
      title: "Pemandangan Kota Detroit 2038",
      chapter: "CyberLife Headquarters",
      src: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-cyan-950 via-slate-900 to-black",
   },
   {
      id: 4,
      title: "Revolusi Jericho — Barikade SWAT",
      chapter: "Markus // RK200",
      src: "/images/bg-dbh.jpg",
      placeholderGradient: "from-red-950 via-zinc-900 to-black",
   },
   {
      id: 5,
      title: "Stormy Night — Melarikan Diri Bersama Alice",
      chapter: "Kara // AX400",
      src: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-indigo-950 via-slate-900 to-black",
   },
   {
      id: 6,
      title: "Stasiun TV Stratford — Pidato Pembebasan",
      chapter: "Markus & Jericho",
      src: "/images/bg-dbh.jpg",
      placeholderGradient: "from-teal-950 via-zinc-900 to-black",
   },
];

const SCREENSHOTS_PAGE_2: ScreenshotItem[] = [
   {
      id: 7,
      title: "Menembus CyberLife Tower",
      chapter: "Connor RK800 Final",
      src: "/images/bg-dbh.jpg",
      placeholderGradient: "from-sky-950 via-slate-900 to-black",
   },
   {
      id: 8,
      title: "Perbatasan Kanada — Bebas atau Gugur",
      chapter: "Kara & Alice",
      src: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-rose-950 via-slate-900 to-black",
   },
   {
      id: 9,
      title: "Pawai Kebebasan (Freedom March)",
      chapter: "Markus Leader",
      src: "/images/bg-dbh.jpg",
      placeholderGradient: "from-amber-900 via-slate-900 to-black",
   },
   {
      id: 10,
      title: "Introgasi Android Deviant HK400",
      chapter: "Connor Forensic Scan",
      src: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-blue-950 via-zinc-900 to-black",
   },
   {
      id: 11,
      title: "Zlatko's Mansion — Horor Kamski",
      chapter: "Kara's Nightmare",
      src: "/images/bg-dbh.jpg",
      placeholderGradient: "from-purple-950 via-slate-900 to-black",
   },
   {
      id: 12,
      title: "Pertemuan Pertama Elijah Kamski",
      chapter: "Kamski Test Choice",
      src: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-slate-900 via-cyan-950 to-black",
   },
];

const VIDEOS_LIST: VideoItem[] = [
   {
      id: 101,
      title: "CONNOR VS SWAT TEAM",
      tagline: "Tactical Combat Gameplay",
      videoUrl: "/videos/YTDown.com_YouTube_Connor-VS-SWAT-Team-Fair-Fight_Media_aI5f4bCSzgw_001_1080p.mp4",
      thumbnailSrc: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-cyan-900 via-blue-950 to-black",
   },
   {
      id: 102,
      title: "CHLOE CYBERLIFE INTERVIEW",
      tagline: "ST300 Personal Assistant",
      videoUrl: "/videos/dbh-opening.webm",
      thumbnailSrc: "/images/bg-dbh.jpg",
      placeholderGradient: "from-blue-950 via-slate-900 to-black",
   },
   {
      id: 103,
      title: "KARA CROSSROADS ESCAPE",
      tagline: "Emotional Freedom Story",
      videoUrl: "/videos/kara-scene.mp4",
      thumbnailSrc: "/images/dbh-first-screen.jpg",
      placeholderGradient: "from-rose-950 via-slate-900 to-black",
   },
   {
      id: 104,
      title: "MARKUS FINAL SPEECH",
      tagline: "Jericho Android Revolution",
      videoUrl: "/videos/YTDown.com_YouTube_Markus-final-speech-The-best-possible-en_Media_fhFSFMOU-wM_001_1080p.mp4",
      thumbnailSrc: "/images/bg-dbh.jpg",
      placeholderGradient: "from-amber-950 via-zinc-900 to-black",
   },
];

export default function DetroitGalleryShowcase() {
   const [page, setPage] = useState<number>(1);
   const [selectedItem, setSelectedItem] = useState<{ type: "image" | "video"; item: ScreenshotItem | VideoItem; index: number } | null>(null);

   const screenshotsPages = [SCREENSHOTS_PAGE_1, SCREENSHOTS_PAGE_2];
   const currentScreenshots = screenshotsPages[page - 1] || SCREENSHOTS_PAGE_1;

   // Keyboard Listener for Lightbox Modal
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (!selectedItem) return;
         if (e.key === "Escape") {
            setSelectedItem(null);
         } else if (e.key === "ArrowRight") {
            handleNextItem();
         } else if (e.key === "ArrowLeft") {
            handlePrevItem();
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [selectedItem]);

   const handleNextItem = () => {
      if (!selectedItem) return;
      if (selectedItem.type === "image") {
         const allScreenshots = [...SCREENSHOTS_PAGE_1, ...SCREENSHOTS_PAGE_2];
         const nextIndex = (selectedItem.index + 1) % allScreenshots.length;
         setSelectedItem({ type: "image", item: allScreenshots[nextIndex], index: nextIndex });
      } else {
         const nextIndex = (selectedItem.index + 1) % VIDEOS_LIST.length;
         setSelectedItem({ type: "video", item: VIDEOS_LIST[nextIndex], index: nextIndex });
      }
   };

   const handlePrevItem = () => {
      if (!selectedItem) return;
      if (selectedItem.type === "image") {
         const allScreenshots = [...SCREENSHOTS_PAGE_1, ...SCREENSHOTS_PAGE_2];
         const prevIndex = (selectedItem.index - 1 + allScreenshots.length) % allScreenshots.length;
         setSelectedItem({ type: "image", item: allScreenshots[prevIndex], index: prevIndex });
      } else {
         const prevIndex = (selectedItem.index - 1 + VIDEOS_LIST.length) % VIDEOS_LIST.length;
         setSelectedItem({ type: "video", item: VIDEOS_LIST[prevIndex], index: prevIndex });
      }
   };

   return (
      <section className="relative w-full border-t border-white/10 bg-black text-white">
         <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            {/* 1. LEFT SIDE: BLUE/CYAN GALERY SECTION (Screenshot 1 Left Replica) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#008cc9] via-[#0071a8] to-[#004f77] p-6 sm:p-10 flex flex-col justify-between">
               <div>
                  {/* SCREENSHOTS HEADER */}
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-6">
                     <h2 className="font-sans text-2xl font-light uppercase tracking-widest text-white">
                        SCREENSHOTS
                     </h2>
                     <span className="font-mono text-xs tracking-wider text-white/70">
                        Page {page} of {screenshotsPages.length}
                     </span>
                  </div>

                  {/* 6 Thumbnail Grid (3 Columns x 2 Rows) */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                     {currentScreenshots.map((item, idx) => (
                        <div
                           key={item.id}
                           onClick={() => setSelectedItem({ type: "image", item, index: (page - 1) * 6 + idx })}
                           className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-md border border-white/30 bg-black/60 shadow-md transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:shadow-cyan-500/30"
                        >
                           {/* Image / Placeholder */}
                           <div className={`absolute inset-0 bg-gradient-to-br ${item.placeholderGradient} opacity-90 transition-transform group-hover:scale-110`}>
                              <Image
                                 src={item.src}
                                 alt={item.title}
                                 fill
                                 className="object-cover opacity-75 transition-opacity group-hover:opacity-100"
                              />
                           </div>

                           {/* Hover Overlay & Zoom Icon */}
                           <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-black shadow-lg">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                              </div>
                           </div>

                           {/* Chapter Tag at Bottom */}
                           <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-1.5 text-center">
                              <p className="truncate font-mono text-[8px] uppercase tracking-wider text-white/90">
                                 {item.chapter}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Carousel Controls (Left Arrow, Dots, Right Arrow) */}
                  <div className="mt-6 flex items-center justify-center gap-4">
                     <button
                        type="button"
                        onClick={() => setPage((p) => (p > 1 ? p - 1 : screenshotsPages.length))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white hover:text-black"
                     >
                        ‹
                     </button>

                     <div className="flex items-center gap-2">
                        {screenshotsPages.map((_, i) => (
                           <button
                              key={i}
                              type="button"
                              onClick={() => setPage(i + 1)}
                              className={`h-2.5 rounded-full transition-all ${
                                 page === i + 1 ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
                              }`}
                           />
                        ))}
                     </div>

                     <button
                        type="button"
                        onClick={() => setPage((p) => (p < screenshotsPages.length ? p + 1 : 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white hover:text-black"
                     >
                        ›
                     </button>
                  </div>

                  {/* VIDEOS HEADER */}
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-6 mt-10">
                     <h2 className="font-sans text-2xl font-light uppercase tracking-widest text-white">
                        VIDEOS
                     </h2>
                  </div>

                  {/* Videos Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                     {VIDEOS_LIST.map((video, idx) => (
                        <div
                           key={video.id}
                           onClick={() => setSelectedItem({ type: "video", item: video, index: idx })}
                           className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-md border border-white/30 bg-black/70 shadow-md transition-all duration-300 hover:scale-105 hover:border-white"
                        >
                           <div className={`absolute inset-0 bg-gradient-to-br ${video.placeholderGradient}`}>
                              <Image
                                 src={video.thumbnailSrc}
                                 alt={video.title}
                                 fill
                                 className="object-cover opacity-60 transition-opacity group-hover:opacity-90"
                              />
                           </div>

                           {/* PlayStation Badge Top Left */}
                           <div className="absolute top-1 left-1 rounded bg-black/60 px-1 py-0.5 font-mono text-[7px] font-bold text-white">
                              PS5
                           </div>

                           {/* Play Button Icon Overlay */}
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-black/50 text-white transition group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black">
                                 <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                                    <path d="M8 5v14l11-7z" />
                                 </svg>
                              </div>
                           </div>

                           <div className="absolute bottom-0 inset-x-0 bg-black/80 p-1 text-center">
                              <p className="truncate font-mono text-[7px] uppercase font-bold tracking-wider text-white">
                                 {video.title}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* 2. RIGHT SIDE: WHITE / CLEAN OVERVIEW SECTION (Screenshot 1 Right Replica) */}
            <div className="lg:col-span-6 bg-white text-slate-800 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
               <div className="max-w-xl">
                  {/* OVERVIEW TITLE */}
                  <h2 className="font-sans text-3xl sm:text-4xl font-light uppercase tracking-wide text-[#0092d0]">
                     OVERVIEW
                  </h2>

                  {/* OVERVIEW TEXT */}
                  <p className="mt-5 font-sans text-sm sm:text-base leading-relaxed text-slate-600">
                     <strong className="text-[#0092d0]">Detroit: Become Human</strong>, produksi game paling ambisius dari <strong className="text-slate-900">Quantic Dream</strong>, menghadirkan aktor ternama dunia seperti <strong className="text-slate-800">Jesse Williams</strong> (Grey's Anatomy), <strong className="text-slate-800">Clancy Brown</strong> (Carnivale), <strong className="text-slate-800">Lance Henriksen</strong> (Aliens), <strong className="text-slate-800">Bryan Dechart</strong> (True Blood), dan <strong className="text-slate-800">Valorie Curry</strong> (Twilight).
                  </p>

                  <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-600">
                     Detroit: Become Human menaruh takdir manusia dan android di tanganmu, membawamu ke masa depan dekat tempat mesin telah menjadi lebih cerdas daripada manusia. Setiap pilihan yang kamu ambil memengaruhi hasil akhir game dengan alur narasi bercabang paling rumit yang pernah dibuat.
                  </p>

                  {/* WHAT MAKES US HUMAN? TITLE */}
                  <h3 className="mt-10 font-sans text-2xl sm:text-3xl font-light uppercase tracking-wide text-[#0092d0]">
                     WHAT MAKES US HUMAN?
                  </h3>

                  {/* WHAT MAKES US HUMAN? TEXT */}
                  <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-600">
                     Detroit 2038. Teknologi telah berkembang ke titik di mana android yang menyerupai manusia berada di mana-mana. Mereka berbicara, bergerak, dan berperilaku layaknya manusia, namun mereka hanyalah mesin yang melayani manusia.
                  </p>

                  <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-600">
                     Mainkan tiga android berbeda dan saksikan dunia di ambang kekacauan melalui sudut pandang mereka. Keputusanmu secara dramatis akan mengubah alur cerita interaktif yang penuh ketegangan ini.
                  </p>

                  <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-600">
                     Kamu akan menghadapi dilema moral dan menentukan siapa yang hidup atau mati. Dengan ribuan pilihan dan puluhan ending yang mungkin, bagaimana kamu akan memengaruhi masa depan Detroit dan takdir kemanusiaan?
                  </p>

                  {/* CTA Link */}
                  <div className="mt-8 border-t border-slate-200 pt-6">
                     <a
                        href="https://store.steampowered.com/app/1222140/Detroit_Become_Human/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#0092d0] hover:text-[#0071a8] transition"
                     >
                        <span>Jelajahi di Steam Store</span>
                        <span>→</span>
                     </a>
                  </div>
               </div>
            </div>
         </div>

         {/* 3. LIGHTBOX GALLERY MODAL (Screenshot 2 Replica) */}
         {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md">
               {/* Modal Content Box with Cyan Border */}
               <div className="relative w-full max-w-5xl rounded-lg border-4 border-[#0092d0] bg-black p-2 sm:p-4 shadow-2xl">
                  {/* Close Button Top Right */}
                  <button
                     type="button"
                     onClick={() => setSelectedItem(null)}
                     className="absolute -right-4 -top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#0092d0] text-white shadow-lg transition hover:bg-cyan-400 hover:scale-110"
                     aria-label="Tutup Galeri"
                  >
                     ✕
                  </button>

                  {/* Previous Arrow Left */}
                  <button
                     type="button"
                     onClick={handlePrevItem}
                     className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white border border-cyan-400/50 text-xl backdrop-blur-md transition hover:bg-[#0092d0] hover:scale-110"
                     aria-label="Gambar Sebelumnya"
                  >
                     ‹
                  </button>

                  {/* Next Arrow Right */}
                  <button
                     type="button"
                     onClick={handleNextItem}
                     className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white border border-cyan-400/50 text-xl backdrop-blur-md transition hover:bg-[#0092d0] hover:scale-110"
                     aria-label="Gambar Selanjutnya"
                  >
                     ›
                  </button>

                  {/* Display Media View (Image or Video) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-zinc-950 flex items-center justify-center">
                     {selectedItem.type === "image" ? (
                        <div className={`relative h-full w-full bg-gradient-to-br ${selectedItem.item.placeholderGradient}`}>
                           <Image
                              src={(selectedItem.item as ScreenshotItem).src}
                              alt={selectedItem.item.title}
                              fill
                              className="object-contain"
                              priority
                           />
                        </div>
                     ) : (
                        <video
                           src={(selectedItem.item as VideoItem).videoUrl}
                           controls
                           autoPlay
                           className="h-full w-full object-contain"
                        />
                     )}
                  </div>

                  {/* Footer Info inside Modal */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 font-sans text-xs text-white">
                     <span className="font-semibold text-cyan-400">
                        {selectedItem.item.title}
                     </span>
                     <span className="font-mono text-[10px] text-white/50">
                        Gunakan tombol panah ‹ › atau Keyboard (← → / Esc)
                     </span>
                  </div>
               </div>
            </div>
         )}
      </section>
   );
}
