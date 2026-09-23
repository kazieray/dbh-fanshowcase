import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./_components/custom-cursor";

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
      <html lang="id" suppressHydrationWarning>
         <body suppressHydrationWarning>
            {children}
            <CustomCursor />
         </body>
      </html>
   );
}
