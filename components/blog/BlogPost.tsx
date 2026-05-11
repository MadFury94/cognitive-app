'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    cover_image: string | null;
    published_at: string;
}

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://cogniskills-app.onochieazukaeme.workers.dev';

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-NG', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

export default function BlogPost({ slug }: { slug: string }) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`${WORKER_URL}/api/blog/${slug}`)
            .then(r => {
                if (!r.ok) { setNotFound(true); return null; }
                return r.json();
            })
            .then(data => { if (data) setPost(data); })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
            </section>
        );
    }

    if (notFound || !post) {
        return (
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
                    <Button asChild>
                        <Link href="/blog">Back to blog</Link>
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <article className="py-16 lg:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm mb-8 hover:gap-3 transition-all">
                    <ArrowLeft className="w-4 h-4" />
                    Back to blog
                </Link>

                {/* Category */}
                <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {post.category}
                </span>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
                    <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.published_at)}
                    </span>
                </div>

                {/* Cover image */}
                {post.cover_image && (
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-orange-50">
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg prose-orange max-w-none
                        prose-headings:font-bold prose-headings:text-gray-900
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-li:text-gray-700
                        prose-strong:text-gray-900
                        prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 text-center">
                    <BookOpen className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Think your child may need support?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Book a cognitive assessment and find out exactly which skills need attention.
                    </p>
                    <Button
                        size="lg"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                        asChild
                    >
                        <Link href="/booking">Book assessment</Link>
                    </Button>
                </div>
            </div>
        </article>
    );
}
