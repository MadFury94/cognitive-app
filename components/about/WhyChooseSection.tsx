import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseSection() {
    const reasons = [
        'Over 20 years of specialized experience in cognitive training',
        'Certified specialists trained in neuroscience and education therapy',
        'Proven track record with 300+ successful student transformations',
        'Personalized programs tailored to each child\'s unique needs',
        'Regular progress tracking with measurable results',
        'Strong partnership with parents and schools',
        'Comprehensive support for multiple learning difficulties',
        '95% parent satisfaction rate',
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                            Why Choose Us
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Nigeria's trusted partner in learning transformation
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We don't just tutor subjects—we train the brain to learn better. Our evidence-based approach has helped hundreds of Nigerian families unlock their children's true potential.
                        </p>
                    </div>

                    {/* Right List */}
                    <div>
                        <ul className="space-y-4">
                            {reasons.map((reason, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
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
