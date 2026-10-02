"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function AudioToggle() {
   const { copy } = useLanguage();
   const audioRef = useRef<HTMLAudioElement | null>(null);
   const [isAudioEnabled, setAudioEnabled] = useState(false);
   const label = isAudioEnabled ? copy.audio.mute : copy.audio.unmute;
   const Icon = isAudioEnabled ? Volume2 : VolumeX;

   useEffect(() => () => audioRef.current?.pause(), []);

   async function toggleAudio() {
      let audio = audioRef.current;
      if (!audio) {
         audio = new Audio("/sounds/dbh-ambience.mp3");
         audio.loop = true;
         audio.volume = 0.35;
         audioRef.current = audio;
      }

      if (isAudioEnabled) {
         audio.pause();
         setAudioEnabled(false);
         return;
      }

      try {
         await audio.play();
         setAudioEnabled(true);
      } catch {
         setAudioEnabled(false);
      }
   }

   return (
      <button
         type="button"
         onClick={() => void toggleAudio()}
         aria-label={label}
         aria-pressed={isAudioEnabled}
         title={label}
         className="nav-glass-control fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full"
      >
         <Icon size={18} strokeWidth={1.8} />
      </button>
   );
}
