'use client';

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

export default function TestimonialsSection() {
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    const testimonials = [
        {
            quote: "My daughter went from reading two grades below to top of her class in just six months. Remarkable.",
            author: "Adaeze F.",
            role: "Parent, dyslexia",
            initials: "AF",
            color: "bg-orange-500",
        },
        {
            quote: "We'd tried everything for our son's ADHD. Cogniskills found the real problem. He's now thriving.",
            author: "Emeka O.",
            role: "Parent, ADHD",
            initials: "EO",
            color: "bg-teal-500",
        },
        {
            quote: "The team genuinely cares. Our son has made incredible social and academic progress.",
            author: "Chisom N.",
            role: "Parent, autism",
            initials: "CN",
            color: "bg-teal-600",
        },
        {
            quote: "After years of struggling, my son can finally read with confidence. The transformation has been life-changing.",
            author: "Ngozi A.",
            role: "Parent, dyslexia",
            initials: "NA",
            color: "bg-orange-600",
        },
        {
            quote: "The personalized approach made all the difference. Our daughter's focus and grades have improved dramatically.",
            author: "Chidi M.",
            role: "Parent, ADHD",
            initials: "CM",
            color: "bg-teal-700",
        },
        {
            quote: "Professional, caring, and effective. They truly understand learning difficulties and know how to help.",
            author: "Amaka B.",
            role: "Parent, learning delays",
            initials: "AB",
            color: "bg-orange-700",
        },
        {
            quote: "My son's speech has improved so much. He's more confident and communicates better with his peers now.",
            author: "Tunde K.",
            role: "Parent, speech disorders",
            initials: "TK",
            color: "bg-teal-800",
        },
        {
            quote: "The cognitive training program exceeded our expectations. Our child is now excelling in school and at home.",
            author: "Blessing O.",
            role: "Parent, dyspraxia",
            initials: "BO",
            color: "bg-orange-800",
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 lg:mb-16">
                    <p className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-3">
                        Success Stories
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        What parents are saying
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
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="bg-gray-800 rounded-2xl p-8 h-full">
                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-orange-500 text-orange-500"
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-gray-300 italic leading-relaxed mb-8 text-lg">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-white font-bold text-sm">
                                                {testimonial.initials}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold">
                                                {testimonial.author}
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
