import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { Focus, CheckCircle2, Clock, Users, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: "ADHD Program Lagos | Cognigym Attention & Focus Training",
    description: "Cogniskills uses the Cognigym program to train sustained attention, divided attention, working memory, and impulse control in children with ADHD in Lagos.",
    alternates: { canonical: "https://cogniskillsleh.com/services/adhd" },
};

export default function ADHDPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="ADHD PROGRAM"
                title="Attention, focus & self-regulation training"
                description="The Cognigym program builds sustained attention, divided attention, and working memory — the core brain skills children with ADHD need to function at school and home."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381449/boy-doing-occupational-therapy-session_wtaz1e.jpg"
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
                                    ADHD is fundamentally an attention problem — but attention is a trainable brain skill. The Cognigym program breaks attention into three distinct skills: sustained attention (staying on task), selective attention (ignoring distractions), and divided attention (handling two things at once). We train all three.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Using procedures like Memory Divided Attention (MDA), Output Motor Clap (OMC), Output Motor Finger (OMF), and Input Fixation Baseball (IFB), we progressively build your child's ability to focus — starting at their current level and systematically extending it.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    The metronome is central to every session. It creates intensity, prevents mental breaks, and trains the brain to stay on task automatically.
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
                                            <p className="text-gray-700 text-sm">Cognigym attention training system</p>
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
                                        'Weak sustained attention — cannot stay on task',
                                        'Poor selective attention — easily distracted',
                                        'Difficulty with divided attention — cannot multitask',
                                        'Impulsivity and poor self-control',
                                        'Hyperactivity and restlessness',
                                        'Difficulty following multi-step instructions',
                                        'Incomplete homework and tasks',
                                        'Slow processing speed under pressure',
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
                                            1. Attention Assessment
                                        </h4>
                                        <p className="text-gray-700">
                                            We measure your child's current sustained, selective, and divided attention levels — establishing a precise baseline to train from.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            2. Cognigym Attention Training
                                        </h4>
                                        <p className="text-gray-700">
                                            Targeted MDA, OMC, OMF, and IFB procedures progressively extend focus time, add distractions, and layer mental tasks — building all three attention types.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            3. The Focus Game
                                        </h4>
                                        <p className="text-gray-700">
                                            We time how long your child stays on task, tell them exactly what caused them to lose focus, and set incremental goals to extend their attention span session by session.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-600 pl-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                                            4. Parent & Teacher Briefing
                                        </h4>
                                        <p className="text-gray-700">
                                            We share strategies for reinforcing attention skills at home and school, so progress continues between sessions.
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
