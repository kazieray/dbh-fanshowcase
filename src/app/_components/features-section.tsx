"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Node definitions ────────────────────────────────────────────────────────
const flowchartNodes = [
  { id: 1,  label: "MISSION START",           x: 2,  y: 50, w: 12, status: "completed" },
  { id: 3,  label: "SAVE FISH",               x: 18, y: 30, w: 12, status: "completed" },
  { id: 4,  label: "LEAVE FISH",              x: 18, y: 40, w: 12, status: "completed" },
  { id: 2,  label: "TALK TO CAPT. ALLEN",     x: 18, y: 50, w: 12, status: "completed" },
  { id: 5,  label: "SEARCH FOR\nCLUES",       x: 38, y: 65, w: 16, status: "group", isGroup: true },
  { id: 9,  label: "INVESTIGATE FATHER'S\nBODY", x: 42, y: 25, w: 14, status: "completed", icon: "search" },
  { id: 10, label: "LEARN CAUSE OF INCIDENT", x: 62, y: 25, w: 16, status: "completed", icon: "search" },
  { id: 11, label: "LEARN DEVIANT'S NAME",    x: 62, y: 40, w: 14, status: "completed", icon: "search" },
  { id: 6,  label: "WASTED TOO MUCH TIME",    x: 84, y: 35, w: 14, status: "completed", isEnding: true },
  { id: 7,  label: "GO OUTSIDE",              x: 84, y: 50, w: 14, status: "completed", isEnding: true },
  { id: 8,  label: "SWAT INJURED",            x: 84, y: 65, w: 14, status: "completed", isEnding: true },
];

