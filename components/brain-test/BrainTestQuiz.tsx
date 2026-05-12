'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, CheckCircle2, AlertCircle, AlertTriangle, ChevronRight } from 'lucide-react';

// Each question maps to a cognitive skill area
interface Question {
    id: number;
    area: string;
    areaLabel: string;
    question: string;
    options: { label: string; score: number }[];
}

const questions: Question[] = [
    {
        id: 1,
        area: 'reading',
        areaLabel: 'Reading & Phonics',
        question: 'How does your child handle reading aloud?',
        options: [
            { label: 'Reads fluently with good comprehension', score: 3 },
            { label: 'Reads slowly but manages most words', score: 2 },
            { label: 'Struggles with many words, skips or guesses', score: 1 },
            { label: 'Avoids reading or cannot decode basic words', score: 0 },
        ],
    },
    {
        id: 2,
        area: 'spelling',
        areaLabel: 'Spelling & Writing',
        question: 'How is your child\'s spelling?',
        options: [
            { label: 'Spells most words correctly', score: 3 },
            { label: 'Makes occasional errors but improving', score: 2 },
            { label: 'Frequently misspells common words', score: 1 },
            { label: 'Spelling is very poor or inconsistent', score: 0 },
        ],
    },
    {
        id: 3,
        area: 'attention',
        areaLabel: 'Attention & Focus',
        question: 'How long can your child focus on schoolwork without getting distracted?',
        options: [
            { label: 'More than 20 minutes without prompting', score: 3 },
            { label: '10–20 minutes with occasional reminders', score: 2 },
            { label: 'Less than 10 minutes, needs constant prompting', score: 1 },
            { label: 'Cannot sustain focus even for a few minutes', score: 0 },
        ],
    },
    {
        id: 4,
        area: 'memory',
        areaLabel: 'Working Memory',
        question: 'When you give your child a sequence of instructions (e.g. "put your bag away, wash your hands, then sit down"), what happens?',
        options: [
            { label: 'Follows all steps without reminders', score: 3 },
            { label: 'Usually manages but sometimes forgets the last step', score: 2 },
            { label: 'Often forgets steps mid-way through', score: 1 },
            { label: 'Can only follow one instruction at a time', score: 0 },
        ],
    },
    {
        id: 5,
        area: 'processing',
        areaLabel: 'Processing Speed',
        question: 'How quickly does your child respond to questions or complete tasks compared to peers?',
        options: [
            { label: 'At the same pace or faster than peers', score: 3 },
            { label: 'Slightly slower but catches up', score: 2 },
            { label: 'Noticeably slower, often the last to finish', score: 1 },
            { label: 'Very slow, struggles to complete tasks in time', score: 0 },
        ],
    },
    {
        id: 6,
        area: 'listening',
        areaLabel: 'Auditory Processing',
        question: 'How well does your child follow verbal instructions given in class or at home?',
        options: [
            { label: 'Understands and follows instructions well', score: 3 },
            { label: 'Occasionally mishears or needs repetition', score: 2 },
            { label: 'Frequently misunderstands or asks for repetition', score: 1 },
            { label: 'Often seems not to hear or process what is said', score: 0 },
        ],
    },
    {
        id: 7,
        area: 'maths',
        areaLabel: 'Logic & Reasoning',
        question: 'How does your child handle problem-solving tasks like maths or puzzles?',
        options: [
            { label: 'Approaches problems logically and confidently', score: 3 },
            { label: 'Manages with some support', score: 2 },
            { label: 'Gets frustrated quickly, avoids problem-solving', score: 1 },
            { label: 'Cannot work through problems independently', score: 0 },
        ],
    },
    {
        id: 8,
        area: 'coordination',
        areaLabel: 'Motor Skills & Coordination',
        question: 'How is your child\'s handwriting and physical coordination (sports, tying laces, etc.)?',
        options: [
            { label: 'Age-appropriate, no concerns', score: 3 },
            { label: 'Slightly untidy or clumsy but manageable', score: 2 },
            { label: 'Noticeably poor handwriting or coordination', score: 1 },
            { label: 'Significant difficulty with physical tasks', score: 0 },
        ],
    },
    {
        id: 9,
        area: 'confidence',
        areaLabel: 'Confidence & Motivation',
        question: 'How does your child feel about school and learning?',
        options: [
            { label: 'Generally positive and motivated', score: 3 },
            { label: 'Mixed — some subjects fine, others cause anxiety', score: 2 },
            { label: 'Often reluctant, says they are "stupid" or "can\'t do it"', score: 1 },
            { label: 'Refuses school, strong emotional reactions to learning', score: 0 },
        ],
    },
    {
        id: 10,
        area: 'progress',
        areaLabel: 'Academic Progress',
        question: 'How is your child performing relative to their class?',
        options: [
            { label: 'At or above grade level', score: 3 },
            { label: 'Slightly behind but progressing', score: 2 },
            { label: 'Noticeably behind in one or more subjects', score: 1 },
            { label: 'Significantly behind, teachers have raised concerns', score: 0 },
        ],
    },
];

// Map area keys to friendly concern labels
const areaNames: Record<string, string> = {
    reading: 'Reading & Phonics',
    spelling: 'Spelling & Writing',
    attention: 'Attention & Focus',
    memory: 'Working Memory',
    processing: 'Processing Speed',
    listening: 'Auditory Processing',
    maths: 'Logic & Reasoning',
    coordination: 'Motor Skills',
    confidence: 'Confidence & Motivation',
    progress: 'Academic Progress',
};

