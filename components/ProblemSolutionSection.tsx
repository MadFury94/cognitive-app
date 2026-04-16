import { CheckCircle2, XCircle } from 'lucide-react';

export default function ProblemSolutionSection() {
    const problems = [
        'Struggles to read or spell despite trying hard',
        'Cannot focus or stay on task at school',
        'Falling behind peers academically',
        'Growing frustration and loss of confidence',
        "Teachers say they're not trying enough",
    ];

    const solutions = [
        'Full cognitive assessment to map the gaps',
        'Targeted brain-training, not subject tutoring',
        'Measurable improvement tracked every week',
        'Better reading, focus, and self-confidence',
        'Regular updates for parents and teachers',
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Problems Card */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 lg:p-12 shadow-lg">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                            Is your child facing these?
                        </h2>
                        <ul className="space-y-6">
                            {problems.map((problem, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <XCircle className="w-6 h-6 text-red-500" />
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {problem}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions Card */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 lg:p-12 shadow-lg">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                            We find and fix the root cause
                        </h2>
                        <ul className="space-y-6">
                            {solutions.map((solution, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {solution}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
