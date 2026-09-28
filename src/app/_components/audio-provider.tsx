"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type AudioContextValue = {
   isAudioEnabled: boolean;
   setAudioEnabled: (enabled: boolean) => Promise<void>;
   toggleAudio: () => Promise<void>;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
   const audioRef = useRef<HTMLAudioElement>(null);
   const [isAudioEnabled, setIsAudioEnabled] = useState(false);

   useEffect(() => {
      const restoreTimeout = window.setTimeout(() => {
         const audio = audioRef.current;
         if (!audio || localStorage.getItem("dbh-audio-enabled") !== "true") return;

         const savedTime = Number(localStorage.getItem("dbh-audio-time"));
         if (Number.isFinite(savedTime) && savedTime >= 0) audio.currentTime = savedTime;

         audio.muted = false;
         void audio.play().then(() => {
            setIsAudioEnabled(true);
            fadeAudioIn(audio);
         }).catch(() => setIsAudioEnabled(false));
      }, 0);

      const saveAudioTime = () => {
         const audio = audioRef.current;
         if (audio && localStorage.getItem("dbh-audio-enabled") === "true") {
            localStorage.setItem("dbh-audio-time", String(audio.currentTime));
         }
      };

      window.addEventListener("pagehide", saveAudioTime);

      return () => {
         window.clearTimeout(restoreTimeout);
         window.removeEventListener("pagehide", saveAudioTime);
      };
   }, []);

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

   const setAudioEnabled = useCallback(async (enabled: boolean) => {
      const audio = audioRef.current;

      if (!audio) return;

      if (!enabled) {
         localStorage.setItem("dbh-audio-enabled", "false");
         localStorage.removeItem("dbh-audio-time");
         audio.muted = true;
         audio.volume = 0;
         audio.pause();
         audio.currentTime = 0;
         setIsAudioEnabled(false);
         return;
      }

      localStorage.setItem("dbh-audio-enabled", "true");
      audio.muted = false;
      audio.volume = 0;

      try {
         await audio.play();
         setIsAudioEnabled(true);
         fadeAudioIn(audio);
      } catch (error) {
         setIsAudioEnabled(false);
         console.error("Audio gagal diputar:", error);
      }
   }, []);

   const toggleAudio = useCallback(async () => {
      const audio = audioRef.current;

      if (!audio) return;

      if (isAudioEnabled) {
         localStorage.setItem("dbh-audio-enabled", "false");
         localStorage.removeItem("dbh-audio-time");
         audio.muted = true;
         setIsAudioEnabled(false);
         return;
      }

      localStorage.setItem("dbh-audio-enabled", "true");
      audio.muted = false;
      audio.volume = 0;

      try {
         await audio.play();
         setIsAudioEnabled(true);
         fadeAudioIn(audio);
      } catch (error) {
         setIsAudioEnabled(false);
         console.error("Audio gagal diputar:", error);
      }
   }, [isAudioEnabled]);
   const value = useMemo(() => ({ isAudioEnabled, setAudioEnabled, toggleAudio }), [isAudioEnabled, setAudioEnabled, toggleAudio]);

   return (
      <AudioContext.Provider value={value}>
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