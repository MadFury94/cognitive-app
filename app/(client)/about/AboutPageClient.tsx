'use client';

import PageHeader from '@/components/PageHeader';
import StatsSection from '@/components/about/StatsSection';
import TeamSection from '@/components/about/TeamSection';
import ApproachSection from '@/components/about/ApproachSection';
import WhyChooseSection from '@/components/about/WhyChooseSection';
import CTASection from '@/components/CTASection';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ParticleBackground = dynamic(
    () => import('@/components/three/ParticleBackground'),
    { ssr: false }
);

export default function AboutPageClient() {
    return (
        <div className="min-h-screen relative">
            <div className="fixed inset-0 opacity-20 pointer-events-none hidden lg:block z-0">
                <Suspense fallback={<div />}>
                    <ParticleBackground />
                </Suspense>
            </div>
            <div className="relative z-10">
                <PageHeader
                    label="ABOUT US"
                    title="Transforming lives through cognitive training"
                    description="For over 20 years, we've helped Nigerian families unlock their children's true potential through evidence-based brain training programs."
                    imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/v1776382800/program_l3y4z3.jpg"
                />
                <StatsSection />
                <TeamSection />
                <ApproachSection />
                <WhyChooseSection />
                <CTASection />
            </div>
        </div>
    );
}
