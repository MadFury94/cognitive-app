import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import StoriesGrid from '@/components/stories/StoriesGrid';
import CTASection from '@/components/CTASection';
import { storiesPageContent } from '@/lib/content';

export const metadata: Metadata = {
    title: "Success Stories | Cogniskills Lagos",
    description: "Read real stories from Nigerian families whose children were transformed through Cogniskills' Cognigym cognitive training programs.",
    alternates: { canonical: "https://cogniskillsleh.com/stories" },
};

export default function StoriesPage() {
    const { header } = storiesPageContent;
    return (
        <div className="min-h-screen">
            <PageHeader
                label={header.label}
                title={header.title}
                description={header.description}
                imageSrc="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&h=600&fit=crop"
            />
            <StoriesGrid />
            <CTASection />
        </div>
    );
}
