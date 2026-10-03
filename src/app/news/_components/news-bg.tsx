"use client";

import Image from "next/image";

import { useLanguage } from "@/hooks/use-language";

export default function NewsBackground() {
   const { copy } = useLanguage();

   return (
      <div className="fixed inset-0 z-0">
         <Image src="/images/bg-news.jpg" alt={copy.news.backgroundAlt} fill priority sizes="100vw" className="object-cover object-center opacity-45" />

         <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.78)_0%,rgba(5,8,13,0.55)_35%,#05080d_88%)]" />
      </div>
   );
}
