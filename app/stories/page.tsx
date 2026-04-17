import PageHeader from '@/components/PageHeader';
import StoriesGrid from '@/components/stories/StoriesGrid';
import CTASection from '@/components/CTASection';

export default function StoriesPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="SUCCESS STORIES"
                title="Real families, real results"
                description="Hear from parents, students, and experts about the life-changing impact of our cognitive training programs."
                imageSrc="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&h=600&fit=crop"
            />
            <StoriesGrid />
            <CTASection />
        </div>
    );
}
