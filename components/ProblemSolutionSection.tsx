import { CheckCircle2, XCircle } from 'lucide-react';
import { problemSolutionContent } from '@/lib/content';

export default function ProblemSolutionSection() {
    const { problemsHeading, solutionsHeading, problems, solutions } = problemSolutionContent;

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Problems Card */}
                    <div className="bg-gradient-to-br from-red-50 to-brand-50 rounded-3xl p-8 lg:p-12 shadow-lg">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                            {problemsHeading}
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
                    <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-3xl p-8 lg:p-12 shadow-lg">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                            {solutionsHeading}
                        </h2>
                        <ul className="space-y-6">
                            {solutions.map((solution, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-brand-600" />
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
