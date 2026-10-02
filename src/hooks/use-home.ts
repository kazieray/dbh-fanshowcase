"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type FlowchartNodeStatus = "completed" | "group" | "locked";

export type FlowchartNode = {
   id: number;
   label: string;
   x: number;
   y: number;
   w: number;
   status: FlowchartNodeStatus;
   icon?: "arrow";
   isGroup?: boolean;
   isEnding?: boolean;
   image?: string;
   isStart?: boolean;
   percentage?: number;
   isPrimary?: boolean;
};

export type FlowchartPath = {
   key: string;
   d: string;
   isPrimary?: boolean;
};

export const FLOWCHART_WIDTH = 2400;
export const FLOWCHART_HEIGHT = 640;
export const FLOWCHART_REFERENCE_WIDTH = 1200;

const flowchartBranches = [
   { key: "mission-choices", from: 1, to: [3, 4, 2, 12], isPrimary: true },
   { key: "captain-investigation", from: 2, to: [9, 13], isPrimary: true },
   { key: "evidence-review", from: 9, to: [14, 10, 11, 15, 16], isPrimary: true },
   { key: "deviant-response", from: 11, to: [17, 18, 19, 20], isPrimary: true },
   { key: "ending-outcomes", from: 18, to: [6, 8, 21, 22], isPrimary: false },
];

export const flowchartNodes: FlowchartNode[] = [
   {
      id: 1,
      label: "MISSION START",
      x: 1,
      y: 50,
      w: 28,
      status: "completed",
      image: "/images/Android.jpeg",
      percentage: 100,
      isPrimary: true,
      isStart: true,
   },
   { id: 3, label: "SAVE FISH", x: 27, y: 19, w: 12, status: "completed", percentage: 28 },
   { id: 4, label: "LEAVE FISH", x: 27, y: 35, w: 12, status: "completed", percentage: 2 },
   { id: 2, label: "TALK TO CAPT. ALLEN", x: 27, y: 52, w: 14, status: "completed", percentage: 66, isPrimary: true },
   { id: 12, label: "WAIT FOR SWAT", x: 27, y: 70, w: 12, status: "completed", percentage: 18 },
   { id: 9, label: "INVESTIGATE FATHER'S\nBODY", x: 39, y: 28, w: 15, status: "completed", icon: "arrow", percentage: 45, isPrimary: true },
   { id: 13, label: "TALK TO ANDERSON", x: 39, y: 78, w: 14, status: "completed", percentage: 24 },
   { id: 14, label: "EXPRESS REGRET", x: 56, y: 14, w: 13, status: "completed", percentage: 3 },
   { id: 10, label: "LEARN CAUSE OF INCIDENT", x: 56, y: 32, w: 14, status: "completed", icon: "arrow", percentage: 45 },
   { id: 11, label: "LEARN DEVIANT'S NAME", x: 56, y: 50, w: 15, status: "completed", icon: "arrow", percentage: 60, isPrimary: true },
   { id: 15, label: "PROBE MEMORY", x: 56, y: 69, w: 13, status: "completed", percentage: 53 },
   { id: 16, label: "GIVE UP", x: 56, y: 87, w: 12, status: "completed", percentage: 12 },
   { id: 17, label: "ANDROID STARTS SELF-DESTRUCTING", x: 68, y: 20, w: 15, status: "completed", percentage: 45 },
   { id: 18, label: "INTERVENE", x: 68, y: 42, w: 12, status: "completed", percentage: 48, isPrimary: true },
   { id: 19, label: "DO NOTHING", x: 68, y: 63, w: 12, status: "completed", percentage: 6 },
   { id: 20, label: "LET ANDROID LEAVE", x: 68, y: 84, w: 14, status: "completed", percentage: 46 },
   { id: 6, label: "ANDROID SHOT CONNOR\nAND ITSELF", x: 81, y: 12, w: 28, status: "completed", isEnding: true, image: "/images/Hank&Connor.jpeg", percentage: 40 },
   { id: 8, label: "ANDROID SHOT ITSELF", x: 81, y: 36.5, w: 28, status: "completed", isEnding: true, image: "/images/Unit32.jpeg", percentage: 51, isPrimary: true },
   { id: 21, label: "ANDROID TRUSTS CONNOR", x: 81, y: 61, w: 28, status: "completed", isEnding: true, image: "/images/Connor.jpeg", percentage: 35 },
   { id: 22, label: "ANDROID SENT BACK TO ITS CELL", x: 81, y: 85.5, w: 28, status: "completed", isEnding: true, image: "/images/Sanningthetruth.jpeg", percentage: 46 },
];

type NodeRect = {
   left: number;
   right: number;
   centerY: number;
};

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
         const searchMarkerOffset = definition?.icon === "arrow" ? 26 : 0;

         return {
            left: element.offsetLeft - searchMarkerOffset,
            right: element.offsetLeft + element.offsetWidth + (definition?.percentage === undefined ? 0 : 40),
            centerY: element.offsetTop,
         };
      };

      const rects: Record<number, NodeRect | null> = {};
      flowchartNodes.forEach((node) => {
         rects[node.id] = getRect(node.id);
      });

      if (flowchartNodes.some((node) => !rects[node.id])) return;

      const nodesById = rects as Record<number, NodeRect>;
      const midpoint = (first: number, second: number) => Math.round((first + second) / 2);

      const branch = (from: NodeRect, targets: NodeRect[], junctionX: number) => {
         const sourceX = Math.round(from.right);
         const sourceY = Math.round(from.centerY);
         const targetYs = targets.map((target) => Math.round(target.centerY));
         const minY = Math.min(sourceY, ...targetYs);
         const maxY = Math.max(sourceY, ...targetYs);
         let path = `M ${sourceX} ${sourceY} H ${junctionX}`;

         if (minY !== maxY) path += ` M ${junctionX} ${minY} V ${maxY}`;

         targets.forEach((target) => {
            path += ` M ${junctionX} ${Math.round(target.centerY)} H ${Math.round(target.left)}`;
         });

         return path;
      };

      setPaths(flowchartBranches.map(({ key, from, to, isPrimary }) => {
         const targets = to.map((id) => nodesById[id]);
         const junctionX = midpoint(nodesById[from].right, Math.min(...targets.map((target) => target.left)));

         return { key, d: branch(nodesById[from], targets, junctionX), isPrimary };
      }));
   }, []);

   useLayoutEffect(() => {
      const container = containerRef.current;
      const flowchart = flowchartRef.current;
      if (!container || !flowchart) return;

      const updateScale = () => {
         const availableHeight = container.clientHeight || window.innerHeight * 0.58;
         const nextScale = Math.max(0.65, Math.min(1, availableHeight / FLOWCHART_HEIGHT));
         setScale(nextScale);
      };

      const containerObserver = new ResizeObserver(updateScale);
      const flowchartObserver = new ResizeObserver(updatePaths);
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

   return { containerRef, flowchartRef, paths, scale, setNodeRef };
}