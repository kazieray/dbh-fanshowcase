"use client";

import Image from "next/image";
import { Clock3, ExternalLink, X } from "lucide-react";
import { stories } from "@/data/news";
import { useLanguage } from "@/hooks/use-language";
import { categoryLabels, localizeDate, storyTitle } from "@/hooks/use-news";

type Story = (typeof stories)[number];

type StoryModalProps = {
   story: Story;
   closing: boolean;
   onClose: () => void;
};

export default function StoryModal({ story, closing, onClose }: StoryModalProps) {
   const { copy, language } = useLanguage();

   const date = localizeDate(story.date, language);
   const readTime = language === "en" ? story.readTime.replace("menit baca", copy.news.minRead) : story.readTime;
   const title = storyTitle(story, language);

   return (
      <div
         className={`news-modal fixed inset-0 z-50 flex min-h-svh items-center justify-center overflow-y-auto bg-[#030609]/72 p-4 backdrop-blur-xl sm:p-8 ${closing ? "news-modal-closing" : ""}`}
         role="dialog"
         aria-modal="true"
         aria-label={title}
      >
         <button type="button" onClick={onClose} aria-label={copy.news.close} className="nav-glass-control fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full">
            <X size={20} />
         </button>

         <article className="news-modal-window nav-glass-panel grid max-h-[calc(100svh-2rem)] w-full max-w-6xl overflow-y-auto rounded-2xl sm:max-h-[calc(100svh-4rem)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-70 lg:min-h-155">
               <Image src={story.image} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
               <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
               <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-dbh-blue">
                  {categoryLabels[story.category]?.[language] ?? story.category} / {date}
               </p>

               <h2 className="font-display text-3xl font-medium uppercase leading-[0.9] tracking-[-0.055em] text-white sm:text-5xl">{title}</h2>

               <div className="my-7 h-px w-16 bg-dbh-blue" />

               <div className="max-w-xl space-y-5 text-sm leading-[1.9] text-white/65">
                  {(language === "en" ? story.bodyEn : story.body).split("\n\n").map((paragraph) => (
                     <p key={paragraph}>{paragraph}</p>
                  ))}
               </div>

               <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                     <Clock3 size={12} />
                     {readTime}
                  </p>

                  <a
                     href={story.source}
                     target="_blank"
                     rel="noreferrer"
                     className="nav-glass-control inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 font-mono text-[7px] tracking-[0.03em] sm:min-h-10 sm:gap-2 sm:px-4 sm:text-[8px] md:text-[9px] md:tracking-[0.04em]"
                  >
                     <span>{copy.news.source}</span>
                     <ExternalLink className="h-3 w-3 shrink-0 sm:h-[13px] sm:w-[13px]" strokeWidth={1.6} />
                  </a>
               </div>
            </div>
         </article>
      </div>
   );
}
