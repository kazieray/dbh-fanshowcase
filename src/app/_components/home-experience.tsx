"use client";

import { useRef, useState } from "react";

import Hero from "./hero";
import StorySection from "./story-section";
import ProtagonistsSection from "./protagonists-section";
import FeaturesSection from "./features-section";
import Preloader from "./preloader";
import Navbar from "@/components/navigation/navbar";

export default function HomeExperience() {
   const audioRef = useRef<HTMLAudioElement>(null);

   const [heroActive, setHeroActive] = useState(false);
   const [preloaderVisible, setPreloaderVisible] = useState(true);
   const [, setSoundEnabled] = useState(false);
   const [, setMenuOpen] = useState(false);

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

      const audio = audioElement;

      const targetVolume = 0.35;
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime: number) {
         const elapsed = currentTime - startTime;
         const progress = Math.max(0, Math.min(elapsed / duration, 1));

         audio.volume = targetVolume * progress;

         if (progress < 1) {
            requestAnimationFrame(update);
         }
      }

      requestAnimationFrame(update);
   }

   return (
      <main className="relative min-h-svh bg-[url('/images/bg-dbh.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
         {/* Global Dark Overlay */}
         <div className="pointer-events-none fixed inset-0 z-0 bg-black/65" />

         <audio ref={audioRef} src="/sounds/dbh-ambience.mp3" preload="auto" loop />

         <Hero active={heroActive} />
         
         {heroActive && (
            <>
               <StorySection />
               <ProtagonistsSection />
               <FeaturesSection />
            </>
         )}

         <Navbar active={heroActive} />

         {preloaderVisible && <Preloader onEnter={handleEnter} onExitComplete={() => setPreloaderVisible(false)} />}
      </main>
   );
}
