import type { Metadata } from "next";
import "./globals.css";

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
      <html lang="id">
         <body>{children}</body>
      </html>
   );
}
