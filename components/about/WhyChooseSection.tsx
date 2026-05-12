import { CheckCircle2 } from 'lucide-react';
import { aboutContent } from '@/lib/content';

export default function WhyChooseSection() {
    const { eyebrow, heading, description, reasons } = aboutContent.whyChoose;

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <p className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">
                            {eyebrow}
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {heading}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div>
                        <ul className="space-y-4">
                            {reasons.map((reason, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 leading-relaxed">
                                        {reason}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
