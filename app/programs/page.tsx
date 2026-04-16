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
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/v1776382665/abouth_d7qv9s.jpg"
            />
            <ProgramsList />
            <CTASection />
        </div>
    );
}
