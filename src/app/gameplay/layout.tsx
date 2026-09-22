import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Gameplay — Detroit: Become Human",
   description:
      "Jelajahi sistem gameplay Detroit: Become Human — branching narrative, moral choices, quick-time events, dan lebih dari 40 ending yang berbeda.",
};

export default function GameplayLayout({ children }: { children: React.ReactNode }) {
   return children;
}
