import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ProgramsList from '@/components/programs/ProgramsList';
import CTASection from '@/components/CTASection';
import { programsPageContent } from '@/lib/content';

export const metadata: Metadata = {
    title: "Cognigym Programs | Cognitive Training for Children in Lagos",
    description: "Explore Cogniskills' Cognigym-based cognitive training programs for children with dyslexia, ADHD, autism, dyspraxia, speech disorders, and learning delays in Lagos, Nigeria.",
    alternates: { canonical: "https://cogniskillsleh.com/programs" },
};

export default function ProgramsPage() {
    const { header } = programsPageContent;
    return (
        <div className="min-h-screen">
            <PageHeader
                label={header.label}
                title={header.title}
                description={header.description}
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/v1776382665/abouth_d7qv9s.jpg"
            />
            <ProgramsList />
            <CTASection />
        </div>
    );
}
