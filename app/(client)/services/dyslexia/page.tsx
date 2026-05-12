import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { BookOpen, CheckCircle2, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: "Dyslexia Program Lagos | Cognigym Auditory Processing Training",
    description: "Cogniskills uses the Cognigym program to train auditory processing, phonological awareness, and reading fluency in children with dyslexia in Lagos. Book an assessment today.",
    alternates: { canonical: "https://cogniskillsleh.com/services/dyslexia" },
};

export default function DyslexiaPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="DYSLEXIA PROGRAM"
                title="Auditory processing & reading fluency training"
                description="The Cognigym program trains the brain skills behind reading — not reading itself. We target auditory processing, phonological awareness, and sound blending at the root."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381460/front-view-smiley-girl-making-puzzle_blmt0y.jpg"
            />

            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    What is our Dyslexia Program?
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Dyslexia is not a reading problem — it's a brain processing problem. Children with dyslexia struggle because the underlying cognitive skills that make reading possible haven't developed properly: auditory processing, phonological awareness, sound blending, and sequential processing.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    The Cognigym dyslexia program targets these root skills directly. Using structured procedures like Auditory Blend Read (ABR), Auditory Segment Word (ASW), Auditory Analysis, and the 17-sound Auditory Instruction Code (AIC), we train the brain to process sounds accurately and quickly — so reading and spelling become natural.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Every session is metronome-paced to build processing speed and embed skills automatically. Children don't just improve — they rewire.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-brand-50 to-amber-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Program Highlights
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Duration</h4>
                                            <p className="text-gray-700 text-sm">12-24 week program</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Sessions</h4>
                                            <p className="text-gray-700 text-sm">2-3 sessions per week</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Improvement</h4>
                                            <p className="text-gray-700 text-sm">2-4 grade levels average</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Approach</h4>
                                            <p className="text-gray-700 text-sm">Cognigym auditory processing system</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    What We Address
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        'Weak auditory processing — difficulty hearing differences in sounds',
                                        'Poor phonological awareness — cannot break words into sounds',
                                        'Slow or labored reading and decoding',
                                        'Spelling challenges and letter reversals',
                                        'Difficulty blending sounds to form words',
                                        'Weak sequential processing — losing track of sound order',
                                        'Low reading confidence and avoidance',
                                        'Poor reading comprehension despite effort',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-brand-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    How It Works
                                </h3>
                                <div className="space-y-6">
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">1. Cognitive Assessment</h4>
                                        <p className="text-gray-700">We assess auditory processing, phonological awareness, working memory, and processing speed to build a precise cognitive profile.</p>
                                    </div>
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">2. Cognigym Training Plan</h4>
                                        <p className="text-gray-700">A personalised program using Cognigym auditory procedures — AIC, ASW, ABR, ABO, AAD, AAR, AAS — targeting your child's specific gaps.</p>
                                    </div>
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">3. Metronome-Paced Sessions</h4>
                                        <p className="text-gray-700">One-on-one sessions with a metronome to build processing speed, embed skills automatically, and develop sustained attention.</p>
                                    </div>
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">4. Progress Tracking</h4>
                                        <p className="text-gray-700">Regular assessments with clear passing criteria. Parents receive updates on exactly which skills have been mastered.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
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

                        <div className="lg:col-span-1">
                            <ServiceBookingForm serviceName="Dyslexia" serviceSlug="dyslexia" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
