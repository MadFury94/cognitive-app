import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import BrainTestQuiz from '@/components/brain-test/BrainTestQuiz';
import { brainTestPageContent } from '@/lib/content';

export const metadata: Metadata = {
    title: "Free Child Learning Screening | Cogniskills Lagos",
    description: "Answer 10 questions about your child's learning and behaviour. Find out which cognitive skills may be holding them back — free, takes 3 minutes.",
    alternates: { canonical: "https://cogniskillsleh.com/brain-test" },
};

export default function BrainTestPage() {
    const { header } = brainTestPageContent;
    return (
        <div className="min-h-screen">
            <PageHeader
                label={header.label}
                title={header.title}
                description={header.description}
                imageSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop"
            />
            <BrainTestQuiz />
        </div>
    );
}
