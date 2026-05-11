import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import ProgramsSection from '@/components/ProgramsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
    title: "Cognigym Brain Training for Children | Cogniskills Lagos, Nigeria",
    description:
        "Cogniskills uses the Cognigym program to train the underlying cognitive skills children need to learn — auditory processing, working memory, attention, and processing speed. Lagos, Nigeria.",
    alternates: { canonical: "https://cogniskillsleh.com" },
};

export default function Home() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <ProblemSolutionSection />
            <ProgramsSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
}
