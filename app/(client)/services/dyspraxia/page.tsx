import type { Metadata } from "next";
import PageHeader from '@/components/PageHeader';
import ServiceBookingForm from '@/components/services/ServiceBookingForm';
import { Pencil, CheckCircle2, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: "Dyspraxia Program Lagos | Cognigym Sensory-Motor Integration Training",
    description: "Cogniskills uses the Cognigym program to train sensory-motor integration, coordination, and fine motor skills in children with dyspraxia in Lagos.",
    alternates: { canonical: "https://cogniskillsleh.com/services/dyspraxia" },
};

export default function DyspraxiaPage() {
    return (
        <div className="min-h-screen">
            <PageHeader
                label="DYSPRAXIA PROGRAM"
                title="Sensory-motor integration & coordination training"
                description="The Cognigym program trains the brain-body connection — building the sensory-motor integration, fine motor control, and coordination skills children with dyspraxia need."
                imageSrc="https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381449/boy-doing-occupational-therapy-session_wtaz1e.jpg"
            />

            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    What is our Dyspraxia Program?
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    Dyspraxia is a difficulty with motor planning — the brain's ability to organise and execute physical movements. Children with dyspraxia often struggle with handwriting, sports, coordination, and everyday tasks that require the brain and body to work together.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    The Cognigym program trains sensory-motor integration directly. Using procedures like Output Fixation Tramp (OFT), Output Integration Tramp (OIT), Output Motor Clap (OMC), and Output Motor Finger (OMF), we build the brain-body connection that makes coordinated movement possible.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    All motor procedures are metronome-paced to develop rhythm, timing, and automaticity — so movements become natural rather than effortful.
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
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Address</h3>
                                <div className="space-y-4">
                                    {[
                                        'Poor sensory-motor integration — brain and body not working together',
                                        'Weak fine motor control — difficulty with handwriting and small tasks',
                                        'Gross motor coordination challenges',
                                        'Difficulty with sports and physical activities',
                                        'Poor spatial awareness and orientation',
                                        'Difficulty with sequential physical tasks',
                                        'Slow processing of physical instructions',
                                        'Low confidence in physical and written activities',
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
                            <ServiceBookingForm serviceName="Dyspraxia" serviceSlug="dyspraxia" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
