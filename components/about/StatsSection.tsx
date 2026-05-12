'use client';

import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

export default function StatsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const stats = [
        {
            value: 20,
            suffix: '+',
            label: 'Years in practice',
        },
        {
            value: 300,
            suffix: '+',
            label: 'Students trained',
        },
        {
            value: 8,
            suffix: '+',
            label: 'Conditions treated',
        },
        {
            value: 95,
            suffix: '%',
            label: 'Parent satisfaction',
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="py-16 lg:py-20 bg-gradient-to-br from-brand-50 via-amber-50 to-brand-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-600 mb-3">
                                {isVisible ? (
                                    <>
                                        <CountUp
                                            end={stat.value}
                                            duration={2.5}
                                            separator=","
                                        />
                                        {stat.suffix}
                                    </>
                                ) : (
                                    `0${stat.suffix}`
                                )}
                            </div>
                            <div className="text-gray-600 text-sm sm:text-base">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
