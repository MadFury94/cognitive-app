import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { BookOpen, CheckCircle2, Clock, Users } from 'lucide-react';

export default function DyslexiaPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="DYSLEXIA PROGRAM"
                title="Specialized reading & phonological training"
                description="Evidence-based Orton-Gillingham approach combined with cognitive brain training for lasting results."
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
                                    What is our Dyslexia Program?
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Our dyslexia program targets specific phonological and reading fluency deficits using the proven Orton-Gillingham approach combined with cognitive brain-training. We don't just teach reading—we rewire how the brain processes text.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Children see measurable gains in reading speed and comprehension within weeks, with most students improving by 2-4 grade levels over the course of the program.
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
                                            <p className="text-gray-700 text-sm">12-24 week program</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Sessions</h4>
                                            <p className="text-gray-700 text-sm">2-3 sessions per week</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Improvement</h4>
                                            <p className="text-gray-700 text-sm">2-4 grade levels average</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Approach</h4>
                                            <p className="text-gray-700 text-sm">Orton-Gillingham method</p>
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
                                        'Difficulty recognizing letters and sounds',
                                        'Slow, labored reading',
                                        'Poor reading comprehension',
                                        'Spelling challenges',
                                        'Difficulty with phonological awareness',
                                        'Letter and word reversals',
                                        'Avoidance of reading tasks',
                                        'Low reading confidence',
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
                                            1. Comprehensive Assessment
                                        </h4>
                                        <p className="text-gray-700">
                                            We start with a full phonological and reading assessment to identify specific deficits and strengths.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            2. Personalized Training Plan
                                        </h4>
                                        <p className="text-gray-700">
                                            Based on assessment results, we create a customized program targeting your child's specific needs.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            3. Structured Sessions
                                        </h4>
                                        <p className="text-gray-700">
                                            Regular one-on-one sessions using multisensory techniques and cognitive exercises.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            4. Progress Tracking
                                        </h4>
                                        <p className="text-gray-700">
                                            Regular assessments to measure improvement and adjust the program as needed.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Success Story */}
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">AF</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Mrs. Adaeze Okafor</h4>
                                        <p className="text-sm text-gray-600">Mother of 9-year-old with dyslexia</p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-700 italic leading-relaxed">
                                    "My daughter couldn't read at grade level. After 6 months at Cogniskills, she's now reading two grades ahead. The transformation has been nothing short of miraculous."
                                </blockquote>
                            </div>
                        </div>

                        {/* Sidebar - Booking Form */}
                        <div className="lg:col-span-1">
                            <ServiceBookingForm serviceName="Dyslexia" serviceSlug="dyslexia" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
