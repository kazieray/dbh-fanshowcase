import type { Metadata } from "next";
import Characters from "./_components/character";

export const metadata: Metadata = {
   title: "DBH - Characters",
};

export default function CharacterPage() {
   return <Characters />;
}
