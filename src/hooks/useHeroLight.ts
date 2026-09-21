"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

type LightState = {
   x: number; // posisi cahaya (koordinat viewport)
   y: number;
   r: number; // radius saat ini (px)
   targetR: number;
   pointer: boolean; // true kalau mouse sedang dipakai
   visible: boolean;
   revealed: boolean;
};

const radius = () => Math.max(240, Math.min(window.innerWidth, window.innerHeight) * 0.5);

/**
 * Kota gelap, hanya terang di sekitar kursor.
 * - mouse: cahaya mengikuti kursor (dihaluskan dengan gsap.quickTo)
 * - layar sentuh / mouse belum bergerak: cahaya bergerak pelan sendiri
 * Hook ini menulis CSS variable (--lx --ly --lr --ox --oy) ke elemen hero,
 * dan (--tx --ty) ke elemen judul, jadi tidak ada re-render React per frame.
 */
export function useHeroLight(heroRef: RefObject<HTMLElement | null>, titleRef: RefObject<HTMLElement | null>) {
   const light = useRef<LightState>({
      x: 0,
      y: 0,
      r: 0,
      targetR: 0,
      pointer: false,
      visible: true,
      revealed: false,
   });

   useEffect(() => {
      const hero = heroRef.current;
      const title = titleRef.current;
      if (!hero || !title) return;

      const L = light.current;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const rect0 = hero.getBoundingClientRect();
      L.x = rect0.left + rect0.width * 0.5;
      L.y = rect0.top + rect0.height * 0.42;

      const follow = reduce ? 0 : 0.7;
      const xTo = gsap.quickTo(L, "x", { duration: follow, ease: "power3" });
      const yTo = gsap.quickTo(L, "y", { duration: follow, ease: "power3" });

      const onPointerMove = (e: PointerEvent) => {
         if (e.pointerType === "touch") return;
         L.pointer = true;
         xTo(e.clientX);
         yTo(e.clientY);
      };
      const onLeave = () => {
         L.pointer = false;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);

      const onResize = () => {
         if (!L.revealed) return;
         L.targetR = radius();
         gsap.to(L, { r: L.targetR, duration: 0.6, overwrite: "auto" });
      };
      window.addEventListener("resize", onResize);

      const io = new IntersectionObserver(([entry]) => {
         L.visible = entry.isIntersecting;
      });
      io.observe(hero);

      const tick = (time: number) => {
         if (!L.visible) return;
         const rect = hero.getBoundingClientRect();

         if (!L.pointer && !reduce) {
            xTo(rect.left + rect.width * (0.5 + 0.3 * Math.sin(time * 0.35)));
            yTo(rect.top + rect.height * (0.42 + 0.14 * Math.sin(time * 0.52 + 1)));
         }

         const lx = L.x - rect.left;
         const ly = L.y - rect.top;
         hero.style.setProperty("--lx", `${lx.toFixed(1)}px`);
         hero.style.setProperty("--ly", `${ly.toFixed(1)}px`);
         hero.style.setProperty("--lr", `${L.r.toFixed(1)}px`);

         // sedikit kedalaman: gambar bergeser berlawanan arah cahaya, dan mengikuti scroll
         const ox = reduce ? 0 : -(lx / rect.width - 0.5) * 34;
         const oy = reduce ? 0 : -(ly / rect.height - 0.5) * 20 + window.scrollY * 0.22;
         hero.style.setProperty("--ox", `${ox.toFixed(1)}px`);
         hero.style.setProperty("--oy", `${oy.toFixed(1)}px`);

         // judul memakai cahaya yang sama
         const tr = title.getBoundingClientRect();
         title.style.setProperty("--tx", `${(L.x - tr.left).toFixed(1)}px`);
         title.style.setProperty("--ty", `${(L.y - tr.top).toFixed(1)}px`);
      };
      gsap.ticker.add(tick);

      return () => {
         gsap.ticker.remove(tick);
         gsap.killTweensOf(L);
         window.removeEventListener("pointermove", onPointerMove);
         window.removeEventListener("resize", onResize);
         document.documentElement.removeEventListener("mouseleave", onLeave);
         io.disconnect();
      };
   }, [heroRef, titleRef]);

   /** Nyalakan cahaya: radius tumbuh dari 0. Dipanggil saat hero mulai muncul. */
   const reveal = useCallback(() => {
      const L = light.current;
      L.revealed = true;
      L.targetR = radius();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(L, { r: L.targetR, duration: reduce ? 0 : 2.6, ease: "power2.out", overwrite: "auto" });
   }, []);

   return { reveal };
}
