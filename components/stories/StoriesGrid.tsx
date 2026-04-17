import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

export default function StoriesGrid() {
    const stories = [
        {
            type: 'Parent',
            name: 'Mrs. Adaeze Okafor',
            role: 'Mother of 9-year-old with dyslexia',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
            quote: "My daughter couldn't read at grade level. After 6 months at Cogniskills, she's now reading two grades ahead. The transformation has been nothing short of miraculous.",
            result: 'Reading improved by 3 grade levels',
            color: 'bg-orange-500',
        },
        {
            type: 'Parent',
            name: 'Mr. Chidi Nwosu',
            role: 'Father of 11-year-old with ADHD',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
            quote: "We tried medication, tutors, everything. Nothing worked until we found Cogniskills. They didn't just help him focus—they taught him how to learn. He's now thriving in school.",
            result: 'Focus improved by 70%',
            color: 'bg-orange-600',
        },
        {
            type: 'Student',
            name: 'Chiamaka, Age 13',
            role: 'Dyslexia program graduate',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
            quote: "I used to hate reading because it was so hard. Now I actually enjoy it! The brain training games made learning fun, and I can finally keep up with my classmates.",
            result: 'Now reads for pleasure',
            color: 'bg-orange-700',
        },
        {
            type: 'Expert',
            name: 'Dr. Ngozi Adeyemi',
            role: 'Cognitive Director, Cogniskills',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
            quote: "What sets our approach apart is that we don't just address symptoms—we train the underlying cognitive skills. When you strengthen working memory, processing speed, and attention, everything else improves.",
            result: '20+ years experience',
            color: 'bg-orange-800',
        },
        {
            type: 'Parent',
            name: 'Mrs. Blessing Okonkwo',
            role: 'Mother of 7-year-old with autism',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
            quote: "My son barely spoke when we started. The team here understood his unique needs and worked patiently with him. Six months later, he's speaking in full sentences and making friends at school.",
            result: 'Speech and social skills transformed',
            color: 'bg-orange-500',
        },
        {
            type: 'Parent',
            name: 'Mr. Tunde Adeyemi',
            role: 'Father of 10-year-old with learning delays',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            quote: "I was skeptical at first, but the results speak for themselves. My daughter went from failing to top of her class in 4 months. The personalized approach made all the difference.",
            result: 'From failing to top of class',
            color: 'bg-orange-600',
        },
        {
            type: 'Expert',
            name: 'Mrs. Chidinma Eze',
            role: 'ADHD & Autism Specialist',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
            quote: "Every child has unique strengths and challenges. Our assessments identify exactly where the gaps are, and our training targets those specific areas. That's why we see such dramatic improvements.",
            result: 'Specialist in neurodevelopmental disorders',
            color: 'bg-orange-700',
        },
        {
            type: 'Student',
            name: 'Emeka, Age 12',
            role: 'ADHD program participant',
            image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop',
            quote: "Before, I couldn't sit still or finish my homework. The brain training helped me learn how to focus. Now I can actually concentrate in class and my grades are way better!",
            result: 'Grades improved from D to B average',
            color: 'bg-orange-800',
        },
        {
            type: 'Parent',
            name: 'Mrs. Amaka Obi',
            role: 'Mother of 8-year-old with dyspraxia',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
            quote: "My son struggled with coordination and writing. The occupational therapy combined with cognitive training has been life-changing. He can now write neatly and participate in sports.",
            result: 'Motor skills dramatically improved',
            color: 'bg-orange-500',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Type Badge */}
                            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-6">
                                {story.type}
                            </div>

                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-orange-200 mb-4" />

                            {/* Quote */}
                            <blockquote className="text-gray-700 leading-relaxed mb-6 text-base">
                                "{story.quote}"
                            </blockquote>

                            {/* Result Badge */}
                            <div className="bg-orange-50 rounded-lg p-3 mb-6">
                                <p className="text-sm font-bold text-orange-700">
                                    ✓ {story.result}
                                </p>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                <div className={`w-12 h-12 ${story.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-white font-bold text-sm">
                                        {story.name.split(' ')[0].charAt(0)}{story.name.split(' ')[1]?.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-gray-900 font-bold text-sm">
                                        {story.name}
                                    </div>
                                    <div className="text-gray-600 text-xs">
                                        {story.role}
                                    </div>
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div className="flex gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-orange-500 text-orange-500"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
