import type { Metadata } from "next";
import Play from "./_components/play";

export const metadata: Metadata = {
   title: "DBH - Play Now",
};

export default function PlayPage() {
   return <Play />;
}