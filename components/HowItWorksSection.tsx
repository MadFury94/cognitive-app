import Image from 'next/image';
import { howItWorksContent } from '@/lib/content';

export default function HowItWorksSection() {
    const { eyebrow, heading, description, steps } = howItWorksContent;

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12 lg:mb-16">
                    <p className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        {heading}
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl text-lg">
                        {description}
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">

                            {/* Image */}
                            <div className="relative h-48 overflow-hidden bg-brand-50">
                                <Image
                                    src={step.image}
                                    alt={step.imageAlt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Step number badge */}
                                <div className="absolute top-3 left-3 w-9 h-9 bg-brand-600 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-white font-bold text-sm">{step.number}</span>
                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex flex-col flex-1 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className="h-1 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
