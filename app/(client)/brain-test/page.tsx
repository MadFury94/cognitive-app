import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import BrainTestQuiz from '@/components/brain-test/BrainTestQuiz';
import { brainTestPageContent } from '@/lib/content';

export const metadata: Metadata = {
    title: "Free Brain Test for Children | Cogniskills Lagos",
    description: "Take our free 5-minute cognitive screening test to identify potential learning challenges in your child. Not a diagnosis, a starting point.",
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
