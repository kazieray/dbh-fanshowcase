"use client";

import Navbar from "@/components/navigation/navbar";
import HomeBackground from "./home-background";
import HomeHero from "./home-hero";
import HomeTrailer from "./home-trailer";
import HomeFlowchart from "./home-flowchart";
import Footer from "@/components/common/footer";

export default function Home() {
   return (
      <>
         <main className="relative min-h-svh bg-dbh-bg">
            <Navbar active={true} />
            <HomeBackground />
            <HomeHero active={true} />
            <HomeFlowchart />
            <HomeTrailer />
         </main>

         <div className="relative bg-[#071019] text-white">
            <Footer />
         </div>
      </>
   );
}
