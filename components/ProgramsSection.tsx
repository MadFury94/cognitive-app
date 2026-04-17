import { Brain, Focus, Users, MessageSquare, Pencil, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProgramsSection() {
    const programs = [
        {
            icon: BookOpen,
            title: 'Dyslexia',
            description: 'Structured reading and phonological training that rewires how the brain processes text.',
            link: '/services/dyslexia',
        },
        {
            icon: Focus,
            title: 'ADHD',
            description: 'Focus and executive function training that builds self-regulation for better learning.',
            link: '/services/adhd',
        },
        {
            icon: Users,
            title: 'Autism spectrum',
            description: 'Social cognition, communication, and sensory processing support tailored to each child.',
            link: '/services/autism',
        },
        {
            icon: MessageSquare,
            title: 'Speech disorders',
            description: 'Language processing and articulation therapy for clearer, more confident communication.',
            link: '/services/speech',
        },
        {
            icon: Pencil,
            title: 'Dyspraxia',
            description: 'Motor planning and coordination training to improve physical and written tasks.',
            link: '/services/dyspraxia',
        },
        {
            icon: Brain,
            title: 'Learning delays',
            description: 'Cognitive strengthening across memory, processing speed, and reasoning ability.',
            link: '/services/learning-delays',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 lg:mb-16">
                    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        What We Treat
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        A specialised program<br />for every challenge
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                                    <Icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {program.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {program.description}
                                </p>
                                <Button
                                    variant="link"
                                    className="text-orange-600 hover:text-orange-700 p-0 h-auto font-semibold group/link"
                                    asChild
                                >
                                    <Link href={program.link}>
                                        Learn more
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
