"use client";

import { MoveRight } from "lucide-react";
import { stories } from "@/data/news";
import { useLanguage } from "@/hooks/use-language";
import { useNewsGrid } from "@/hooks/use-news";
import StoryCard from "./story-card";

type Story = (typeof stories)[number];

type NewsGridProps = {
   onRead: (story: Story) => void;
};

export default function NewsGrid({ onRead }: NewsGridProps) {
   const { copy, language } = useLanguage();
   const { visibleCount, isLoadingMore, loadMoreStories } = useNewsGrid();

   return (
      <section className="mt-14" aria-label={copy.news.featured}>
         <div className="mx-auto grid max-w-350 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stories.slice(0, visibleCount).map((story, index) => (
               <StoryCard key={story.title} story={story} index={index} language={language} copy={copy.news} onRead={() => onRead(story)} />
            ))}
         </div>

         {visibleCount < stories.length && (
            <button
               type="button"
               disabled={isLoadingMore}
               onClick={loadMoreStories}
               className="nav-glass-control mx-auto mt-10 flex min-h-11 min-w-52 items-center justify-center gap-3 rounded-full px-6 font-mono text-[9px] tracking-[0.04em] disabled:opacity-70"
            >
               {isLoadingMore ? (
                  <>
                     <span className="news-loader" />
                     {copy.news.loading}
                  </>
               ) : (
                  <>
                     {copy.news.readMore}
                     <MoveRight size={15} />
                  </>
               )}
            </button>
         )}
      </section>
   );
}
