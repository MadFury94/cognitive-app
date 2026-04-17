import { BookOpen, Focus, Users, MessageSquare, Pencil, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProgramsList() {
    const programs = [
        {
            icon: BookOpen,
            title: 'Dyslexia',
            duration: '12–24 week program',
            description: 'Our dyslexia program targets specific phonological and reading fluency deficits using the Orton–Gillingham approach combined with cognitive brain-training. Children see measurable gains in reading speed and comprehension within weeks.',
            avgImprovement: '2-4 grade levels',
            avgLabel: 'AVG. IMPROVEMENT',
            sessions: '2–3 sessions',
            sessionsLabel: 'SESSIONS PER WEEK',
        },
        {
            icon: Focus,
            title: 'ADHD',
            duration: '8–16 week program',
            description: 'Executive function and attention training designed to build the self-regulation skills children with ADHD need. We combine cognitive exercises with practical strategies that parents and teachers can reinforce at home and in class.',
            avgImprovement: '62% better',
            avgLabel: 'FOCUS IMPROVEMENT',
            sessions: '2 sessions',
            sessionsLabel: 'SESSIONS PER WEEK',
        },
        {
            icon: Users,
            title: 'Autism spectrum',
            duration: '16–32 week program',
            description: 'Social cognition, communication, and sensory processing support tailored to each child on the spectrum. Our structured approach helps children develop better social understanding and adaptive skills.',
            avgImprovement: '3-5 milestones',
            avgLabel: 'AVG. PROGRESS',
            sessions: '2–3 sessions',
            sessionsLabel: 'SESSIONS PER WEEK',
        },
        {
            icon: MessageSquare,
            title: 'Speech disorders',
            duration: '12–20 week program',
            description: 'Language processing and articulation therapy for clearer, more confident communication. We address both expressive and receptive language challenges with evidence-based techniques.',
            avgImprovement: '70% clarity',
            avgLabel: 'SPEECH IMPROVEMENT',
            sessions: '2 sessions',
            sessionsLabel: 'SESSIONS PER WEEK',
        },
        {
            icon: Pencil,
            title: 'Dyspraxia',
            duration: '12–24 week program',
            description: 'Motor planning and coordination training to improve physical and written tasks. Our program strengthens the connection between cognitive planning and physical execution.',
            avgImprovement: '4-6 skills',
            avgLabel: 'MOTOR SKILLS GAINED',
            sessions: '2–3 sessions',
            sessionsLabel: 'SESSIONS PER WEEK',
        },
        {
            icon: Brain,
            title: 'Learning delays',
            duration: '16–28 week program',
            description: 'Cognitive strengthening across memory, processing speed, and reasoning ability. We identify and target specific cognitive weaknesses that are holding your child back academically.',
            avgImprovement: '2-3 grade levels',
            avgLabel: 'AVG. IMPROVEMENT',
            sessions: '2–3 sessions',
            sessionsLabel: 'SESSIONS PER WEEK',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-12 lg:space-y-16">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        return (
                            <div
                                key={index}
                                className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start"
                            >
                                {/* Left Card */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:sticky lg:top-8">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {program.title}
                                    </h3>
                                    <p className="text-sm text-orange-700 font-medium">
                                        {program.duration}
                                    </p>
                                </div>

                                {/* Right Content */}
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {program.description}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-2">
                                                {program.avgLabel}
                                            </p>
                                            <p className="text-2xl sm:text-3xl font-bold text-orange-700">
                                                {program.avgImprovement}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-2">
                                                {program.sessionsLabel}
                                            </p>
                                            <p className="text-2xl sm:text-3xl font-bold text-orange-700">
                                                {program.sessions}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                                        asChild
                                    >
                                        <Link href="/booking">
                                            Book assessment for this program
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
