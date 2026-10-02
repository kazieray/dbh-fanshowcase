"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";

import { stories } from "@/data/news";
import { gsap } from "@/lib/gsap";

export type Story = (typeof stories)[number];
export type Language = "en" | "id";

export const categoryLabels: Record<string, { en: string; id: string }> = {
   Rilis: { en: "Release", id: "Rilis" },
   Industri: { en: "Industry", id: "Industri" },
   Wawancara: { en: "Interview", id: "Wawancara" },
   Pengembangan: { en: "Development", id: "Pengembangan" },
   Penjualan: { en: "Sales", id: "Penjualan" },
   Karakter: { en: "Characters", id: "Karakter" },
   Kritik: { en: "Criticism", id: "Kritik" },
   Trailer: { en: "Trailer", id: "Trailer" },
   Studio: { en: "Studio", id: "Studio" },
   PC: { en: "PC", id: "PC" },
   Review: { en: "Review", id: "Ulasan" },
   Gameplay: { en: "Gameplay", id: "Gameplay" },
   Preview: { en: "Preview", id: "Pratinjau" },
};

export function storyTitle(story: Story, language: Language) {
   return language === "en" ? story.title : story.titleId;
}

export function localizeDate(date: string, language: Language) {
   if (language === "id") return date;

   return date.replace("MEI", "MAY").replace("AGU", "AUG").replace("OKT", "OCT").replace("DES", "DEC");
}

export function useNews() {
   const [selectedStory, setSelectedStory] = useState<Story | null>(null);
   const [isModalClosing, setIsModalClosing] = useState(false);

   function openStory(story: Story) {
      setIsModalClosing(false);
      setSelectedStory(story);
   }

   function closeStory() {
      setIsModalClosing(true);

      window.setTimeout(() => {
         setSelectedStory(null);
         setIsModalClosing(false);
      }, 900);
   }

   useEffect(() => {
      if (!selectedStory) return;

      function closeOnEscape(event: KeyboardEvent) {
         if (event.key === "Escape") closeStory();
      }

      document.addEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "hidden";

      return () => {
         document.removeEventListener("keydown", closeOnEscape);
         document.body.style.overflow = "";
      };
   }, [selectedStory]);

   return {
      selectedStory,
      isModalClosing,
      openStory,
      closeStory,
   };
}

export function useNewsGrid() {
   const [visibleCount, setVisibleCount] = useState(4);
   const [isLoadingMore, setIsLoadingMore] = useState(false);

   async function loadMoreStories() {
      if (isLoadingMore) return;

      setIsLoadingMore(true);

      await new Promise((resolve) => window.setTimeout(resolve, 520));

      setVisibleCount((count) => Math.min(count + 4, stories.length));
      setIsLoadingMore(false);
   }

   return {
      visibleCount,
      isLoadingMore,
      loadMoreStories,
   };
}

export function useNewsHero() {
   const heroRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);

   useLayoutEffect(() => {
      if (!heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const context = gsap.context(() => {
         const timeline = gsap.timeline({
            defaults: {
               ease: "power4.out",
            },
         });

         timeline
            .fromTo(".news-hero-kicker", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
            .fromTo(".news-hero-char", { yPercent: 120, rotateX: -75, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.85, stagger: 0.035 }, "-=0.35")
            .fromTo(".news-hero-second-line", { x: -28, opacity: 0, skewX: -8 }, { x: 0, opacity: 1, skewX: 0, duration: 0.9 }, "-=0.5")
            .fromTo(".news-hero-rule", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.7 }, "-=0.55")
            .fromTo(".news-hero-copy", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.35");

         gsap.to(".news-hero-rule-pulse", {
            xPercent: 500,
            duration: 2.4,
            repeat: -1,
            repeatDelay: 1.6,
            ease: "power2.inOut",
         });
      }, heroRef);

      return () => {
         context.revert();
      };
   }, []);

   function handleTitlePointerMove(event: PointerEvent<HTMLDivElement>) {
      if (!titleRef.current || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

      const characters = titleRef.current.querySelectorAll<HTMLElement>(".news-hero-char");
      const lightCharacters = titleRef.current.querySelectorAll<HTMLElement>(".news-hero-light-char");

      const radius = 175;
      const lightRadius = 125;

      characters.forEach((character) => {
         const bounds = character.getBoundingClientRect();
         const centerX = bounds.left + bounds.width / 2;
         const centerY = bounds.top + bounds.height / 2;
         const distanceX = event.clientX - centerX;
         const distanceY = event.clientY - centerY;
         const distance = Math.hypot(distanceX, distanceY);
         const influence = Math.max(0, 1 - distance / radius);

         gsap.to(character, {
            x: -distanceX * 0.18 * influence,
            y: -distanceY * 0.24 * influence,
            rotation: distanceX * 0.12 * influence,
            color: influence > 0.08 ? "#52c7ff" : "#f3f6f8",
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
         });
      });

      lightCharacters.forEach((character) => {
         const bounds = character.getBoundingClientRect();
         const centerX = bounds.left + bounds.width / 2;
         const centerY = bounds.top + bounds.height / 2;
         const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
         const influence = Math.max(0, 1 - distance / lightRadius);

         gsap.to(character, {
            color: influence > 0 ? "#f3f6f8" : "#ffffff73",
            opacity: 0.45 + influence * 0.55,
            scale: 1 + influence * 0.06,
            textShadow: influence > 0.04 ? `0 0 ${8 + influence * 18}px rgba(243,246,248,${0.25 + influence * 0.55})` : "0 0 0 rgba(243,246,248,0)",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
         });
      });
   }

   function resetTitleMotion() {
      if (!titleRef.current) return;

      gsap.to(titleRef.current.querySelectorAll<HTMLElement>(".news-hero-char"), {
         x: 0,
         y: 0,
         rotation: 0,
         color: "#f3f6f8",
         duration: 0.75,
         stagger: 0.018,
         ease: "elastic.out(1, 0.55)",
         overwrite: "auto",
      });

      gsap.to(titleRef.current.querySelectorAll<HTMLElement>(".news-hero-light-char"), {
         color: "#ffffff73",
         opacity: 0.45,
         scale: 1,
         textShadow: "0 0 0 rgba(243,246,248,0)",
         duration: 0.6,
         stagger: 0.02,
         ease: "power3.out",
         overwrite: "auto",
      });
   }

   return {
      heroRef,
      titleRef,
      handleTitlePointerMove,
      resetTitleMotion,
   };
}
