import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./_components/custom-cursor";
import { LanguageProvider } from "@/context/language-context";

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
      <html lang="en" suppressHydrationWarning>
         <body suppressHydrationWarning>
            <LanguageProvider>
               {children}
               <CustomCursor />
            </LanguageProvider>
         </body>
      </html>
   );
}
