import type { Metadata } from "next";
import HeroSection from '@/components/HeroSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import ProgramsSection from '@/components/ProgramsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: "Cognitive Skills Training for Children in Lagos, Nigeria",
  description:
    "Cogniskills helps children with dyslexia, ADHD, autism, and learning delays unlock their full potential through scientifically grounded brain training in Lagos, Nigeria.",
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
