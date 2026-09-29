import "./globals.css";
import CustomCursor from "../components/common/custom-cursor";
import { LanguageProvider } from "@/context/language-context";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
