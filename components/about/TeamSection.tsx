'use client';

import { useEffect, useState } from 'react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    initials: string;
    image_url: string | null;
    display_order: number;
}

export default function TeamSection() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTeamMembers();
    }, []);

    const loadTeamMembers = async () => {
        try {
            const response = await fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/team');
            if (!response.ok) {
                throw new Error('Failed to load team members');
            }
            const data = await response.json();
            setTeamMembers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error loading team members:', error);
            setError('Failed to load team members');
        } finally {
            setLoading(false);
        }
    };

    const getColorClasses = (index: number) => {
        const colors = [
            { bg: 'bg-orange-100', text: 'text-orange-700' },
            { bg: 'bg-blue-100', text: 'text-blue-700' },
            { bg: 'bg-orange-100', text: 'text-orange-700' },
            { bg: 'bg-purple-100', text: 'text-purple-700' },
            { bg: 'bg-green-100', text: 'text-green-700' },
        ];
        return colors[index % colors.length];
    };

    if (loading) {
        return (
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || teamMembers.length === 0) {
        return (
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-600">{error || 'No team members found'}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 lg:mb-16">
                    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        Our Specialists
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        The team behind the results
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {teamMembers.map((member, index) => {
                        const colors = getColorClasses(index);
                        return (
                            <div key={member.id} className="group">
                                {/* Image/Avatar */}
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-50">
                                    <div className={`absolute inset-0 ${colors.bg} flex items-center justify-center`}>
                                        <span className={`text-6xl font-bold ${colors.text}`}>
                                            {member.initials}
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
