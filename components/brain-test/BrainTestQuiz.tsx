'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { Brain } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import 3D component with clear HD brain display
const ClearBrainViewer = dynamic(
    () => import('@/components/three/ClearBrainViewer'),
    { ssr: false }
);

export default function BrainTestQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            question: 'Can you read this sentence without difficulty?',
            description: 'Tests basic reading comprehension',
            brainRegion: 'Occipital & Temporal Lobes',
            cognitiveFunction: 'Reading & Language Processing',
            options: ['Yes, easily', 'With some effort', 'With difficulty', 'Cannot read it'],
            scores: [3, 2, 1, 0],
        },
        {
            question: 'How long can you focus on homework without getting distracted?',
            description: 'Tests attention span',
            brainRegion: 'Prefrontal Cortex',
            cognitiveFunction: 'Attention & Focus',
            options: ['More than 30 minutes', '15-30 minutes', '5-15 minutes', 'Less than 5 minutes'],
            scores: [3, 2, 1, 0],
        },
        {
            question: 'Can you remember a list of 5 items after hearing them once?',
            description: 'Tests working memory',
            brainRegion: 'Hippocampus & Temporal Lobe',
            cognitiveFunction: 'Working Memory',
            options: ['Yes, all 5', '3-4 items', '1-2 items', 'None'],
            scores: [3, 2, 1, 0],
        },
        {
            question: 'How quickly can you solve simple math problems (like 7 + 8)?',
            description: 'Tests processing speed',
            brainRegion: 'Parietal Lobe',
            cognitiveFunction: 'Processing Speed',
            options: ['Instantly', 'Within 5 seconds', 'Need more time', 'Very difficult'],
            scores: [3, 2, 1, 0],
        },
        {
            question: 'Can you follow multi-step instructions (like "get your bag, put on shoes, and wait by the door")?',
            description: 'Tests executive function',
            brainRegion: 'Frontal Lobe',
            cognitiveFunction: 'Executive Function',
            options: ['Yes, easily', 'Usually', 'Sometimes forget steps', 'Very difficult'],
            scores: [3, 2, 1, 0],
        },
    ];

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateResults = () => {
        const total = answers.reduce((sum, score) => sum + score, 0);
        const maxScore = questions.length * 3;
        const percentage = (total / maxScore) * 100;

        if (percentage >= 80) {
            return {
                level: 'Excellent',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                message: 'Cognitive skills appear to be developing well! Continue supporting learning with regular practice.',
                recommendation: 'Consider our advanced enrichment programs to further enhance skills.',
            };
        } else if (percentage >= 60) {
            return {
                level: 'Good',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                message: 'Cognitive skills are developing, but there may be areas for improvement.',
                recommendation: 'A comprehensive assessment could identify specific areas to strengthen.',
            };
        } else if (percentage >= 40) {
            return {
                level: 'Needs Attention',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                message: 'Some cognitive challenges detected. Early intervention can make a significant difference.',
                recommendation: 'We strongly recommend booking a full cognitive assessment.',
            };
        } else {
            return {
                level: 'Requires Support',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                message: 'Significant cognitive challenges detected. Professional assessment is highly recommended.',
                recommendation: 'Please book an assessment as soon as possible. Early intervention is crucial.',
            };
        }
    };

    const resetTest = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResults(false);
    };

    if (showResults) {
        const results = calculateResults();
        const total = answers.reduce((sum, score) => sum + score, 0);
        const maxScore = questions.length * 3;

        return (
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl p-8 lg:p-12">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Brain className="w-10 h-10 text-orange-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                Test Complete!
                            </h2>
                            <p className="text-gray-600">
                                Here are your results
                            </p>
                        </div>

                        <div className={`${results.bgColor} rounded-2xl p-8 mb-8`}>
                            <div className="text-center mb-6">
                                <p className="text-sm font-semibold text-gray-600 mb-2">
                                    Score: {total} / {maxScore}
                                </p>
                                <h3 className={`text-4xl font-bold ${results.color} mb-4`}>
                                    {results.level}
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {results.message}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6">
                                <p className="font-semibold text-gray-900 mb-2">
                                    Our Recommendation:
                                </p>
                                <p className="text-gray-700">
                                    {results.recommendation}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href="/booking"
                                className="block w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-8 rounded-lg text-center text-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                Book Full Assessment
                            </Link>
                            <button
                                onClick={resetTest}
                                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-lg text-center transition-all"
                            >
                                Retake Test
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 text-center mt-6">
                            Note: This is a basic screening tool and not a diagnostic assessment. For accurate evaluation, please book a comprehensive assessment with our specialists.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: 3D Brain Visualization */}
                    <div className="hidden lg:block">
                        <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Suspense fallback={
                                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                                    <Brain className="w-20 h-20 text-orange-600 animate-pulse" />
                                </div>
                            }>
                                <ClearBrainViewer
                                    progress={((currentQuestion + 1) / questions.length) * 100}
                                    currentQuestion={currentQuestion}
                                />
                            </Suspense>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
                        </p>
                    </div>

                    {/* Right: Quiz */}
                    <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl p-8 lg:p-12">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-600">
                                    Question {currentQuestion + 1} of {questions.length}
                                </span>
                                <span className="text-sm font-semibold text-orange-600">
                                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-8">
                            <div className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                🧠 {questions[currentQuestion].cognitiveFunction}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {questions[currentQuestion].question}
                            </h3>
                            <p className="text-gray-600 text-sm mb-1">
                                {questions[currentQuestion].description}
                            </p>
                            <p className="text-blue-600 text-xs font-semibold">
                                Brain Region: {questions[currentQuestion].brainRegion}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(questions[currentQuestion].scores[index])}
                                    className="w-full text-left px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all font-semibold text-gray-700 hover:text-orange-700"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
