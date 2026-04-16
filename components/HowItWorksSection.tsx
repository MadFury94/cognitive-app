export default function HowItWorksSection() {
    const steps = [
        {
            number: '1',
            title: 'Free assessment',
            description: 'Full cognitive profile mapping your child\'s strengths and gaps',
        },
        {
            number: '2',
            title: 'Custom program',
            description: 'A personalised training plan designed around your child\'s needs',
        },
        {
            number: '3',
            title: 'Brain training',
            description: 'Structured weekly sessions using proven cognitive methods',
        },
        {
            number: '4',
            title: 'Track progress',
            description: 'Regular reviews with measurable results in reading and focus',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 lg:mb-20">
                    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        How It Works
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        From assessment to transformation
                    </h2>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Timeline Line - Desktop */}
                    <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-orange-300/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-50" />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex flex-col items-center text-center">
                                {/* Mobile Timeline Connector */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden absolute left-1/2 top-24 bottom-0 w-0.5 bg-orange-300/50 -translate-x-1/2" />
                                )}

                                <div className="relative z-10">
                                    {/* Step Number Circle */}
                                    <div className="w-24 h-24 bg-white border-2 border-orange-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                        <span className="text-3xl font-bold text-orange-600">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
