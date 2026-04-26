import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ProgramsList from '@/components/programs/ProgramsList';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
    title: "Programs & Initiatives",
    description: "Explore Cogniskills' cognitive training programs for children with dyslexia, ADHD, autism, and learning delays in Lagos, Nigeria.",
    alternates: { canonical: "https://cogniskillsleh.com/programs" },
};

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
