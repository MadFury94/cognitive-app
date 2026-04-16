import AboutHero from '@/components/about/AboutHero';
import StatsSection from '@/components/about/StatsSection';
import TeamSection from '@/components/about/TeamSection';
import ApproachSection from '@/components/about/ApproachSection';
import WhyChooseSection from '@/components/about/WhyChooseSection';
import CTASection from '@/components/CTASection';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <AboutHero />
            <StatsSection />
            <TeamSection />
            <ApproachSection />
            <WhyChooseSection />
            <CTASection />
        </div>
    );
}
