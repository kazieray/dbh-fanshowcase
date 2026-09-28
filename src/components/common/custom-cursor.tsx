"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
   const cursorRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      // Jangan jalankan efek ini di layar sentuh (HP)
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (!cursorRef.current) return;

      const cursor = cursorRef.current;
      
      // Menggunakan GSAP quickTo untuk animasi mulus yang membuntuti kursor asli
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

      const onMouseMove = (e: MouseEvent) => {
         // Kurangi dengan setengah ukuran (16px karena w-8 = 32px) agar berada tepat di tengah
         xTo(e.clientX - 16);
         yTo(e.clientY - 16);
      };

      // Tampilkan kursor setelah digerakkan pertama kali
      const onMouseEnter = () => {
         gsap.to(cursor, { opacity: 1, duration: 0.3 });
      };

      const onMouseLeave = () => {
         gsap.to(cursor, { opacity: 0, duration: 0.3 });
      };

      window.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseenter", onMouseEnter);
      document.body.addEventListener("mouseleave", onMouseLeave);

      return () => {
         window.removeEventListener("mousemove", onMouseMove);
         document.body.removeEventListener("mouseenter", onMouseEnter);
         document.body.removeEventListener("mouseleave", onMouseLeave);
      };
   }, []);

   return (
      <div
         ref={cursorRef}
         className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-dbh-blue shadow-[0_0_12px_rgba(82,199,255,0.6)] opacity-0 md:block mix-blend-screen"
         style={{ willChange: "transform" }}
      />
   );
}