export default function FeaturesSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const flowchartRef = useRef<HTMLDivElement>(null);
  const nodeRefs     = useRef<Record<number, HTMLDivElement | null>>({});
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [paths, setPaths] = useState<{key: string, d: string}[]>([]);
  const [scale, setScale] = useState(1);

  // ─── Dynamic Line Routing ─────────────────────────────────────────────────
  // We calculate SVG paths dynamically by measuring the actual DOM positions of the nodes.
  // This guarantees pixel-perfect connections regardless of font sizes, paddings, or screen scaling.
  const updatePaths = useCallback(() => {
    if (!flowchartRef.current) return;

    const getRect = (id: number) => {
      const el = nodeRefs.current[id];
      if (!el) return null;
      const nodeDef = flowchartNodes.find(n => n.id === id);
      
      // If a node has an absolute-positioned icon on its left, offset it.
      const iconOffset = nodeDef?.icon ? 28 : 0;
      
      // Since nodes have -translate-y-1/2, el.offsetTop is precisely the visual center Y!
      return {
        left: el.offsetLeft - iconOffset,
        right: el.offsetLeft + el.offsetWidth,
        centerY: el.offsetTop,
      };
    };

    const r = {} as Record<number, ReturnType<typeof getRect>>;
    flowchartNodes.forEach(n => {
      r[n.id] = getRect(n.id);
    });

    // Make sure all required nodes are measured before drawing lines
    if (!r[1] || !r[2] || !r[5] || !r[6] || !r[9] || !r[10] || !r[11]) return;

    // Calculate trunk column positions (midpoints between groups of nodes)
    const colA = Math.round((r[1]!.right + r[2]!.left) / 2);
    const colB = Math.round((r[2]!.right + Math.min(r[5]!.left, r[9]!.left)) / 2);
    const colC = Math.round((r[9]!.right + r[10]!.left) / 2);
    
    // Trunk D sits midway between the rightmost clue node and the ending nodes
    const rightMostClue = Math.max(r[5]!.right, r[10]!.right, r[11]!.right);
    const colD = Math.round((rightMostClue + r[6]!.left) / 2);

    const createJunction = (fromIds: number[], toIds: number[], midX: number) => {
      const fromNodes = fromIds.map(id => r[id]).filter((n): n is NonNullable<typeof n> => n !== null);
      const toNodes = toIds.map(id => r[id]).filter((n): n is NonNullable<typeof n> => n !== null);
      
      if (fromNodes.length === 0 || toNodes.length === 0) return "";

      let d = "";

      // 1. Horizontal lines from sources to midX
      fromNodes.forEach(from => {
        d += `M ${Math.round(from.right)} ${Math.round(from.centerY)} H ${midX} `;
      });

      // 2. Vertical trunk line
      const allYs = [...fromNodes, ...toNodes].map(n => Math.round(n.centerY));
      const minY = Math.min(...allYs);
      const maxY = Math.max(...allYs);
      if (minY !== maxY) {
        d += `M ${midX} ${minY} V ${maxY} `;
      }

      // 3. Horizontal lines from midX to destinations
      toNodes.forEach(to => {
        d += `M ${midX} ${Math.round(to.centerY)} H ${Math.round(to.left)} `;
      });

      return d.trim();
    };

    setPaths([
      { key: "junction-A", d: createJunction([1], [3, 4, 2], colA) },
      { key: "junction-B", d: createJunction([2], [9, 5], colB) },
      { key: "junction-C", d: createJunction([9], [10, 11], colC) },
      { key: "junction-D", d: createJunction([10, 11, 5], [6, 7, 8], colD) },
    ]);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !flowchartRef.current) return;
    
    // Scale container down if viewport is smaller than 1200px
    const containerObserver = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const available = w - 32; // 16px padding on each side
      setScale(available < 1200 ? available / 1200 : 1);
    });
    containerObserver.observe(containerRef.current);

    // Update lines if node sizes change (e.g. font loaded)
    const flowObserver = new ResizeObserver(() => {
      updatePaths();
    });
    flowObserver.observe(flowchartRef.current);
    
    updatePaths();

    return () => {
      containerObserver.disconnect();
      flowObserver.disconnect();
    };
  }, [updatePaths]);

  // ─── GSAP Animations ────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (!sectionRef.current || !flowchartRef.current) return;
    
    // We want GSAP to animate only after paths are computed
    if (paths.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      gsap.fromTo(
        "path.branch-line",
        { strokeDasharray: 3000, strokeDashoffset: 3000 },
        {
          strokeDashoffset: 0, duration: 3, ease: "power2.inOut",
          scrollTrigger: { trigger: flowchartRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".flowchart-node",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)",
          scrollTrigger: { trigger: flowchartRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [paths.length]); // Re-run animation hook only when paths are first ready

  return (
    <section
      id="features-section"
      ref={sectionRef}
      className="relative hidden md:flex min-h-screen flex-col items-center py-24 px-6 bg-black/65 overflow-x-hidden overflow-y-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%,rgba(0,180,255,0.15) 0%,transparent 60%)",
        }}
      />

      {/* Floating + marks */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {[
          { top: "15.3%", left: "42.1%" },
          { top: "82.5%", left: "10.4%" },
          { top: "33.9%", left: "75.2%" },
          { top: "68.1%", left: "22.8%" },
          { top: "45.6%", left: "89.3%" },
          { top: "91.2%", left: "55.7%" },
          { top: "8.4%", left: "95.1%" },
          { top: "54.7%", left: "31.6%" },
          { top: "77.3%", left: "68.9%" },
          { top: "26.5%", left: "5.2%" },
          { top: "63.8%", left: "49.4%" },
          { top: "11.1%", left: "81.6%" },
          { top: "88.9%", left: "37.5%" },
          { top: "39.4%", left: "62.3%" },
          { top: "96.2%", left: "18.7%" },
          { top: "21.7%", left: "53.9%" },
          { top: "71.5%", left: "86.4%" },
          { top: "48.3%", left: "12.8%" },
          { top: "2.9%", left: "29.1%" },
          { top: "59.6%", left: "73.5%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute text-white/20 font-light text-xs"
            style={pos}
          >
            +
          </div>
        ))}
      </div>

      {/* ── Section Header ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto mb-32 mt-12 feature-text">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-wide uppercase drop-shadow-lg">
          SETIAP PILIHAN <span className="text-[#32b2e8]">BERARTI</span>
        </h2>
        <p className="text-gray-300 text-lg md:text-xl font-mono leading-relaxed max-w-3xl drop-shadow-md">
          Bentuk narasi ambisius ini melalui ribuan pilihan dan lusinan akhiran yang berbeda.
          Siapa yang hidup dan siapa yang mati, semuanya ada di tangan Anda.
        </p>
      </div>

      {/* ── Flowchart Header ── */}
      <div className="relative z-10 w-full max-w-6xl text-left mb-8 pl-4 feature-text">
        <h3 className="text-white/60 font-sans tracking-widest text-sm sm:text-base uppercase mb-1">
          100% COMPLETED
        </h3>
        <div className="w-full max-w-xl h-px bg-white/30 mb-2" />
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white">
          THE HOSTAGE
        </h2>
      </div>

      {/* ── Flowchart ── */}
      <div 
        ref={containerRef}
        className="w-full flex justify-center pb-12 overflow-hidden"
      >
        <div
          ref={flowchartRef}
          className="relative z-10 select-none origin-top"
          style={{ 
            width: '1200px', 
            height: '500px', 
            transform: `scale(${scale})`, 
            marginBottom: `-${500 * (1 - scale)}px`,
            marginLeft: `-${1200 * (1 - scale) / 2}px`,
            marginRight: `-${1200 * (1 - scale) / 2}px`,
          }}
        >
          {/* Corner brackets (decorative area boundary) */}
          <div className="absolute border-l-2 border-t-2 border-white/20 w-8 h-8 pointer-events-none" style={{ left: "39%", top: "15%" }} />
          <div className="absolute border-r-2 border-t-2 border-white/20 w-8 h-8 pointer-events-none" style={{ left: "79%", top: "15%" }} />
          <div className="absolute border-l-2 border-b-2 border-white/20 w-8 h-8 pointer-events-none" style={{ left: "39%", top: "75%" }} />
          <div className="absolute border-r-2 border-b-2 border-white/20 w-8 h-8 pointer-events-none" style={{ left: "79%", top: "75%" }} />

          {/* ── SVG Connectors ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1200 500"
          >
            {paths.map((seg) => (
              <path
                key={seg.key}
                className="branch-line"
                d={seg.d}
                fill="none"
                stroke="#0a75c2"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            ))}
          </svg>

          {/* ── Nodes ── */}
          {flowchartNodes.map((node) => (
            <div
              key={node.id}
              ref={(el) => {
                if (el) nodeRefs.current[node.id] = el;
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={[
                "flowchart-node absolute -translate-y-1/2 flex items-center justify-start",
                "transition-all duration-300 cursor-pointer z-10",
                node.status === "locked"
                  ? "bg-white/5 border border-white/20 text-white/50 backdrop-blur-sm"
                  : node.status === "group"
                  ? "bg-transparent border-none shadow-none text-white/70"
                  : "bg-[#0a75c2] border border-[#0a75c2] text-white shadow-[0_0_15px_rgba(10,117,194,0.4)]",
                hoveredNode === node.id && node.status !== "group"
                  ? "ring-2 ring-offset-2 ring-[#0a75c2] ring-offset-black scale-105"
                  : "",
                node.isGroup
                  ? "!w-auto !h-auto items-center justify-center backdrop-blur-none"
                  : "min-h-[32px] py-1 pl-3 pr-2",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: node.isGroup ? "auto" : `${node.w}%`,
              }}
            >
              {node.icon === "search" && (
                <span className="absolute -left-6 text-[#0a75c2]">
                  <svg
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              )}

              <span
                className={[
                  "font-sans text-[9.5px] sm:text-[10.5px] uppercase font-semibold tracking-wider leading-tight",
                  node.isGroup
                    ? "text-2xl sm:text-3xl font-light text-center tracking-widest text-[#66a3d1] drop-shadow-md border-l-2 border-r-2 border-[#0a75c2] px-4 py-2"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {node.label.split("\n").map((part, idx, arr) => (
                  <React.Fragment key={idx}>
                    {part}
                    {idx < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>

              {node.isEnding && node.status === "locked" && (
                <span className="absolute -right-6 text-white/30 text-sm">▲</span>
              )}

              {node.status === "completed" && !node.isGroup && !node.icon && (
                <div className="absolute -bottom-5 left-0 text-white/40 text-[9px] uppercase tracking-widest">
                  CHECKPOINT
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
