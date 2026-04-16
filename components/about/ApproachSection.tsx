import { Brain, Target, LineChart, Users } from 'lucide-react';

export default function ApproachSection() {
    const approaches = [
        {
            icon: Brain,
            title: 'Science-based methods',
            description: 'Our programs are built on proven neuroscience and cognitive psychology research.',
        },
        {
            icon: Target,
            title: 'Personalized training',
            description: 'Every child gets a custom program designed around their unique cognitive profile.',
        },
        {
            icon: LineChart,
            title: 'Measurable progress',
            description: 'Regular assessments track improvement in reading, focus, and cognitive skills.',
        },
        {
            icon: Users,
            title: 'Family partnership',
            description: 'We work closely with parents and teachers to ensure lasting results.',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 lg:mb-16">
                    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        Our Approach
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        How we make a difference
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {approaches.map((approach, index) => {
                        const Icon = approach.icon;
                        return (
                            <div
                                key={index}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Icon className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {approach.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {approach.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
