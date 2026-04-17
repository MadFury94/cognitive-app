import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { Focus, CheckCircle2, Clock, Users, TrendingUp } from 'lucide-react';

export default function ADHDPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="ADHD PROGRAM"
                title="Executive function & attention training"
                description="Build self-regulation skills through cognitive exercises and practical strategies for home and school."
                imageSrc="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop"
            />

            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Overview */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    What is our ADHD Program?
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Executive function and attention training designed to build the self-regulation skills children with ADHD need. We combine cognitive exercises with practical strategies that parents and teachers can reinforce at home and in class.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Our program focuses on strengthening working memory, impulse control, and sustained attention—the core deficits in ADHD.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Program Highlights
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Duration</h4>
                                            <p className="text-gray-700 text-sm">8-16 week program</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Sessions</h4>
                                            <p className="text-gray-700 text-sm">2 sessions per week</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Improvement</h4>
                                            <p className="text-gray-700 text-sm">62% better focus on average</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Focus className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Focus</h4>
                                            <p className="text-gray-700 text-sm">Executive function training</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* What We Address */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    What We Address
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        'Difficulty sustaining attention',
                                        'Impulsivity and poor self-control',
                                        'Hyperactivity and restlessness',
                                        'Difficulty following instructions',
                                        'Poor time management',
                                        'Disorganization',
                                        'Incomplete homework and tasks',
                                        'Emotional regulation challenges',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How It Works */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    How It Works
                                </h3>
                                <div className="space-y-6">
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            1. Executive Function Assessment
                                        </h4>
                                        <p className="text-gray-700">
                                            Comprehensive evaluation of attention, working memory, and impulse control.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            2. Cognitive Training
                                        </h4>
                                        <p className="text-gray-700">
                                            Targeted exercises to strengthen attention, working memory, and self-regulation.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            3. Strategy Development
                                        </h4>
                                        <p className="text-gray-700">
                                            Practical tools and techniques for managing ADHD symptoms in daily life.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            4. Parent & Teacher Support
                                        </h4>
                                        <p className="text-gray-700">
                                            Guidance for reinforcing strategies at home and school for lasting results.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Success Story */}
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">CN</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Mr. Chidi Nwosu</h4>
                                        <p className="text-sm text-gray-600">Father of 11-year-old with ADHD</p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-700 italic leading-relaxed">
                                    "We tried medication, tutors, everything. Nothing worked until we found Cogniskills. They didn't just help him focus—they taught him how to learn. He's now thriving in school."
                                </blockquote>
                            </div>
                        </div>

                        {/* Sidebar - Booking Form */}
                        <div className="lg:col-span-1">
                            <ServiceBookingForm serviceName="ADHD" serviceSlug="adhd" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
