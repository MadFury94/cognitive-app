import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { Users, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: "Autism Spectrum Program Lagos | Cognigym Cognitive Training",
    description: "Cogniskills uses the Cognigym program to build comprehension, visual thinking, and reasoning skills in children on the autism spectrum in Lagos, Nigeria.",
    alternates: { canonical: "https://cogniskillsleh.com/services/autism" },
};

export default function AutismPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="AUTISM SPECTRUM PROGRAM"
                title="Comprehension, reasoning & communication training"
                description="The Cognigym program builds the cognitive skills behind social understanding and communication — visualization, logic, reasoning, and comprehension — one skill at a time."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381449/boy-doing-occupational-therapy-session_wtaz1e.jpg"
            />

            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    What is our Autism Spectrum Program?
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Children on the autism spectrum often have strong abilities in some areas but significant gaps in the cognitive skills that underpin communication, comprehension, and social reasoning. The Cognigym program addresses these gaps directly.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Using procedures like Comprehension Demonstration Ideas (CDI), Reasoning Visual Cards (RVC), and Reasoning Spatial Tic-Tac-Toe (RST), we train visualization, logic, and comprehension — the brain skills that help children understand language, follow context, and make sense of the world around them.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Every program is built around the individual child's cognitive profile, not a generic autism checklist.
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
                                            <p className="text-gray-700 text-sm">16-32 week program</p>
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
                                        'Weak comprehension — difficulty understanding words and context',
                                        'Poor visualization — cannot form mental images from language',
                                        'Difficulty with logic and reasoning',
                                        'Limited social communication and language use',
                                        'Difficulty understanding social cues and context',
                                        'Challenges with problem-solving and flexible thinking',
                                        'Sensory processing difficulties',
                                        'Emotional regulation and transitions',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-brand-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
                                <div className="space-y-6">
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">1. Cognitive Profile Assessment</h4>
                                        <p className="text-gray-700">We map comprehension, visualization, reasoning, and processing skills to identify exactly where the gaps are.</p>
                                    </div>
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">2. Cognigym Reasoning & Comprehension Training</h4>
                                        <p className="text-gray-700">CDI, RVC, and RST procedures build the cognitive foundations for understanding language, context, and social situations.</p>
                                    </div>
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">3. Structured, Predictable Sessions</h4>
                                        <p className="text-gray-700">Sessions follow a consistent structure that children on the spectrum can anticipate and feel safe in, reducing anxiety and maximising engagement.</p>
                                    </div>
                                    <div className="border-l-4 border-brand-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">4. Family Progress Updates</h4>
                                        <p className="text-gray-700">Regular reports on cognitive skill development, with practical guidance for parents on reinforcing skills at home.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <ServiceBookingForm serviceName="Autism Spectrum" serviceSlug="autism" />
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}
