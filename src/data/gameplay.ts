export type GameplayFeatureKey = "dialogue" | "investigation" | "action" | "decisions" | "exploration";

export type GameplayCard = {
   id: string;
   labelKey: GameplayFeatureKey;
   image: string;
};

export const gameplayCards: GameplayCard[] = [
   {
      id: "dialogue-kara",
      labelKey: "dialogue",
      image: "/images/gameplay/dialogue2.webp",
   },
   {
      id: "investigation",
      labelKey: "investigation",
      image: "/images/gameplay/investigation.webp",
   },
   {
      id: "action",
      labelKey: "action",
      image: "/images/gameplay/action.webp",
   },
   {
      id: "decisions",
      labelKey: "decisions",
      image: "/images/gameplay/decisions.webp",
   },
   {
      id: "exploration",
      labelKey: "exploration",
      image: "/images/gameplay/exploration.webp",
   },
   {
      id: "dialogue-connor",
      labelKey: "dialogue",
      image: "/images/gameplay/dialogue1.webp",
   },
];

export const gameplayCardStyles: Record<string, string> = {
   "dialogue-connor": "absolute left-[-13%] top-[22%] z-20 w-[180px] -rotate-5 md:left-[-9%] md:top-[19%] md:w-[315px] md:-rotate-5 lg:left-[8%] lg:top-[7%] lg:z-20 lg:w-[315px] lg:-rotate-10 xl:left-[9%] xl:w-[335px]",
   investigation: "absolute left-1/2 top-[18%] z-50 w-[205px] -translate-x-1/2 rotate-5 md:left-1/2 md:top-[16%] md:w-[350px] md:-translate-x-1/2 md:rotate-5 lg:left-auto lg:right-[8%] lg:top-[9%] lg:z-50 lg:w-[310px] lg:translate-x-0 lg:rotate-3 xl:right-[10%] xl:w-[330px]",
   exploration: "absolute right-[-14%] top-[23%] z-10 w-[180px] -rotate-5 md:right-[-9%] md:top-[20%] md:w-[315px] md:-rotate-5 lg:left-[27%] lg:right-auto lg:top-[37%] lg:z-30 lg:w-[315px] lg:rotate-10 xl:left-[28%] xl:w-[335px]",
   decisions: "absolute left-1/2 top-[60%] z-50 w-[215px] -translate-x-1/2 -rotate-2 md:left-1/2 md:top-[60%] md:w-[350px] md:-translate-x-1/2 md:-rotate-2 lg:left-auto lg:right-[27%] lg:top-[34%] lg:z-40 lg:w-[330px] lg:translate-x-0 xl:right-[28%] xl:w-[350px]",
   action: "absolute left-[-12%] top-[58%] z-20 w-[185px] -rotate-8 md:left-[-8%] md:top-[58%] md:w-[315px] md:-rotate-8 lg:left-[12%] lg:top-auto lg:bottom-[5%] lg:z-40 lg:w-[330px] lg:-rotate-4 xl:left-[14%] xl:w-[350px]",
   "dialogue-kara": "absolute right-[-12%] top-[58%] z-20 w-[185px] rotate-8 md:right-[-8%] md:top-[58%] md:w-[315px] md:rotate-8 lg:right-[11%] lg:top-auto lg:bottom-[6%] lg:z-30 lg:w-[325px] lg:rotate-15 xl:right-[13%] xl:w-[345px]",
};
