import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "./_components/audio-provider";
import { LanguageProvider } from "@/context/language-context";
import Footer from "@/components/navigation/footer";
import AudioToggle from "@/components/navigation/audio-toggle";
import { HomeIntroProvider } from "@/context/home-intro-context";

export const metadata: Metadata = {
   title: "Detroit: Become Human",
   description: "Detroit: Become Human Fan Showcase",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            <HomeIntroProvider>
               <LanguageProvider>
                  <AudioProvider>
                     {children}
                     <div className="footer-backdrop relative z-10 px-5 sm:px-8 lg:px-14">
                        <Footer tightTop />
                     </div>
                     <AudioToggle />
                  </AudioProvider>
               </LanguageProvider>
            </HomeIntroProvider>
         </body>
      </html>
   );
}
