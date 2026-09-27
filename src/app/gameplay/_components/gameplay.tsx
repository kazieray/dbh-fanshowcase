"use client";

import GameplayHero from "./gameplay-hero";
import GameplayFeatures from "./gameplay-features";
import GameplayExperience from "./gameplay-experience";
import { useLanguage } from "@/hooks/use-language";
import { useGameplay } from "@/hooks/use-gameplay";

export default function Gameplay() {
   const { copy } = useLanguage();

   const { rootRef, heroVideoRef, heroTitleRef, heroDescriptionRef, featuresSectionRef, featuresTitleRef, setCardAnimationRef, experienceSectionRef, experienceTitleRef, videoOneRef, videoTwoRef, ctaRef } = useGameplay();

   return (
      <main ref={rootRef} className="h-svh snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth bg-[#05080d] text-[#f3f6f8]">
         <GameplayHero copy={copy.gameplay} videoRef={heroVideoRef} titleRef={heroTitleRef} descriptionRef={heroDescriptionRef} />

         <GameplayFeatures copy={copy.gameplay} sectionRef={featuresSectionRef} titleRef={featuresTitleRef} setCardAnimationRef={setCardAnimationRef} />

         <GameplayExperience copy={copy.gameplay} sectionRef={experienceSectionRef} titleRef={experienceTitleRef} videoOneRef={videoOneRef} videoTwoRef={videoTwoRef} ctaRef={ctaRef} />
      </main>
   );
}
