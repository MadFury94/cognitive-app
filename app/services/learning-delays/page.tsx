import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { Brain, CheckCircle2, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: "Learning Delays Program for Children Lagos",
    description: "Cognitive strengthening for children with learning delays in Lagos. Target memory, processing speed, and reasoning to unlock academic potential.",
    alternates: { canonical: "https://cogniskillsleh.com/services/learning-delays" },
};

export default function LearningDelaysPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="LEARNING DELAYS PROGRAM"
                title="Cognitive strengthening across all areas"
                description="Target specific cognitive weaknesses in memory, processing speed, and reasoning ability."
                imageSrc="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop"
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
                                    Cognitive strengthening across memory, processing speed, and reasoning ability. We identify and target specific cognitive weaknesses that are holding your child back academically.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Duration</h4>
                                            <p className="text-gray-700 text-sm">16-28 week program</p>
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
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Address</h3>
                                <div className="space-y-4">
                                    {[
                                        'Slow processing speed',
                                        'Poor working memory',
                                        'Difficulty with reasoning',
                                        'Academic underachievement',
                                        'Difficulty learning new concepts',
                                        'Poor retention of information',
                                        'Struggles across multiple subjects',
                                        'Low academic confidence',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
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
