import type { Metadata } from "next";
import PlayExperience from "./_components/play-experience";

export const metadata: Metadata = {
   title: "Quantic Dream Games — Play Now",
   description: "Temukan kisah interaktif dari Quantic Dream: Detroit: Become Human, Heavy Rain, dan Beyond: Two Souls.",
};

export default function PlayPage() {
   return <PlayExperience />;
}