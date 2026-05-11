import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { MessageSquare, CheckCircle2, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: "Speech Disorders Program Lagos | Cognigym Auditory Processing Training",
    description: "Cogniskills uses the Cognigym program to train auditory processing, sound blending, and language skills in children with speech disorders in Lagos.",
    alternates: { canonical: "https://cogniskillsleh.com/services/speech" },
};

export default function SpeechPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="SPEECH DISORDERS PROGRAM"
                title="Auditory processing & language training"
                description="The Cognigym program trains the brain skills behind speech — auditory processing, sound discrimination, blending, and language comprehension — so children can communicate clearly and confidently."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381460/front-view-smiley-girl-making-puzzle_blmt0y.jpg"
            />

            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    What is our Speech Disorders Program?
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Speech difficulties are often rooted in how the brain processes sound. Children who struggle to speak clearly, form words, or express themselves may have underlying weaknesses in auditory processing, auditory discrimination, or sound blending — not just a speech habit.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    The Cognigym speech program uses the Auditory Instruction Code (AIC) to drill the 17 core sounds used in language, alongside Auditory Segment Word (ASW), Auditory Blend Read (ABR), and Auditory Blend Oral (ABO) to train the brain to hear, process, and produce sounds accurately.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    When the brain can process sounds correctly, speech and language follow naturally.
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
                                            <p className="text-gray-700 text-sm">12-20 week program</p>
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
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Address</h3>
                                <div className="space-y-4">
                                    {[
                                        'Weak auditory processing — difficulty hearing and distinguishing sounds',
                                        'Poor auditory discrimination — cannot hear differences in similar sounds',
                                        'Difficulty blending sounds to form words',
                                        'Difficulty segmenting words into individual sounds',
                                        'Expressive language delays — struggles to form sentences',
                                        'Receptive language challenges — difficulty understanding spoken language',
                                        'Articulation difficulties and unclear speech',
                                        'Limited vocabulary and word retrieval',
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
                            <ServiceBookingForm serviceName="Speech Disorders" serviceSlug="speech" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
