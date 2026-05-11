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
import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { heroContent } from '@/lib/content';

const BrainVisualization = dynamic(
    () => import('@/components/three/BrainVisualization'),
    { ssr: false }
);

export default function HeroSection() {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
            {/* 3D Brain Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
                <Suspense fallback={<div />}>
                    <BrainVisualization />
                </Suspense>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm">
                                {heroContent.eyebrow}
                            </p>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                {heroContent.headline}{' '}
                                <span className="text-orange-600 italic">{heroContent.headlineAccent}</span>
                            </h1>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            {heroContent.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-base"
                                asChild
                            >
                                <Link href={heroContent.primaryCta.href}>
                                    {heroContent.primaryCta.label}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-gray-300 hover:border-orange-600 hover:text-orange-600 px-8 py-6 text-base"
                                asChild
                            >
                                <Link href={heroContent.secondaryCta.href}>
                                    {heroContent.secondaryCta.label}
                                </Link>
                            </Button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                            {heroContent.stats.map((stat, index) => (
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
                                {heroContent.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-orange-50">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 50vw"
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
                            {heroContent.overlayStats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm bg-white/95">
                                    <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
                                    <div className="text-xs text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
