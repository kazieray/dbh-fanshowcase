"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type FlowchartNodeStatus = "completed" | "group";

export type FlowchartNode = {
   id: number;
   label: string;
   x: number;
   y: number;
   w: number;
   status: FlowchartNodeStatus;
   icon?: "search";
   isGroup?: boolean;
   isEnding?: boolean;
};

export type FlowchartPath = {
   key: string;
   d: string;
};

type NodeRect = {
   left: number;
   right: number;
   centerY: number;
};

export const flowchartNodes: FlowchartNode[] = [
   {
      id: 1,
      label: "MISSION START",
      x: 2,
      y: 50,
      w: 12,
      status: "completed",
   },
   {
      id: 3,
      label: "SAVE FISH",
      x: 18,
      y: 30,
      w: 12,
      status: "completed",
   },
   {
      id: 4,
      label: "LEAVE FISH",
      x: 18,
      y: 40,
      w: 12,
      status: "completed",
   },
   {
      id: 2,
      label: "TALK TO CAPT. ALLEN",
      x: 18,
      y: 50,
      w: 12,
      status: "completed",
   },
   {
      id: 9,
      label: "INVESTIGATE FATHER'S\nBODY",
      x: 42,
      y: 25,
      w: 14,
      status: "completed",
      icon: "search",
   },
   {
      id: 5,
      label: "SEARCH FOR\nCLUES",
      x: 42,
      y: 62,
      w: 14,
      status: "group",
      isGroup: true,
   },
   {
      id: 10,
      label: "LEARN CAUSE OF INCIDENT",
      x: 62,
      y: 25,
      w: 16,
      status: "completed",
      icon: "search",
   },
   {
      id: 11,
      label: "LEARN DEVIANT'S NAME",
      x: 62,
      y: 40,
      w: 14,
      status: "completed",
      icon: "search",
   },
   {
      id: 6,
      label: "WASTED TOO MUCH TIME",
      x: 84,
      y: 30,
      w: 14,
      status: "completed",
      isEnding: true,
   },
   {
      id: 7,
      label: "GO OUTSIDE",
      x: 84,
      y: 50,
      w: 14,
      status: "completed",
      isEnding: true,
   },
   {
      id: 8,
      label: "SWAT INJURED",
      x: 84,
      y: 70,
      w: 14,
      status: "completed",
      isEnding: true,
   },
];

export function useFlowchart() {
   const containerRef = useRef<HTMLDivElement>(null);
   const flowchartRef = useRef<HTMLDivElement>(null);
   const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

   const [paths, setPaths] = useState<FlowchartPath[]>([]);
   const [scale, setScale] = useState(1);

   const setNodeRef = useCallback((id: number, element: HTMLDivElement | null) => {
      nodeRefs.current[id] = element;
   }, []);

   const updatePaths = useCallback(() => {
      const flowchart = flowchartRef.current;

      if (!flowchart) return;

      const getRect = (id: number): NodeRect | null => {
         const element = nodeRefs.current[id];

         if (!element) return null;

         const definition = flowchartNodes.find((node) => node.id === id);
         const searchMarkerOffset = definition?.icon === "search" ? 26 : 0;

         return {
            left: element.offsetLeft - searchMarkerOffset,
            right: element.offsetLeft + element.offsetWidth,
            centerY: element.offsetTop,
         };
      };

      const rects: Record<number, NodeRect | null> = {};

      flowchartNodes.forEach((node) => {
         rects[node.id] = getRect(node.id);
      });

      const requiredIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

      if (requiredIds.some((id) => !rects[id])) return;

      const r = rects as Record<number, NodeRect>;

      const midpoint = (a: number, b: number) => Math.round((a + b) / 2);

      const branch = (from: NodeRect, targets: NodeRect[], junctionX: number) => {
         const sourceX = Math.round(from.right);
         const sourceY = Math.round(from.centerY);
         const targetYs = targets.map((target) => Math.round(target.centerY));

         const minY = Math.min(sourceY, ...targetYs);
         const maxY = Math.max(sourceY, ...targetYs);

         let d = `M ${sourceX} ${sourceY} H ${junctionX}`;

         if (minY !== maxY) {
            d += ` M ${junctionX} ${minY} V ${maxY}`;
         }

         targets.forEach((target) => {
            d += ` M ${junctionX} ${Math.round(target.centerY)} H ${Math.round(target.left)}`;
         });

         return d;
      };

      const openingJunctionX = midpoint(r[1].right, r[2].left);
      const investigationJunctionX = midpoint(r[2].right, Math.min(r[9].left, r[5].left));
      const clueJunctionX = midpoint(r[9].right, Math.min(r[10].left, r[11].left));
      const rightEventsJunctionX = midpoint(Math.max(r[10].right, r[11].right, r[5].right), Math.min(r[6].left, r[7].left, r[8].left));

      const continuationStartX = Math.round(r[5].right);
      const continuationStartY = Math.round(r[5].centerY);

      const rightEventYs = [r[6], r[7], r[8]].map((node) => Math.round(node.centerY));
      const rightMinY = Math.min(...rightEventYs);
      const rightMaxY = Math.max(...rightEventYs);

      let continuationPath = `M ${continuationStartX} ${continuationStartY} H ${rightEventsJunctionX}`;
      continuationPath += ` M ${rightEventsJunctionX} ${rightMinY} V ${rightMaxY}`;

      [r[6], r[7], r[8]].forEach((target) => {
         continuationPath += ` M ${rightEventsJunctionX} ${Math.round(target.centerY)} H ${Math.round(target.left)}`;
      });

      setPaths([
         {
            key: "mission-choices",
            d: branch(r[1], [r[3], r[4], r[2]], openingJunctionX),
         },
         {
            key: "captain-investigation",
            d: branch(r[2], [r[9], r[5]], investigationJunctionX),
         },
         {
            key: "father-clues",
            d: branch(r[9], [r[10], r[11]], clueJunctionX),
         },
         {
            key: "investigation-events",
            d: continuationPath,
         },
      ]);
   }, []);

   useLayoutEffect(() => {
      const container = containerRef.current;
      const flowchart = flowchartRef.current;

      if (!container || !flowchart) return;

      const updateScale = () => {
         const availableWidth = container.clientWidth;
         const isMobile = window.innerWidth < 768;

         if (isMobile) {
            setScale(0.75);
            return;
         }

         const nextScale = Math.min(1, availableWidth / 1200);

         setScale(nextScale);
      };

      const containerObserver = new ResizeObserver(() => {
         updateScale();
      });

      const flowchartObserver = new ResizeObserver(() => {
         updatePaths();
      });

      containerObserver.observe(container);
      flowchartObserver.observe(flowchart);

      window.addEventListener("resize", updateScale);

      updateScale();
      updatePaths();

      return () => {
         containerObserver.disconnect();
         flowchartObserver.disconnect();
         window.removeEventListener("resize", updateScale);
      };
   }, [updatePaths]);

   return {
      containerRef,
      flowchartRef,
      paths,
      scale,
      setNodeRef,
   };
}
