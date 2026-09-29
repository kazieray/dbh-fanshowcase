"use client";

import React from "react";
import { flowchartNodes, useFlowchart } from "@/hooks/use-home";

export default function FlowchartBoard() {
   const { containerRef, flowchartRef, paths, scale, setNodeRef } = useFlowchart();

   const visualWidth = 1200 * scale;
   const visualHeight = 500 * scale;

   return (
      <div ref={containerRef} className="flowchart-board w-full overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-hidden">
         <div className="flex min-w-full justify-start lg:justify-center" style={{ width: `${visualWidth}px`, height: `${visualHeight}px` }}>
            <div
               ref={flowchartRef}
               className="relative z-10 shrink-0 select-none origin-top-left"
               style={{
                  width: "1200px",
                  height: "500px",
                  transform: `scale(${scale})`,
               }}
            >
               {/* CONNECTIONS */}
               <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" viewBox="0 0 1200 500" aria-hidden="true">
                  {paths.map((path) => (
                     <path key={path.key} className="branch-line" d={path.d} fill="none" stroke="#0a75c2" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinecap="square" strokeLinejoin="miter" />
                  ))}
               </svg>

               {/* NODES */}
               {flowchartNodes.map((node) => (
                  <div
                     key={node.id}
                     ref={(element) => setNodeRef(node.id, element)}
                     className={`flowchart-node absolute z-10 flex -translate-y-1/2 items-center ${node.isGroup ? "justify-center bg-transparent" : "justify-start border border-[#0a75c2] bg-[#0a75c2] shadow-[0_0_15px_rgba(10,117,194,0.4)] transition-[filter,box-shadow] duration-300 [@media(hover:hover)]:hover:brightness-105 [@media(hover:hover)]:hover:shadow-[0_0_18px_rgba(10,117,194,0.45)]"}`}
                     style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: node.isGroup ? "auto" : `${node.w}%`,
                     }}
                  >
                     {/* SEARCH MARKER */}
                     {node.icon === "search" && (
                        <span className="pointer-events-none absolute -left-[22px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border-2 border-[#0a75c2] bg-transparent">
                           <span className="absolute left-[7px] top-[7px] h-[2px] w-[5px] origin-left rotate-45 bg-[#0a75c2]" />
                        </span>
                     )}

                     {/* GROUP NODE */}
                     {node.isGroup ? (
                        <span className="border-l-2 border-r-2 border-[#0a75c2] px-5 py-3 text-center font-sans text-[12px] font-semibold uppercase leading-[1.15] tracking-[0.12em] text-white/65">
                           {node.label.split("\n").map((part, index, parts) => (
                              <React.Fragment key={`${node.id}-${index}`}>
                                 {part}
                                 {index < parts.length - 1 && <br />}
                              </React.Fragment>
                           ))}
                        </span>
                     ) : (
                        <span className="px-3 py-2 font-sans text-[10.5px] font-semibold uppercase leading-tight tracking-wider text-white">
                           {node.label.split("\n").map((part, index, parts) => (
                              <React.Fragment key={`${node.id}-${index}`}>
                                 {part}
                                 {index < parts.length - 1 && <br />}
                              </React.Fragment>
                           ))}
                        </span>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
