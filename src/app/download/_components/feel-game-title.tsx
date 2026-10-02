"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

export default function FeelGameTitle({ title }: { title: string }) {
   const titleRef = useRef<HTMLSpanElement>(null);

   useLayoutEffect(() => {
      const element = titleRef.current;
      if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      element.classList.remove("is-visible");
      void element.offsetWidth;
      const frame = window.requestAnimationFrame(() => element.classList.add("is-visible"));

      return () => window.cancelAnimationFrame(frame);
   }, [title]);

   useLayoutEffect(() => {
      const title = titleRef.current;
      const hero = title?.closest<HTMLElement>(".play-hero");
      if (!title || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const epicCard = hero.querySelector<HTMLElement>(".play-platform-epic");
      const playstationCard = hero.querySelector<HTMLElement>(".play-platform-playstation");
      const steamCard = hero.querySelector<HTMLElement>(".play-platform-steam");
      if (!epicCard || !playstationCard || !steamCard) return;

      const titleElement = title;
      const heroElement = hero;
      const epicElement = epicCard;
      const playstationElement = playstationCard;
      const steamElement = steamCard;

      function renderProgress() {
         const heroBounds = heroElement.getBoundingClientRect();
         const progress = Math.max(0, Math.min(-heroBounds.top / heroBounds.height, 1));

         const titleTravel = titleElement.offsetHeight + 80;
         titleElement.style.translate = `0 ${-progress * titleTravel}px`;
         titleElement.style.opacity = `${1 - progress}`;
         titleElement.style.filter = `blur(${progress * 15}px)`;

         epicElement.style.translate = `${-progress * (epicElement.offsetWidth + 80)}px 0`;
         epicElement.style.opacity = `${1 - progress}`;
         epicElement.style.filter = `blur(${progress * 8}px)`;

         playstationElement.style.translate = `0 ${progress * (playstationElement.offsetHeight + 80)}px`;
         playstationElement.style.opacity = `${1 - progress}`;
         playstationElement.style.filter = `blur(${progress * 8}px)`;

         steamElement.style.translate = `${progress * (steamElement.offsetWidth + 80)}px 0`;
         steamElement.style.opacity = `${1 - progress}`;
         steamElement.style.filter = `blur(${progress * 8}px)`;
      }

      window.addEventListener("scroll", renderProgress, { passive: true });
      renderProgress();

      return () => {
         window.removeEventListener("scroll", renderProgress);
         [titleElement, epicElement, playstationElement, steamElement].forEach((element) => {
            element.style.removeProperty("translate");
            element.style.removeProperty("opacity");
            element.style.removeProperty("filter");
         });
      };
   }, []);

   let characterIndex = 0;

   return (
      <h1 aria-label={title} className="feel-game-title mx-auto mt-2 max-w-full text-balance font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em] text-white drop-shadow-[0_4px_24px_rgba(3,8,15,0.55)] sm:mt-3">
         <span ref={titleRef} aria-hidden="true" className="feel-game-title-motion">
            {title.split(" ").map((word, wordIndex) => (
               <Fragment key={`${word}-${wordIndex}`}>
                  {wordIndex > 0 ? " " : null}
                  <span className="feel-game-word">
                     {word.split("").map((character) => {
                        const currentCharacterIndex = characterIndex++;

                        return <span key={`${character}-${currentCharacterIndex}`} className="feel-game-letter" style={{ animationDelay: `${currentCharacterIndex * 100}ms` }}>{character}</span>;
                     })}
                  </span>
               </Fragment>
            ))}
         </span>
      </h1>
   );
}