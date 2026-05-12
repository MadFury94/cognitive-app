import type { Metadata } from "next";
import BlogPost from '@/components/blog/BlogPost';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'Blog | Cogniskills',
    description: 'Articles on cognitive skills, learning difficulties, and brain training for children.',
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return <BlogPost slug={params.slug} />;
}
