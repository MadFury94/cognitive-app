'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { testimonialsSectionContent } from '@/lib/content';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
}

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

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
            <section className="py-16 lg:py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-16 lg:py-24 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 lg:mb-16">
                    <p className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-3">
                        {testimonialsSectionContent.eyebrow}
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        {testimonialsSectionContent.heading}
                    </h2>
                </div>

                {/* Carousel for all screen sizes */}
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="bg-gray-800 rounded-2xl p-8 h-full">
                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-orange-500 text-orange-500"
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-gray-300 italic leading-relaxed mb-8 text-lg">
                                        "{testimonial.content}"
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${getColorClass(index)} rounded-full flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-white font-bold text-sm">
                                                {getInitials(testimonial.name)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-gray-400 text-sm">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
            </div>
        </section>
    );
}
