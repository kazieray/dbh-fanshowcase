import { Metadata } from "next";
import Home from "./_components/home";

export const metadata: Metadata = {
   title: "DBH - Home",
};

export default function HomePage() {
   return <Home />;
}
