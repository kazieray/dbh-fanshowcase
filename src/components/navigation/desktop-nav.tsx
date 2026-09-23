"use client";

import { navItems } from "@/data/nav-items";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, MouseEvent } from "react";

export default function DesktopNav() {
   const pathname = usePathname();
   const buttonRef = useRef<HTMLAnchorElement>(null);

   const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      buttonRef.current.style.setProperty("--x", `${x}px`);
      buttonRef.current.style.setProperty("--y", `${y}px`);
   };

   return (
      <div className="hidden items-center justify-center gap-3 md:flex">
         <Link href="/" aria-label="Detroit Become Human — Beranda" className="mr-2 shrink-0">
            <Image src="/images/logo-white.webp" alt="Detroit: Become Human" width={180} height={55} priority className="h-auto w-[118px] lg:w-[132px]" />
         </Link>

         <nav aria-label="Navigasi utama" className="flex h-[52px] items-center rounded-full border border-white/[0.16] bg-black/30 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_rgba(0,0,0,0.16)] backdrop-blur-xl">
            {navItems.map((item) => {
               const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

               return (
                  <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className="group relative flex h-full items-center px-4 lg:px-5">
                     <span className={`font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 lg:text-[11px] ${isActive ? "text-dbh-blue" : "text-white/70 group-hover:text-white"}`}>{item.label}</span>

                     <span
                        aria-hidden="true"
                        className={`absolute bottom-[6px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[4px] border-b-[6px] border-x-transparent border-b-dbh-blue transition-all duration-300 ${isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}
                     />
                  </Link>
               );
            })}
         </nav>

         <Link
            href="/play"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            className="group relative flex h-[52px] shrink-0 items-center overflow-hidden rounded-full border border-white/[0.18] bg-white/[0.08] px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_4px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/[0.12]"
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle 60px at var(--x, 50%) var(--y, 50%), rgba(82, 199, 255, 0.4), transparent 100%)" }} />
            <span className="relative z-10 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white/85 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] lg:text-[11px]">Main Sekarang</span>
         </Link>
      </div>
   );
}
