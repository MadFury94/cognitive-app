import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import BlogGrid from '@/components/blog/BlogGrid';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
    title: "Blog | Cogniskills Lagos",
    description: "Articles on cognitive skills, learning difficulties, and brain training for children. Written by the Cogniskills team in Lagos, Nigeria.",
    alternates: { canonical: "https://cogniskillsleh.com/blog" },
};

export default function BlogPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="INSIGHTS"
                title="Understanding how children learn"
                description="Articles on cognitive skills, learning difficulties, and the science behind the Cognigym program."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/v1776382665/abouth_d7qv9s.jpg"
            />
            <BlogGrid />
            <CTASection />
        </div>
    );
}
