"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGameplay() {
   const rootRef = useRef<HTMLElement>(null);

   const heroVideoRef = useRef<HTMLVideoElement>(null);
   const heroTitleRef = useRef<HTMLHeadingElement>(null);
   const heroDescriptionRef = useRef<HTMLParagraphElement>(null);

   const featuresSectionRef = useRef<HTMLElement>(null);
   const featuresTitleRef = useRef<HTMLHeadingElement>(null);
   const cardAnimationRefs = useRef<(HTMLDivElement | null)[]>([]);

   const experienceSectionRef = useRef<HTMLElement>(null);
   const experienceTitleRef = useRef<HTMLHeadingElement>(null);
   const videoOneRef = useRef<HTMLDivElement>(null);
   const videoTwoRef = useRef<HTMLDivElement>(null);
   const ctaRef = useRef<HTMLDivElement>(null);

   const setCardAnimationRef = useCallback(
      (index: number) => (element: HTMLDivElement | null) => {
         cardAnimationRefs.current[index] = element;
      },
      [],
   );

   useEffect(() => {
      const scroller = rootRef.current;

      if (!scroller) return;

      const context = gsap.context(() => {
         const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

         const animationTargets = [
            heroVideoRef.current,
            heroTitleRef.current,
            heroDescriptionRef.current,
            featuresTitleRef.current,
            experienceTitleRef.current,
            videoOneRef.current,
            videoTwoRef.current,
            ctaRef.current,
            ...cardAnimationRefs.current,
         ].filter(Boolean);

         if (reducedMotion) {
            gsap.set(animationTargets, {
               clearProps: "all",
            });

            return;
         }

         const animateHero = () => {
            const heroVideo = heroVideoRef.current;
            const heroTitle = heroTitleRef.current;
            const heroDescription = heroDescriptionRef.current;

            if (!heroVideo || !heroTitle || !heroDescription) return;

            gsap.killTweensOf([heroVideo, heroTitle, heroDescription]);

            gsap.set(heroVideo, {
               scale: 1.34,
               filter: "blur(3px)",
            });

            gsap.set(heroTitle, {
               autoAlpha: 0,
               y: 55,
               filter: "blur(10px)",
               letterSpacing: "0.02em",
            });

            gsap.set(heroDescription, {
               autoAlpha: 0,
               y: 24,
               filter: "blur(6px)",
            });

            const timeline = gsap.timeline({
               defaults: {
                  ease: "power3.out",
               },
            });

            timeline
               .to(heroVideo, {
                  scale: 1.2,
                  filter: "blur(1.5px)",
                  duration: 2.4,
                  ease: "power2.out",
               })
               .to(
                  heroTitle,
                  {
                     autoAlpha: 1,
                     y: 0,
                     filter: "blur(0px)",
                     letterSpacing: "-0.05em",
                     duration: 1.25,
                     ease: "power4.out",
                  },
                  0.25,
               )
               .to(
                  heroDescription,
                  {
                     autoAlpha: 1,
                     y: 0,
                     filter: "blur(0px)",
                     duration: 0.9,
                     ease: "power3.out",
                  },
                  0.72,
               );

            return timeline;
         };

         const animateFeatures = () => {
            const featuresSection = featuresSectionRef.current;
            const featuresTitle = featuresTitleRef.current;
            const cards = cardAnimationRefs.current.filter((card): card is HTMLDivElement => Boolean(card));

            if (!featuresSection || !featuresTitle) return;

            gsap.set(featuresTitle, {
               autoAlpha: 0,
               y: 35,
               scale: 0.97,
               filter: "blur(8px)",
            });

            const cardDirections = [
               {
                  x: -120,
                  y: -90,
                  rotation: -4,
               },
               {
                  x: 15,
                  y: -120,
                  rotation: 3,
               },
               {
                  x: 120,
                  y: -80,
                  rotation: 4,
               },
               {
                  x: 10,
                  y: 110,
                  rotation: -2,
               },
               {
                  x: -120,
                  y: 95,
                  rotation: -4,
               },
               {
                  x: 120,
                  y: 100,
                  rotation: 4,
               },
            ];

            cards.forEach((card, index) => {
               const direction = cardDirections[index] ?? {
                  x: 0,
                  y: 80,
                  rotation: 0,
               };

               gsap.set(card, {
                  autoAlpha: 0,
                  x: direction.x,
                  y: direction.y,
                  rotation: direction.rotation,
                  scale: 0.88,
                  filter: "blur(5px)",
               });
            });

            const timeline = gsap.timeline({
               paused: true,
            });

            timeline
               .to(featuresTitle, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 1,
                  ease: "power3.out",
               })
               .to(
                  cards,
                  {
                     autoAlpha: 1,
                     x: 0,
                     y: 0,
                     rotation: 0,
                     scale: 1,
                     filter: "blur(0px)",
                     duration: 1.15,
                     stagger: {
                        each: 0.11,
                        from: "random",
                     },
                     ease: "back.out(1.15)",
                  },
                  0.18,
               );

            ScrollTrigger.create({
               trigger: featuresSection,
               scroller,
               start: "top 70%",
               once: true,
               onEnter: () => timeline.play(),
            });
         };

         const animateExperience = () => {
            const experienceSection = experienceSectionRef.current;
            const experienceTitle = experienceTitleRef.current;
            const videoOne = videoOneRef.current;
            const videoTwo = videoTwoRef.current;
            const cta = ctaRef.current;

            if (!experienceSection || !experienceTitle || !videoOne || !videoTwo || !cta) return;

            gsap.set(experienceTitle, {
               autoAlpha: 0,
               x: -45,
            });

            gsap.set(videoOne, {
               autoAlpha: 0,
               y: 45,
               scale: 0.96,
            });

            gsap.set(videoTwo, {
               autoAlpha: 0,
               y: 55,
               scale: 0.96,
            });

            gsap.set(cta, {
               autoAlpha: 0,
               y: 28,
            });

            const timeline = gsap.timeline({
               paused: true,
               defaults: {
                  ease: "power3.out",
               },
            });

            timeline
               .to(experienceTitle, {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.85,
               })
               .to(
                  videoOne,
                  {
                     autoAlpha: 1,
                     y: 0,
                     scale: 1,
                     duration: 0.9,
                  },
                  0.15,
               )
               .to(
                  videoTwo,
                  {
                     autoAlpha: 1,
                     y: 0,
                     scale: 1,
                     duration: 0.9,
                  },
                  0.35,
               )
               .to(
                  cta,
                  {
                     autoAlpha: 1,
                     y: 0,
                     duration: 0.75,
                  },
                  0.65,
               );

            ScrollTrigger.create({
               trigger: experienceSection,
               scroller,
               start: "top 65%",
               once: true,
               onEnter: () => timeline.play(),
            });
         };

         /*
          * HERO — FIRST PAGE LOAD
          */
         animateHero();

         /*
          * HERO — REPLAY WHEN SCROLLING BACK UP
          *
          * Features berada tepat setelah Hero.
          *
          * Saat user scroll turun:
          * Hero -> Features
          *
          * Saat user scroll balik ke atas dan Features
          * keluar dari viewport bagian bawah,
          * entrance Hero dimainkan ulang.
          */
         if (featuresSectionRef.current) {
            ScrollTrigger.create({
               trigger: featuresSectionRef.current,
               scroller,
               start: "top 70%",
               onLeaveBack: () => {
                  animateHero();
               },
            });
         }

         animateFeatures();
         animateExperience();

         ScrollTrigger.refresh();
      }, rootRef);

      return () => context.revert();
   }, []);

   return {
      rootRef,
      heroVideoRef,
      heroTitleRef,
      heroDescriptionRef,
      featuresSectionRef,
      featuresTitleRef,
      setCardAnimationRef,
      experienceSectionRef,
      experienceTitleRef,
      videoOneRef,
      videoTwoRef,
      ctaRef,
   };
}
