import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "For over 20 years, Cogniskills has helped Nigerian families unlock their children's true potential through evidence-based cognitive brain training in Lagos.",
    alternates: { canonical: "https://cogniskillsleh.com/about" },
};

export default function AboutPage() {
    return <AboutPageClient />;
}
