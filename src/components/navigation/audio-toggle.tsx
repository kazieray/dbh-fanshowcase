"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/app/_components/audio-provider";
import { useLanguage } from "@/hooks/use-language";

export default function AudioToggle() {
   const { isAudioEnabled, toggleAudio } = useAudio();
   const { copy } = useLanguage();
   const label = isAudioEnabled ? copy.audio.mute : copy.audio.unmute;
   const Icon = isAudioEnabled ? Volume2 : VolumeX;

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
