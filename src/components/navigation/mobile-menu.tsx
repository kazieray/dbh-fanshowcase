"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { navItems } from "@/data/nav-items";
import { useLanguage } from "@/hooks/use-language";

type MobileMenuProps = {
   open: boolean;
   onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
   const rootRef = useRef<HTMLDivElement>(null);
   const backdropRef = useRef<HTMLButtonElement>(null);
   const sheetRef = useRef<HTMLDivElement>(null);

   const pathname = usePathname();
   const { copy } = useLanguage();
   const navCopy = copy.nav;

   useLayoutEffect(() => {
      if (!rootRef.current || !backdropRef.current || !sheetRef.current) return;

      if (open) {
         document.body.style.overflow = "hidden";

         const ctx = gsap.context(() => {
            const timeline = gsap.timeline();

            timeline
               .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" })
               .fromTo(sheetRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.75, ease: "power4.out" }, "-=0.3")
               .fromTo(".mobile-menu-item", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.055, ease: "power3.out" }, "-=0.35");
         }, rootRef);

         return () => {
            ctx.revert();
            document.body.style.overflow = "";
         };
      }

      document.body.style.overflow = "";
   }, [open]);

   if (!open) return null;

   return (
      <div ref={rootRef} className="fixed inset-0 z-50 md:hidden">
         <button ref={backdropRef} type="button" aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-md" />

         <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto rounded-t-[22px] border-t border-white/10 bg-[#07090c]/95 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-24px_80px_rgba(0,0,0,0.35)]"
         >
            <div aria-hidden="true" className="mx-auto mb-5 h-[3px] w-10 rounded-full bg-white/20" />

            <nav aria-label="Mobile navigation">
               {navItems.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                     <Link key={item.href} href={item.href} onClick={onClose} aria-current={isActive ? "page" : undefined} className="mobile-menu-item group flex min-h-[58px] items-center border-b border-white/[0.08] opacity-0">
                        <span className={`font-display text-[13px] font-medium uppercase tracking-[-0.01em] transition-colors duration-300 ${isActive ? "text-dbh-blue" : "text-white/80 group-hover:text-white"}`}>{navCopy[item.key]}</span>
                     </Link>
                  );
               })}
            </nav>
         </div>
      </div>
   );
}
