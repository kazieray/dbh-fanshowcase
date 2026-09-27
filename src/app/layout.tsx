import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./_components/custom-cursor";
import { LanguageProvider } from "@/context/language-context";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
         <body suppressHydrationWarning>
            <LanguageProvider>
               {children}
               <CustomCursor />
            </LanguageProvider>
         </body>
      </html>
   );
}
