'use client';

import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
}

export default function StoriesGrid() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('https://cogniskills-app.onochieazukaeme.workers.dev/api/testimonials');
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    const getColorClass = (index: number) => {
        const colors = [
            'bg-orange-500',
            'bg-orange-600',
            'bg-orange-700',
            'bg-orange-800',
        ];
        return colors[index % colors.length];
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-orange-200 mb-4" />

                            {/* Quote */}
                            <blockquote className="text-gray-700 leading-relaxed mb-6 text-base">
                                "{testimonial.content}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                <div className={`w-12 h-12 ${getColorClass(index)} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-white font-bold text-sm">
                                        {getInitials(testimonial.name)}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-gray-900 font-bold text-sm">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-gray-600 text-xs">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div className="flex gap-1 mt-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-orange-500 text-orange-500"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
