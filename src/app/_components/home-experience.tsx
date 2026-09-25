"use client";

import { useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Hero from "./hero";
import StorySection from "./story-section";
import ProtagonistsSection from "./protagonists-section";
import FeaturesSection from "./features-section";
import DeviantTest from "./deviant-test";
import Preloader from "./preloader";
import { useAudio } from "./audio-provider";
import Navbar from "@/components/navigation/navbar";

export default function HomeExperience() {
   const { setAudioEnabled } = useAudio();

   const [heroActive, setHeroActive] = useState(false);
   const [preloaderVisible, setPreloaderVisible] = useState(true);

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
      await setAudioEnabled(withSound);
   }

   return (
      <main className="relative min-h-svh bg-dbh-bg">
         {/* Background Layers */}
         <div className="bg-layer-1 pointer-events-none fixed inset-0 z-0 bg-[url('/images/bg-dbh.jpg')] bg-cover bg-center bg-no-repeat" style={{ willChange: "transform" }} />

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
