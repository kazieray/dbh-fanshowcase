import { Metadata } from "next";
import News from "./_components/news";

export const metadata: Metadata = {
   title: "DBH - News",
};

export default function NewsPage() {
   return <News />;
}
