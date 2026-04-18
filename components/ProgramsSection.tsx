'use client';

import { useEffect, useState } from 'react';
import { Brain, Focus, Users, MessageSquare, Pencil, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Program {
    id: number;
    slug: string;
    title: string;
    description: string;
}

export default function ProgramsSection() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/programs');
            const data = await response.json();
            setPrograms(data);
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (slug: string) => {
        const icons: Record<string, any> = {
            'dyslexia': BookOpen,
            'adhd': Focus,
            'autism': Users,
            'speech': MessageSquare,
            'dyspraxia': Pencil,
            'learning-delays': Brain,
        };
        return icons[slug] || Brain;
    };

    if (loading) {
        return (
            <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 lg:mb-16">
                    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        What We Treat
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        A specialised program<br />for every challenge
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {programs.map((program) => {
                        const Icon = getIcon(program.slug);
                        return (
                            <div
                                key={program.id}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                                    <Icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {program.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {program.description}
                                </p>
                                <Button
                                    variant="link"
                                    className="text-orange-600 hover:text-orange-700 p-0 h-auto font-semibold group/link"
                                    asChild
                                >
                                    <Link href={`/services/${program.slug}`}>
                                        Learn more
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
