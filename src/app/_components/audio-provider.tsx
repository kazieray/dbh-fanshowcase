"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";

type AudioContextValue = {
   setAudioEnabled: (enabled: boolean) => Promise<void>;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
   const audioRef = useRef<HTMLAudioElement>(null);

   async function setAudioEnabled(enabled: boolean) {
      const audio = audioRef.current;

      if (!audio) return;

      if (!enabled) {
         audio.pause();
         audio.currentTime = 0;
         return;
      }

      audio.volume = 0;

      try {
         await audio.play();
         fadeAudioIn(audio);
      } catch (error) {
         console.error("Audio gagal diputar:", error);
      }
   }

   function fadeAudioIn(audio: HTMLAudioElement) {
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
      <AudioContext.Provider value={{ setAudioEnabled }}>
         <audio ref={audioRef} src="/sounds/dbh-ambience.mp3" preload="auto" loop aria-hidden="true" />
         {children}
      </AudioContext.Provider>
   );
}

export function useAudio() {
   const context = useContext(AudioContext);

   if (!context) {
      throw new Error("useAudio harus digunakan di dalam AudioProvider");
   }

   return context;
}