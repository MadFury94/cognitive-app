import HeroSection from '@/components/HeroSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import ProgramsSection from '@/components/ProgramsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

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
