"use client";

import React, { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { FLOWCHART_HEIGHT, FLOWCHART_REFERENCE_WIDTH, FLOWCHART_WIDTH, flowchartNodes, useFlowchart } from "@/hooks/use-home";

export default function FlowchartBoard() {
   const { containerRef, flowchartRef, paths, scale, setNodeRef } = useFlowchart();
   const [isDragging, setIsDragging] = useState(false);
   const dragRef = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);

   const finishDrag = () => {
      dragRef.current = null;
      setIsDragging(false);
   };

   const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
   };

   const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
   };

   const visualWidth = FLOWCHART_WIDTH * scale;
   const visualHeight = FLOWCHART_HEIGHT * scale;

   return (
      <div className="relative flex h-full min-h-96 w-full min-w-0 flex-1 flex-col overflow-hidden">
         <div ref={containerRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag} className={`flowchart-board relative min-h-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain select-none bg-transparent text-[#e8edf1] outline-none scrollbar-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
            <div className="relative z-10 flex w-max justify-start" style={{ width: `${visualWidth}px`, height: `${visualHeight}px` }}>
               <div
                  ref={flowchartRef}
                  className="relative z-10 shrink-0 origin-top-left select-none"
                  style={{ width: `${FLOWCHART_WIDTH}px`, height: `${FLOWCHART_HEIGHT}px`, transform: `scale(${scale})` }}
               >
                  <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" viewBox={`0 0 ${FLOWCHART_WIDTH} ${FLOWCHART_HEIGHT}`} aria-hidden="true">
                     {paths.map((path) => (
                        <path key={path.key} className="branch-line" d={path.d} fill="none" stroke="#0B58A7" strokeOpacity="0.9" strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinecap="square" strokeLinejoin="miter" />
                     ))}
                  </svg>

                  {flowchartNodes.map((node) => (
                     <div
                        key={node.id}
                        ref={(element) => setNodeRef(node.id, element)}
                        className={`flowchart-node absolute z-10 flex -translate-y-1/2 border transition-[filter,background-color,transform,box-shadow] duration-300 ${node.isStart || node.isEnding ? "h-36 flex-col items-start" : node.image ? "h-23 items-end" : "items-center"} ${node.isGroup ? "justify-center bg-[#b7b9bb]/90" : node.isPrimary || node.image ? "border-white/60" : "border-[#85888a]/75"} ${node.status === "locked" ? "text-[#505356]" : node.isPrimary || node.image ? "text-white" : "text-[#283137]"}`}
                        style={{
                           left: `${node.x}%`,
                           top: `${node.y}%`,
                           width: node.isGroup ? "auto" : `calc(${(node.w * FLOWCHART_REFERENCE_WIDTH) / FLOWCHART_WIDTH}% - ${node.percentage === undefined ? 0 : 40}px)`,
                           ...(node.isGroup || node.image ? {} : { backgroundColor: node.isPrimary ? undefined : "#b7b9bb", backgroundImage: node.isPrimary ? "linear-gradient(110deg, #064D8E 0%, #095093 52%, #085DAD 100%)" : undefined }),
                        }}
                     >
                        {node.image && (
                           <>
                              <span className={`pointer-events-none z-0 ${node.isStart || node.isEnding ? "relative block h-27 w-full shrink-0" : "absolute inset-0"}`}>
                                 <Image src={node.image} alt="" fill sizes="220px" unoptimized draggable={false} className="object-cover" />
                                 <span className="absolute inset-0 z-1 bg-linear-to-t from-[#11191e]/70 via-transparent to-white/10" />
                              </span>
                           </>
                        )}

                        {!node.isGroup && (
                           <>
                              <span aria-hidden="true" className={`pointer-events-none absolute -left-px -top-px z-20 h-2.5 w-2.5 border-l border-t ${node.status === "locked" ? "border-[#d6a717]" : "border-[#287e9f]"}`} />
                              <span aria-hidden="true" className={`pointer-events-none absolute -right-px -top-px z-20 h-2.5 w-2.5 border-r border-t ${node.status === "locked" ? "border-[#d6a717]" : "border-[#287e9f]"}`} />
                              <span aria-hidden="true" className={`pointer-events-none absolute -bottom-px -left-px z-20 h-2.5 w-2.5 border-b border-l ${node.status === "locked" ? "border-[#d6a717]" : "border-[#287e9f]"}`} />
                              <span aria-hidden="true" className={`pointer-events-none absolute -bottom-px -right-px z-20 h-2.5 w-2.5 border-b border-r ${node.status === "locked" ? "border-[#d6a717]" : "border-[#287e9f]"}`} />
                           </>
                        )}

                        {node.icon === "arrow" && (
                           <ChevronRight aria-hidden="true" className="pointer-events-none absolute -left-5.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#287e9f]" strokeWidth={2.5} />
                        )}

                        {node.isGroup ? (
                           <>
                              {node.status === "locked" && (
                                 <>
                                    <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-[#d6a717]/60" />
                                    <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-[#d6a717]/60" />
                                    <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-[#d6a717]/60" />
                                    <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-[#d6a717]/60" />
                                 </>
                              )}
                              <span className={`px-5 py-3 text-center font-sans text-[10px] font-semibold uppercase leading-[1.15] tracking-widest ${node.status === "locked" ? "text-white/35" : "text-white/75"}`}>
                                 {node.label.split("\n").map((part, index, parts) => (
                                    <React.Fragment key={`${node.id}-${index}`}>
                                       {part}
                                       {index < parts.length - 1 && <br />}
                                    </React.Fragment>
                                 ))}
                              </span>
                           </>
                        ) : (
                           <>
                              <span className={`relative z-10 flex w-full items-center justify-start gap-1.5 px-2 py-1.5 font-sans text-[9px] font-semibold uppercase leading-[1.12] tracking-[0.07em] sm:px-2.5 sm:text-[9.5px] ${node.isStart || node.isEnding ? "h-9 py-0 text-white" : node.image ? node.isPrimary ? "text-white" : node.isEnding ? "bg-[#b7b9bb]/95 text-[#283137]" : "bg-[#11191e]/80 text-white" : ""}`} style={node.image && node.isPrimary ? { backgroundImage: "linear-gradient(110deg, #064D8E 0%, #095093 52%, #085DAD 100%)" } : undefined}>
                                 <span className="min-w-0">
                                    {node.label.split("\n").map((part, index, parts) => (
                                       <React.Fragment key={`${node.id}-${index}`}>
                                          {part}
                                          {index < parts.length - 1 && <br />}
                                       </React.Fragment>
                                    ))}
                                 </span>
                                 {node.percentage !== undefined && (
                                    <span className="absolute left-full top-0 bottom-0 z-20 ml-1 inline-flex w-9 items-center justify-center bg-white font-mono text-[8px] font-bold text-[#064D8E] [clip-path:polygon(0_0,78%_0,100%_50%,78%_100%,0_100%)] filter-[drop-shadow(1px_2px_1px_rgba(0,0,0,0.55))]">
                                       {node.percentage}%
                                    </span>
                                 )}
                              </span>
                           </>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
