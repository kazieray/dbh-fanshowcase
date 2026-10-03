"use client";

import Image from "next/image";
import { Clock3 } from "lucide-react";
import { stories } from "@/data/news";
import { localizeDate, storyTitle, categoryLabels } from "@/hooks/use-news";

type Story = (typeof stories)[number];

type StoryCardProps = {
   story: Story;
   index: number;
   language: "en" | "id";
   copy: (typeof import("@/data/translations/en").en)["news"];
   onRead: () => void;
};

export default function StoryCard({ story, index, language, copy, onRead }: StoryCardProps) {
   const category = categoryLabels[story.category]?.[language] ?? story.category;
   const date = localizeDate(story.date, language);
   const readTime = language === "en" ? story.readTime.replace("menit baca", copy.minRead) : story.readTime;
   const title = storyTitle(story, language);

   return (
      <article
         role="button"
         tabIndex={0}
         aria-label={title}
         onClick={onRead}
         onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
               event.preventDefault();
               onRead();
            }
         }}
         className="news-card liquid-glass group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dbh-blue"
         style={{ animationDelay: `${index * 90}ms` }}
         onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            event.currentTarget.style.setProperty("--card-rotate-x", `${x * 2.4}deg`);
            event.currentTarget.style.setProperty("--card-rotate-y", `${y * -2.4}deg`);
            event.currentTarget.style.setProperty("--card-image-x", `${x * 1.5}%`);
            event.currentTarget.style.setProperty("--card-image-y", `${y * 1.5}%`);
         }}
         onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
            event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
            event.currentTarget.style.setProperty("--card-image-x", "0%");
            event.currentTarget.style.setProperty("--card-image-y", "0%");
         }}
      >
         <div className="relative block aspect-[1.15] w-full shrink-0 overflow-hidden">
            <Image src={story.image} alt="" fill sizes="(max-width: 1024px) 50vw, 33vw" className="news-card-image object-cover transition duration-700 group-hover:scale-105" />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/5 to-transparent" />

            <span className="glass-label absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.14em] text-white/90">
               {String(index + 1).padStart(2, "0")} / {category}
            </span>
         </div>

         <div className="relative flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/40">
               <span>{date}</span>
               <span className="h-1 w-1 rounded-full bg-dbh-blue" />
               <span className="flex items-center gap-1">
                  <Clock3 size={10} />
                  {readTime}
               </span>
            </div>

            <h2 className="font-display text-xl font-medium uppercase leading-[0.96] tracking-[-0.045em] text-white">{title}</h2>

            <p className="mt-3 text-xs leading-relaxed text-white/50">{language === "en" ? story.excerptEn : story.excerpt}</p>
         </div>
      </article>
   );
}