"use client";

import Navbar from "@/components/navigation/navbar";
import HomeBackground from "./home-background";
import HomeHero from "./home-hero";
import HomeStory from "./home-story";
import HomeTrailer from "./home-trailer";
import HomeFlowchart from "./home-flowchart";

export default function Home() {
   return (
      <main className="relative min-h-svh bg-[#05080d]">
         <Navbar active={true} />
         <HomeBackground />
         <HomeHero active={true} />
         <HomeStory />
         <HomeFlowchart />
         <HomeTrailer />
      </main>
   );
}
