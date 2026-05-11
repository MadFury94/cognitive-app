import type { Metadata } from "next";
import BlogPost from '@/components/blog/BlogPost';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://cogniskills-app.onochieazukaeme.workers.dev';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const res = await fetch(`${WORKER_URL}/api/blog/${slug}`, { next: { revalidate: 3600 } });
        if (!res.ok) return { title: 'Blog | Cogniskills' };
        const post = await res.json();
        return {
            title: `${post.title} | Cogniskills`,
            description: post.excerpt,
            alternates: { canonical: `https://cogniskillsleh.com/blog/${slug}` },
        };
    } catch {
        return { title: 'Blog | Cogniskills' };
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <BlogPost slug={slug} />;
}
