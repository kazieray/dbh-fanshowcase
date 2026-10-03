"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";
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
         className="nav-glass-control group fixed bottom-4 right-4 z-40 flex h-9 items-center justify-end overflow-hidden rounded-full sm:bottom-5 sm:right-5 sm:h-10 lg:h-11"
      >
         <span className="max-w-0 translate-x-1 overflow-hidden whitespace-nowrap pl-0 font-mono text-[9px] font-medium uppercase tracking-[0.06em] text-white/75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-20 group-hover:translate-x-0 group-hover:pl-3.5 group-hover:opacity-100 group-focus-visible:max-w-20 group-focus-visible:translate-x-0 group-focus-visible:pl-3.5 group-focus-visible:opacity-100 sm:text-[10px] sm:group-hover:pl-4 sm:group-focus-visible:pl-4 lg:text-[11px] lg:group-hover:pl-[18px] lg:group-focus-visible:pl-[18px]">
            {label}
         </span>

         <span className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10 lg:h-11 lg:w-11">
            <Icon className="h-[15px] w-[15px] transition-colors duration-300 group-hover:text-dbh-blue sm:h-4 sm:w-4 lg:h-[17px] lg:w-[17px]" strokeWidth={1.8} />
         </span>
      </button>
   );
}
