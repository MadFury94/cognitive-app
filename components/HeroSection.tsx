'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

export default function HeroSection() {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    // Placeholder images - replace with actual images from your public folder
    const heroImages = [
        { src: 'https://res.cloudinary.com/dqwfjxn8g/image/upload/v1776381482/cognitive_kids_1_qlg5xu.jpg', alt: 'Children learning' },
        { src: 'https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381460/front-view-smiley-girl-making-puzzle_blmt0y.jpg', alt: 'Cognitive training session' },
        { src: 'https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381449/boy-doing-occupational-therapy-session_wtaz1e.jpg', alt: 'Educational activities' },
    ];

    const stats = [
        { value: '20+', label: 'Years experience' },
        { value: '300+', label: 'Students helped' },
        { value: '8', label: 'Conditions treated' },
        { value: '95%', label: 'Parent satisfaction' },
    ];

    return (
        <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm">
                                Cognitive Skills Training · Lagos, Nigeria
                            </p>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Every child deserves to{' '}
                                <span className="text-orange-600 italic">learn without limits</span>
                            </h1>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            Scientifically grounded cognitive training for children with dyslexia, ADHD, autism, and learning delays. We train the brain, not just the subject.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-base"
                                asChild
                            >
                                <Link href="/book-assessment">
                                    Book free assessment
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-gray-300 hover:border-orange-600 hover:text-orange-600 px-8 py-6 text-base"
                                asChild
                            >
                                <Link href="/brain-test">
                                    Take brain test
                                </Link>
                            </Button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image Carousel */}
                    <div className="relative">
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent>
                                {heroImages.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-orange-50">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </Carousel>

                        {/* Stats Cards Overlay */}
                        <div className="absolute -bottom-8 left-0 right-0 grid grid-cols-2 gap-4 px-4">
                            <div className="bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm bg-white/95">
                                <div className="text-2xl font-bold text-orange-600">20+</div>
                                <div className="text-xs text-gray-600">Years of excellence</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm bg-white/95">
                                <div className="text-2xl font-bold text-orange-600">300+</div>
                                <div className="text-xs text-gray-600">Families transformed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
