"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
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
   const [modal, setModal] = useState<ModalState>({
      open: false,
      item: null,
      index: 0,
   });

   const [isModalClosing, setIsModalClosing] = useState(false);

   const openModal = useCallback((item: GalleryImage, index: number) => {
      setIsModalClosing(false);
      setModal({
         open: true,
         item,
         index,
      });
   }, []);

   const closeModal = useCallback(() => {
      setIsModalClosing(true);

      window.setTimeout(() => {
         setModal((prev) => ({
            ...prev,
            open: false,
         }));

         setIsModalClosing(false);
      }, 900);
   }, []);

   const navigate = useCallback(
      (dir: -1 | 1) => {
         setModal((prev) => {
            const next = (prev.index + dir + gallery.length) % gallery.length;

            return {
               open: true,
               item: gallery[next]!,
               index: next,
            };
         });
      },
      [gallery],
   );

   useEffect(() => {
      if (!modal.open) return;

      const handler = (event: KeyboardEvent) => {
         if (event.key === "Escape") closeModal();
         if (event.key === "ArrowRight") navigate(1);
         if (event.key === "ArrowLeft") navigate(-1);
      };

      window.addEventListener("keydown", handler);

      return () => {
         window.removeEventListener("keydown", handler);
      };
   }, [modal.open, closeModal, navigate]);

   return (
      <>
         <div className="pointer-events-none absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col md:left-6 md:flex lg:left-8 xl:left-10" style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 0.4s ease" }}>
            <div className="mb-4 flex items-baseline gap-2">
               <span className="font-mono text-[8px] font-medium uppercase tracking-[0.2em] text-white/65 lg:text-[9px]">{characterName}</span>
               <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/25 lg:text-[8px]">Gallery</span>
            </div>

            <div className="group/gallery flex flex-col gap-3.5">
               {gallery.map((item, index) => (
                  <button
                     key={item.src}
                     type="button"
                     onClick={() => openModal(item, index)}
                     className="group pointer-events-auto relative origin-left cursor-pointer text-left transition-all duration-500 group-hover/gallery:opacity-45 hover:!opacity-100 hover:scale-[1.04] active:scale-[0.98]"
                     aria-label={`View ${item.label}`}
                  >
                     <div className="relative h-[110px] w-[180px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] lg:h-[130px] lg:w-[210px] xl:h-[150px] xl:w-[240px]">
                        <Image
                           src={item.src}
                           alt={`${characterName} — ${item.label}`}
                           fill
                           sizes="(min-width: 1280px) 240px, (min-width: 1024px) 210px, 180px"
                           className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
                           <span className="font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-white/75 lg:text-[9px]">{item.label}</span>

                           <span className="font-mono text-[7px] tabular-nums tracking-[0.12em] text-white/35">0{index + 1}</span>
                        </div>
                     </div>
                  </button>
               ))}
            </div>
         </div>

         {modal.open && modal.item && (
            <div
               className={`news-modal fixed inset-0 z-[100] flex min-h-svh items-center justify-center overflow-y-auto bg-[#030609]/72 p-4 backdrop-blur-xl sm:p-8 ${isModalClosing ? "news-modal-closing" : ""}`}
               role="dialog"
               aria-modal="true"
               aria-label={`${characterName} — ${modal.item.label}`}
            >
               <button type="button" onClick={closeModal} aria-label="Close" className="nav-glass-control fixed right-5 top-5 z-[101] flex h-11 w-11 items-center justify-center rounded-full">
                  <X size={20} />
               </button>

               <article className="news-modal-window relative flex aspect-video w-[92vw] max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#05080d] shadow-2xl md:rounded-2xl">
                  <Image src={modal.item.src} alt={`${characterName} — ${modal.item.label}`} fill sizes="(max-width: 1024px) 92vw, 1024px" className="object-cover" priority />

                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />

                  <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex items-baseline gap-2 sm:bottom-5 sm:left-5">
                     <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/85 sm:text-[10px]">{modal.item.label}</span>
                     <span className="font-mono text-[8px] tabular-nums tracking-[0.12em] text-white/35">
                        0{modal.index + 1} / 0{gallery.length}
                     </span>
                  </div>

                  <button
                     type="button"
                     onClick={(event) => {
                        event.stopPropagation();
                        navigate(-1);
                     }}
                     className="absolute bottom-0 left-0 top-0 z-10 w-1/3 cursor-w-resize outline-none"
                     aria-label="Previous image"
                  />

                  <button
                     type="button"
                     onClick={(event) => {
                        event.stopPropagation();
                        navigate(1);
                     }}
                     className="absolute bottom-0 right-0 top-0 z-10 w-1/3 cursor-e-resize outline-none"
                     aria-label="Next image"
                  />
               </article>
            </div>
         )}
      </>
   );
}
