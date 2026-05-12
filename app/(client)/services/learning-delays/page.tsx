import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { Brain, CheckCircle2, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: "Learning Delays Program Lagos | Cognigym Memory & Processing Training",
    description: "Cogniskills uses the Cognigym program to train working memory, processing speed, and reasoning in children with learning delays in Lagos, Nigeria.",
    alternates: { canonical: "https://cogniskillsleh.com/services/learning-delays" },
};

export default function LearningDelaysPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="LEARNING DELAYS PROGRAM"
                title="Memory, processing speed & reasoning training"
                description="The Cognigym program targets the specific cognitive skills behind academic delays — working memory, processing speed, visual memory, and logic — so children can keep up and catch up."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381460/front-view-smiley-girl-making-puzzle_blmt0y.jpg"
            />

            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    What is our Learning Delays Program?
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    When a child is falling behind academically without a clear diagnosis, the cause is almost always a gap in one or more underlying cognitive skills. The brain hasn't developed the processing speed, working memory, or reasoning ability needed to keep up with the curriculum.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    The Cognigym learning delays program uses procedures like Memory Computation Columns (MCC), Memory Divided Attention (MDA), Visual Fixation Numbers (VFN), and Memory Orientation Arrows (MOA) to directly train the cognitive skills that academic learning depends on.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    We don't tutor subjects. We build the brain capacity that makes learning any subject easier.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-brand-50 to-amber-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Duration</h4>
                                            <p className="text-gray-700 text-sm">16-28 week program</p>
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
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Address</h3>
                                <div className="space-y-4">
                                    {[
                                        'Slow processing speed — takes too long to think and respond',
                                        'Weak working memory — forgets instructions mid-task',
                                        'Poor long-term memory — cannot retain what was learned',
                                        'Difficulty with logic and reasoning',
                                        'Academic underachievement across multiple subjects',
                                        'Difficulty learning new concepts',
                                        'Poor visual memory and spatial skills',
                                        'Low academic confidence and self-image',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-brand-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <ServiceBookingForm serviceName="Learning Delays" serviceSlug="learning-delays" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
