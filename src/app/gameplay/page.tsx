import type { Metadata } from "next";
import Gameplay from "./_components/gameplay";

export const metadata: Metadata = {
   title: "DBH - Gameplay",
};

export default function GameplayPage() {
   return <Gameplay />;
}
