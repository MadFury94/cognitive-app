'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Focus, Users, MessageSquare, Pencil, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Program {
    id: number;
    slug: string;
    title: string;
    description: string;
    duration: string;
    sessions_per_week: string;
    improvement_stat: string;
    improvement_label: string;
}

export default function ProgramsList() {
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
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-12 lg:space-y-16">
                    {programs.map((program) => {
                        const Icon = getIcon(program.slug);
                        return (
                            <div
                                key={program.id}
                                className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start"
                            >
                                {/* Left Card */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:sticky lg:top-8">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {program.title}
                                    </h3>
                                    <p className="text-sm text-orange-700 font-medium">
                                        {program.duration}
                                    </p>
                                </div>

                                {/* Right Content */}
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {program.description}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-2">
                                                {program.improvement_label}
                                            </p>
                                            <p className="text-2xl sm:text-3xl font-bold text-orange-700">
                                                {program.improvement_stat}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-2">
                                                SESSIONS PER WEEK
                                            </p>
                                            <p className="text-2xl sm:text-3xl font-bold text-orange-700">
                                                {program.sessions_per_week}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                                        asChild
                                    >
                                        <Link href="/booking">
                                            Book assessment for this program
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