export default function BrainTestQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ area: string; score: number }[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);

    const handleSelect = (score: number) => {
        setSelected(score);
    };

    const handleNext = () => {
        if (selected === null) return;
        const newAnswers = [...answers, { area: questions[currentQuestion].area, score: selected }];
        setAnswers(newAnswers);
        setSelected(null);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const resetTest = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResults(false);
        setSelected(null);
    };

    if (showResults) {
        const total = answers.reduce((sum, a) => sum + a.score, 0);
        const maxScore = questions.length * 3;
        const percentage = (total / maxScore) * 100;

        // Identify weak areas (score 0 or 1)
        const concerns = answers
            .filter(a => a.score <= 1)
            .map(a => areaNames[a.area]);

        // Identify moderate areas (score 2)
        const moderate = answers
            .filter(a => a.score === 2)
            .map(a => areaNames[a.area]);

        const severity = percentage >= 70 ? 'low' : percentage >= 45 ? 'moderate' : 'high';

        const summaryMap = {
            low: {
                icon: <CheckCircle2 className="w-10 h-10 text-green-600" />,
                bg: 'bg-green-50 border-green-200',
                badge: 'bg-green-100 text-green-800',
                label: 'Mostly on track',
                headline: 'Your child appears to be developing well in most areas.',
                body: concerns.length > 0
                    ? `There are a few areas worth keeping an eye on. Early support can prevent small gaps from becoming bigger ones.`
                    : `No significant concerns were flagged. If you still have worries, a full assessment will give you certainty.`,
            },
            moderate: {
                icon: <AlertTriangle className="w-10 h-10 text-amber-500" />,
                bg: 'bg-amber-50 border-amber-200',
                badge: 'bg-amber-100 text-amber-800',
                label: 'Some areas need attention',
                headline: 'Your answers suggest your child may be struggling in several cognitive areas.',
                body: `These kinds of gaps don't fix themselves with more tutoring — they need targeted brain training. A full cognitive assessment will tell you exactly what's going on.`,
            },
            high: {
                icon: <AlertCircle className="w-10 h-10 text-red-500" />,
                bg: 'bg-red-50 border-red-200',
                badge: 'bg-red-100 text-red-800',
                label: 'Significant challenges detected',
                headline: 'Your answers indicate your child is facing real cognitive challenges that need professional attention.',
                body: `The good news: these are trainable brain skills, not fixed limitations. The Cognigym program has helped hundreds of children in similar situations. The sooner you act, the better the outcome.`,
            },
        };

        const summary = summaryMap[severity];

        return (
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Brain className="w-8 h-8 text-brand-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Screening complete</h2>
                        <p className="text-gray-500 text-sm">Based on your answers about your child</p>
                    </div>

                    {/* Summary card */}
                    <div className={`rounded-2xl border p-6 mb-6 ${summary.bg}`}>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-0.5">{summary.icon}</div>
                            <div>
                                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${summary.badge}`}>
                                    {summary.label}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{summary.headline}</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">{summary.body}</p>
                            </div>
                        </div>
                    </div>

                    {/* Flagged areas */}
                    {concerns.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                Areas of concern
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {concerns.map(area => (
                                    <span key={area} className="bg-red-50 text-red-700 text-sm font-semibold px-3 py-1 rounded-full border border-red-200">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {moderate.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                Areas to monitor
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {moderate.map(area => (
                                    <span key={area} className="bg-amber-50 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full border border-amber-200">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* What next */}
                    <div className="bg-brand-600 rounded-2xl p-6 mb-4 text-white">
                        <h4 className="font-bold text-lg mb-2">What happens next?</h4>
                        <p className="text-brand-100 text-sm leading-relaxed mb-4">
                            A full cognitive assessment at Cogniskills takes about 60–90 minutes and gives you a precise map of your child's brain skills — not a guess, a profile. From there, we build a personalised Cognigym training plan.
                        </p>
                        <Link
                            href="/booking"
                            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors text-sm"
                        >
                            Book a full assessment
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Disclaimer + retake */}
                    <p className="text-xs text-gray-400 text-center mb-4">
                        This screening is based on parent observation and is not a clinical diagnosis. A full assessment by our specialists is required for an accurate cognitive profile.
                    </p>
                    <button
                        onClick={resetTest}
                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors"
                    >
                        Retake the screening
                    </button>
                </div>
            </section>
        );
    }

    const q = questions[currentQuestion];
    const progress = ((currentQuestion) / questions.length) * 100;

    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-semibold text-brand-600">
                            {Math.round(progress)}% complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                            className="bg-brand-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    {/* Area badge */}
                    <span className="inline-block bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                        {q.areaLabel}
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 mb-6 leading-snug">
                        {q.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                        {q.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(option.score)}
                                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-sm leading-snug
                                    ${selected === option.score
                                        ? 'border-brand-600 bg-brand-50 text-brand-800'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:bg-brand-50 hover:text-gray-900'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={handleNext}
                        disabled={selected === null}
                        className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 px-8 rounded-xl transition-all"
                    >
                        {currentQuestion < questions.length - 1 ? 'Next question' : 'See results'}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                    Answer based on what you observe at home and from school feedback.
                </p>
            </div>
        </section>
    );
}
