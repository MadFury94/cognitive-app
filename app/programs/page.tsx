import PageHeader from '@/components/PageHeader';
import ProgramsList from '@/components/programs/ProgramsList';
import CTASection from '@/components/CTASection';

export default function ProgramsPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="OUR IMPACT"
                title="PROGRAMS & INITIATIVES"
                description="Empowering youth through targeted educational support, mentorship, and civic engagement."
                imageSrc="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop"
            />
            <ProgramsList />
            <CTASection />
        </div>
    );
}
