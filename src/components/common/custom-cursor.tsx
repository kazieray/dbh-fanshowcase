"use client";

import { useEffect, useRef } from "react";
import { MousePointer2 } from "lucide-react";
import gsap from "gsap";

export default function CustomCursor() {
   const cursorRef = useRef<HTMLDivElement>(null);
   const pointerRef = useRef<SVGSVGElement>(null);

   useEffect(() => {
      const finePointer = window.matchMedia("(pointer: fine)");

      if (!finePointer.matches) return;
      if (!cursorRef.current || !pointerRef.current) return;

      const cursor = cursorRef.current;
      const pointer = pointerRef.current;

      document.documentElement.classList.add("custom-cursor-active");

      const onMouseMove = (event: MouseEvent) => {
         cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
         const overFlowchart = event.target instanceof Element && event.target.closest(".flowchart-board");
         cursor.style.opacity = overFlowchart ? "0" : "1";

         if (cursor.style.opacity !== "1") {
            cursor.style.opacity = "1";
         }
      };

      const onMouseEnter = () => {
         cursor.style.opacity = "1";
      };

      const onMouseLeave = () => {
         cursor.style.opacity = "0";
      };

      const onMouseOver = (event: MouseEvent) => {
         const target = event.target as HTMLElement;
         const interactive = target.closest("a, button, [role='button'], input, textarea, select, summary");

         if (!interactive) return;

         gsap.to(pointer, {
            scale: 1.05,
            rotation: -4,
            color: "#52c7ff",
            filter: "drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 3px rgba(82, 199, 255, 0.35))",
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
         });
      };

      const onMouseOut = (event: MouseEvent) => {
         const target = event.target as HTMLElement;
         const relatedTarget = event.relatedTarget as Node | null;
         const interactive = target.closest("a, button, [role='button'], input, textarea, select, summary");

         if (!interactive) return;
         if (relatedTarget && interactive.contains(relatedTarget)) return;

         gsap.to(pointer, {
            scale: 1,
            rotation: 0,
            color: "#52c7ff",
            filter: "drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 2px rgba(82, 199, 255, 0.3))",
            duration: 0.2,
            ease: "power3.out",
            overwrite: true,
         });
      };

      window.addEventListener("mousemove", onMouseMove);
      document.documentElement.addEventListener("mouseenter", onMouseEnter);
      document.documentElement.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseover", onMouseOver);
      document.addEventListener("mouseout", onMouseOut);

      return () => {
         document.documentElement.classList.remove("custom-cursor-active");

         window.removeEventListener("mousemove", onMouseMove);
         document.documentElement.removeEventListener("mouseenter", onMouseEnter);
         document.documentElement.removeEventListener("mouseleave", onMouseLeave);
         document.removeEventListener("mouseover", onMouseOver);
         document.removeEventListener("mouseout", onMouseOut);
      };
   }, []);

   return (
      <div ref={cursorRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[9999] hidden opacity-0 md:block" style={{ willChange: "transform" }}>
         <MousePointer2 ref={pointerRef} className="h-7 w-7 origin-[2px_2px] text-dbh-blue [filter:drop-shadow(2px_3px_2px_rgba(0,0,0,0.65))_drop-shadow(0_0_2px_rgba(82,199,255,0.3))]" fill="currentColor" strokeWidth={1} />
      </div>
   );
}
