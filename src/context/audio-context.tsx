"use client";

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type AudioContextValue = {
   isAudioEnabled: boolean;
   toggleAudio: () => Promise<void>;
};

export const AudioContext = createContext<AudioContextValue | null>(null);

type AudioProviderProps = {
   children: ReactNode;
};

export function AudioProvider({ children }: AudioProviderProps) {
   const audioRef = useRef<HTMLAudioElement | null>(null);
   const [isAudioEnabled, setIsAudioEnabled] = useState(false);

   useEffect(() => {
      const audio = new Audio("/sounds/dbh-ambience.mp3");

      audio.loop = true;
      audio.volume = 0.22;
      audio.preload = "auto";

      audioRef.current = audio;

      return () => {
         audio.pause();
         audio.src = "";
         audioRef.current = null;
      };
   }, []);

   const toggleAudio = useCallback(async () => {
      const audio = audioRef.current;

      if (!audio) return;

      if (audio.paused) {
         try {
            await audio.play();
            setIsAudioEnabled(true);
         } catch (error) {
            console.error("Unable to play ambient audio:", error);
         }

         return;
      }

      audio.pause();
      setIsAudioEnabled(false);
   }, []);

   return <AudioContext.Provider value={{ isAudioEnabled, toggleAudio }}>{children}</AudioContext.Provider>;
}
