import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import BrainTestQuiz from '@/components/brain-test/BrainTestQuiz';

export const metadata: Metadata = {
    title: "Free Brain Test for Children",
    description: "Take our free 5-minute cognitive screening test to identify potential learning challenges in your child. Not a diagnosis — a starting point.",
    alternates: { canonical: "https://cogniskillsleh.com/brain-test" },
};

export default function BrainTestPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="COGNITIVE ASSESSMENT"
                title="Quick Brain Test for Students"
                description="A simple 5-minute test to assess basic cognitive skills. This is not a diagnostic tool, but can help identify areas that may need attention."
                imageSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop"
            />
            <BrainTestQuiz />
        </div>
    );
}
