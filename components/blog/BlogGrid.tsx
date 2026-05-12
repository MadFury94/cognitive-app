'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    cover_image: string | null;
    published_at: string;
}

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://cogniskills-app.onochieazukaeme.workers.dev';

const categoryColors: Record<string, string> = {
    'Learning & Development': 'bg-blue-100 text-blue-700',
    'ADHD': 'bg-brand-100 text-brand-700',
    'Dyslexia': 'bg-purple-100 text-purple-700',
    'Autism': 'bg-green-100 text-green-700',
    'Dyspraxia': 'bg-pink-100 text-pink-700',
    'Speech': 'bg-yellow-100 text-yellow-700',
    'General': 'bg-gray-100 text-gray-700',
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-NG', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

export default function BlogGrid() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetch(`${WORKER_URL}/api/blog`)
            .then(r => r.json())
            .then(data => setPosts(Array.isArray(data) ? data : []))
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
    const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

    if (loading) {
        return (
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
            </section>
        );
    }

    if (posts.length === 0) {
        return (
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-500 text-lg">No articles published yet. Check back soon.</p>
                </div>
            </section>
        );
    }

    const [featured, ...rest] = filtered;

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                                    ? 'bg-brand-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured post */}
                {featured && (
                    <Link href={`/blog/${featured.slug}`} className="group block mb-12">
                        <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-brand-50 to-amber-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-brand-200 to-brand-100 relative overflow-hidden">
                                {featured.cover_image ? (
                                    <img
                                        src={featured.cover_image}
                                        alt={featured.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center min-h-[240px]">
                                        <span className="text-6xl">🧠</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[featured.category] || categoryColors['General']}`}>
                                        {featured.category}
                                    </span>
                                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Featured</span>
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors">
                                    {featured.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {featured.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {featured.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(featured.published_at)}
                                    </span>
                                </div>
                                <span className="flex items-center gap-2 text-brand-600 font-semibold group-hover:gap-3 transition-all">
                                    Read article <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Rest of posts */}
                {rest.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rest.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                    <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-amber-50 relative overflow-hidden">
                                        {post.cover_image ? (
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-4xl">🧠</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full self-start mb-3 ${categoryColors[post.category] || categoryColors['General']}`}>
                                            {post.category}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors flex-grow">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 pt-4 border-t border-gray-100">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(post.published_at)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
