"use client";

import { navItems } from "@/data/nav-items";
import Image from "next/image";
import Link from "next/link";

export default function DesktopNav() {
   return (
      <main className="hidden w-full items-center justify-between md:flex">
         <Link href="/" aria-label="Detroit Become Human — Beranda" className="shrink-0">
            <Image src="/images/logo-white.webp" alt="Detroit: Become Human" width={180} height={55} priority className="h-auto w-[128px] lg:w-[145px]" />
         </Link>

         <section className="flex items-center gap-3">
            <nav aria-label="Navigasi utama" className="flex h-14 items-center rounded-full border border-white/15 bg-black/25 px-3 backdrop-blur-md">
               {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="group relative flex h-full items-center px-4 lg:px-5">
                     <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/65 transition-colors duration-300 group-hover:text-white lg:text-[10px]">{item.label}</span>
                     <span className="absolute bottom-[9px] left-1/2 h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-dbh-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
               ))}
            </nav>

            <Link href="/play" className="flex h-14 items-center rounded-full border border-white/15 bg-white/[0.08] px-6 backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.14]">
               <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/80 lg:text-[10px]">Main Sekarang</span>
            </Link>
         </section>
      </main>
   );
}
