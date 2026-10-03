"use client";

import { createPortal } from "react-dom";

import Footer from "@/components/common/footer";
import Navbar from "@/components/navigation/navbar";
import { useNews } from "@/hooks/use-news";
import NewsBackground from "./news-bg";
import NewsGrid from "./news-grid";
import NewsHero from "./news-hero";
import StoryModal from "./story-modal";

export default function News() {
   const { selectedStory, isModalClosing, openStory, closeStory } = useNews();

   return (
      <>
         <main className="relative min-h-svh bg-dbh-bg text-white">
            <Navbar active={true} />

            <NewsBackground />

            <div className="relative z-10 mx-auto max-w-360 px-4 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12">
               <NewsHero />

               <NewsGrid onRead={openStory} />
            </div>

            {selectedStory && createPortal(<StoryModal story={selectedStory} closing={isModalClosing} onClose={closeStory} />, document.body)}
         </main>

         <div className="relative bg-[#071019] text-white">
            <Footer tightTop />
         </div>
      </>
   );
}
