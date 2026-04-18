import { NextResponse } from 'next/server';

// This is a placeholder - in production, you'd connect to your D1 database
// For now, we'll return the hardcoded data
export async function GET() {
    const programs = [
        {
            id: 1,
            slug: 'dyslexia',
            title: 'Dyslexia',
            description: 'Structured reading and phonological training that rewires how the brain processes text.',
            duration: '12-24 weeks',
            sessions_per_week: '2-3 sessions',
            improvement_stat: '2-4 grade levels',
            improvement_label: 'AVG. IMPROVEMENT',
            icon: 'BookOpen',
        },
        {
            id: 2,
            slug: 'adhd',
            title: 'ADHD',
            description: 'Focus and executive function training that builds self-regulation for better learning.',
            duration: '8-16 weeks',
            sessions_per_week: '2 sessions',
            improvement_stat: '62% better',
            improvement_label: 'FOCUS IMPROVEMENT',
            icon: 'Focus',
        },
        {
            id: 3,
            slug: 'autism',
            title: 'Autism spectrum',
            description: 'Social cognition, communication, and sensory processing support tailored to each child.',
            duration: '16-32 weeks',
            sessions_per_week: '2-3 sessions',
            improvement_stat: '3-5 milestones',
            improvement_label: 'AVG. PROGRESS',
            icon: 'Users',
        },
        {
            id: 4,
            slug: 'speech',
            title: 'Speech disorders',
            description: 'Language processing and articulation therapy for clearer, more confident communication.',
            duration: '12-20 weeks',
            sessions_per_week: '2 sessions',
            improvement_stat: '70% clarity',
            improvement_label: 'SPEECH IMPROVEMENT',
            icon: 'MessageSquare',
        },
        {
            id: 5,
            slug: 'dyspraxia',
            title: 'Dyspraxia',
            description: 'Motor planning and coordination training to improve physical and written tasks.',
            duration: '12-24 weeks',
            sessions_per_week: '2-3 sessions',
            improvement_stat: '4-6 skills',
            improvement_label: 'MOTOR SKILLS GAINED',
            icon: 'Pencil',
        },
        {
            id: 6,
            slug: 'learning-delays',
            title: 'Learning delays',
            description: 'Cognitive strengthening across memory, processing speed, and reasoning ability.',
            duration: '16-28 weeks',
            sessions_per_week: '2-3 sessions',
            improvement_stat: '2-3 grade levels',
            improvement_label: 'AVG. IMPROVEMENT',
            icon: 'Brain',
        },
    ];

    return NextResponse.json(programs);
}
