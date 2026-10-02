"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import type { GalleryImage } from "@/data/characters";

type CharacterGalleryProps = {
   gallery: GalleryImage[];
   characterName: string;
   isTransitioning: boolean;
};

type ModalState = {
   open: boolean;
   item: GalleryImage | null;
   index: number;
};

export default function CharacterGallery({ gallery, characterName, isTransitioning }: CharacterGalleryProps) {
   const [modal, setModal] = useState<ModalState>({ open: false, item: null, index: 0 });
   const [isModalClosing, setIsModalClosing] = useState(false);

   const openModal = useCallback((item: GalleryImage, index: number) => {
      setIsModalClosing(false);
      setModal({ open: true, item, index });
   }, []);

   const closeModal = useCallback(() => {
      setIsModalClosing(true);
      window.setTimeout(() => {
         setModal((prev) => ({ ...prev, open: false }));
         setIsModalClosing(false);
      }, 900);
   }, []);

   const navigate = useCallback((dir: -1 | 1) => {
      setModal((prev) => {
         const next = (prev.index + dir + gallery.length) % gallery.length;
         return { open: true, item: gallery[next]!, index: next };
      });
   }, [gallery]);

   // Close on Escape, navigate with arrow keys
   useEffect(() => {
      if (!modal.open) return;
      const handler = (e: KeyboardEvent) => {
         if (e.key === "Escape") closeModal();
         if (e.key === "ArrowRight") navigate(1);
         if (e.key === "ArrowLeft") navigate(-1);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
   }, [modal.open, closeModal, navigate]);

   return (
      <>
         {/* ─── LEFT PANEL ─── */}
         <div
            className="pointer-events-none absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 md:left-6 md:flex lg:left-8 xl:left-10"
            style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 0.4s ease" }}
         >
            {/* HEADER LABEL */}
            <div className="flex items-center gap-2">
               <div className="h-px w-5 bg-dbh-blue/60" />
               <span className="font-mono text-[7px] uppercase tracking-[0.28em] text-dbh-blue/70">
                  {characterName} / Log
               </span>
            </div>

         {/* PHOTO CARDS */}
         <div className="group/gallery flex flex-col gap-4">
            {gallery.map((item, index) => (
               <button
                  key={item.src}
                  type="button"
                  onClick={() => openModal(item, index)}
                  className="group pointer-events-auto relative cursor-pointer text-left transition-all duration-500 group-hover/gallery:blur-[3px] group-hover/gallery:opacity-45 hover:!blur-none hover:!opacity-100 origin-left hover:scale-110 active:scale-95"
                  aria-label={`View ${item.label}`}
               >
                  {/* PHOTO FRAME */}
                  <div className="news-card liquid-glass relative h-[110px] w-[180px] overflow-hidden rounded-xl border border-white/10 lg:h-[130px] lg:w-[210px] xl:h-[150px] xl:w-[240px]">
                     {/* IMAGE */}
                     <Image
                        src={item.src}
                        alt={`${characterName} — ${item.label}`}
                        fill
                        sizes="(min-width: 1280px) 240px, (min-width: 1024px) 210px, 180px"
                        className="object-cover transition-transform duration-700 group-hover:scale-125 origin-left"
                     />

                     {/* GLASS LABEL */}
                     <span className="glass-label absolute left-3 top-3 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/95">
                        Scene {index + 1}
                     </span>

                     {/* GRADIENT OVERLAY */}
                     <div className="absolute inset-0 bg-linear-to-t from-black via-black/5 to-transparent" />
                  </div>
               </button>
            ))}
         </div>

            {/* FOOTER DECORATION */}
            <div className="flex items-center gap-2 pt-0.5">
               <div className="h-px w-5 bg-dbh-blue/40" />
               <div className="h-1 w-1 rounded-none bg-dbh-blue/50" />
               <div className="h-px flex-1 bg-white/8" />
            </div>
         </div>

         {/* ─── MODAL ─── */}
         {modal.open && modal.item && (
            <div
               className={`news-modal fixed inset-0 z-[100] flex min-h-svh items-center justify-center overflow-y-auto bg-[#030609]/72 p-4 backdrop-blur-xl sm:p-8 ${isModalClosing ? "news-modal-closing" : ""}`}
               role="dialog"
               aria-modal="true"
               aria-label={`${characterName} — ${modal.item.label}`}
            >
               <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="nav-glass-control fixed right-5 top-5 z-[101] flex h-11 w-11 items-center justify-center rounded-full"
               >
                  <X size={20} />
               </button>

               {/* MODAL CONTENT */}
               <article className="news-modal-window relative flex w-[92vw] max-w-5xl aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#05080d] shadow-2xl md:rounded-2xl">
                  {/* IMAGE */}
                  <Image
                     src={modal.item.src}
                     alt={`${characterName} — ${modal.item.label}`}
                     fill
                     sizes="(max-width: 1024px) 92vw, 1024px"
                     className="object-cover"
                     priority
                  />
                  
                  {/* INVISIBLE NAVIGATION AREAS FOR MOBILE */}
                  <button 
                     onClick={(e) => { e.stopPropagation(); navigate(-1); }} 
                     className="absolute left-0 top-0 bottom-0 z-10 w-1/3 cursor-w-resize outline-none" 
                     aria-label="Previous image" 
                  />
                  <button 
                     onClick={(e) => { e.stopPropagation(); navigate(1); }} 
                     className="absolute right-0 top-0 bottom-0 z-10 w-1/3 cursor-e-resize outline-none" 
                     aria-label="Next image" 
                  />
               </article>
            </div>
         )}
      </>
   );
}
