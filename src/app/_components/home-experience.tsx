"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Hero from "./hero";
import StorySection from "./story-section";
import ProtagonistsSection from "./protagonists-section";
import FeaturesSection from "./features-section";
import DeviantTest from "./deviant-test";
import Preloader from "./preloader";
import Navbar from "@/components/navigation/navbar";

export default function HomeExperience() {
   const audioRef = useRef<HTMLAudioElement>(null);

   const [heroActive, setHeroActive] = useState(false);
   const [preloaderVisible, setPreloaderVisible] = useState(true);
   const [, setSoundEnabled] = useState(false);
   const [, setMenuOpen] = useState(false);

   useLayoutEffect(() => {
      if (!heroActive) return;

      const ctx = gsap.context(() => {
         // Subtle parallax scale on the main background when scrolling
         gsap.to(".bg-layer-1", {
            scale: 1.15,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
               trigger: document.documentElement,
               start: "top top",
               end: "bottom bottom",
               scrub: true,
            }
         });
      });

      return () => ctx.revert();
   }, [heroActive]);

   async function handleEnter(withSound: boolean) {
      setHeroActive(true);
      setSoundEnabled(withSound);

      if (withSound && audioRef.current) {
         audioRef.current.volume = 0;

         try {
            await audioRef.current.play();
            fadeAudioIn();
         } catch (error) {
            console.error("Audio gagal diputar:", error);
            setSoundEnabled(false);
         }
      }
   }

   function fadeAudioIn() {
      const audioElement = audioRef.current;

      if (!audioElement) return;

      const targetVolume = 0.35;
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime: number) {
         const elapsed = currentTime - startTime;
         const progress = Math.max(0, Math.min(elapsed / duration, 1));

         audioElement.volume = targetVolume * progress;

         if (progress < 1) {
            requestAnimationFrame(update);
         }
      }

      requestAnimationFrame(update);
   }

   return (
      <main className="relative min-h-svh bg-dbh-bg">
         {/* Background Layers */}
         <div className="bg-layer-1 pointer-events-none fixed inset-0 z-0 bg-[url('/images/bg-dbh.jpg')] bg-cover bg-center bg-no-repeat" style={{ willChange: "transform" }} />

         <audio ref={audioRef} src="/sounds/dbh-ambience.mp3" preload="auto" loop />

         <Hero active={heroActive} />
         
         {heroActive && (
            <>
               <StorySection />
               <ProtagonistsSection />
               <FeaturesSection />
               <DeviantTest />
            </>
         )}

         <Navbar active={heroActive} />

         {preloaderVisible && <Preloader onEnter={handleEnter} onExitComplete={() => setPreloaderVisible(false)} />}
      </main>
   );
}
