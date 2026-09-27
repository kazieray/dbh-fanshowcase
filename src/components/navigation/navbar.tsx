"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import DesktopNav from "./desktop-nav";
import MobileMenu from "./mobile-menu";
import { useLanguage } from "@/hooks/use-language";

type NavbarProps = {
   active: boolean;
};

export default function Navbar({ active }: NavbarProps) {
   const { copy } = useLanguage();
   const rootRef = useRef<HTMLElement>(null);
   const [menuOpen, setMenuOpen] = useState(false);

   useLayoutEffect(() => {
      if (!rootRef.current) return;

      const ctx = gsap.context(() => {
         gsap.set(".navbar-reveal", {
            y: -10,
            opacity: 0,
         });
      }, rootRef);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      if (!active || !rootRef.current) return;

      const ctx = gsap.context(() => {
         gsap.to(".navbar-reveal", {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 1.2,
            ease: "power3.out",
         });
      }, rootRef);

      return () => ctx.revert();
   }, [active]);

   return (
      <>
         <header ref={rootRef} className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-7">
            <div className="navbar-reveal pointer-events-auto mx-auto w-full max-w-[1440px] opacity-0">
               <DesktopNav />

               <div className="flex items-center justify-between md:hidden">
                  <Link href="/" aria-label="Detroit Become Human — Home" className="shrink-0">
                     <Image src="/images/logo-white.webp" alt="Detroit: Become Human" width={180} height={55} priority className="h-auto w-[105px] sm:w-[115px]" />
                  </Link>

                  <button
                     type="button"
                     aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                     aria-expanded={menuOpen}
                     onClick={() => setMenuOpen((current) => !current)}
                     className="flex h-9 items-center gap-2 rounded-full border border-white/15 bg-black/30 py-1 pl-4 pr-1 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
                  >
                     <span className="font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-white/80">{copy.nav.menu}</span>

                     <span aria-hidden="true" className="flex h-7 w-7 flex-col items-center justify-center gap-[3px] rounded-full bg-white/10">
                        <span className="h-px w-2.5 bg-white/70" />
                        <span className="h-px w-2.5 bg-white/70" />
                        <span className="h-px w-2.5 bg-white/70" />
                     </span>
                  </button>
               </div>
            </div>
         </header>

         <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
   );
}
