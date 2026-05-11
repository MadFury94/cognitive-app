import { Brain, Target, LineChart, Users } from 'lucide-react';
import { aboutContent } from '@/lib/content';

const icons = [Brain, Target, LineChart, Users];

export default function ApproachSection() {
    const { eyebrow, heading, pillars } = aboutContent.approach;

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 lg:mb-16">
                    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        {heading}
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, index) => {
                        const Icon = icons[index];
                        return (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Icon className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {pillar.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
