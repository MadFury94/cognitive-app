'use client';

import { motion } from 'framer-motion';
import type { PathResult } from './types';
import { PASS_STARS } from './types';

interface ResultScreenProps {
    result: PathResult;
    level: number;
    maxLevel: number;
    onPlayAgain: () => void;
    onNextLevel: () => void;
    /** Called when the player should drop back one level (stars too low). */
    onPrevLevel: () => void;
}

function StatBar({ label, value, colour }: { label: string; value: number; colour: string }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <span className="text-sm font-bold text-gray-900">{value}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: colour }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                />
            </div>
        </div>
    );
}

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-1 justify-center">
            {Array.from({ length: 5 }, (_, i) => (
                <motion.span
                    key={i}
                    className={`text-3xl ${i < count ? 'text-amber-400' : 'text-gray-200'}`}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300 }}
                >
                    ★
                </motion.span>
            ))}
        </div>
    );
}

function confettiColours() {
    return ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6'];
}

export default function ResultScreen({ result, level, maxLevel, onPlayAgain, onNextLevel, onPrevLevel }: ResultScreenProps) {
    const isExcellent = result.stars >= 4;
    const headline = result.stars === 5 ? 'Perfect!' : result.stars >= 4 ? 'Excellent!' : result.stars >= 3 ? 'Good work!' : 'Keep going!';

    // Determine progression outcome
    const canAdvance = result.stars > PASS_STARS && level < maxLevel;
    const mustRepeat = result.stars === PASS_STARS;
    const dropBack = result.stars < PASS_STARS;

    // Label + hint for the primary action button
    const primaryLabel = canAdvance
        ? 'Next Level →'
        : mustRepeat
            ? 'Try Again ↺'
            : 'Back a Level ↩';

    const progressionHint = canAdvance
        ? null
        : mustRepeat
            ? 'Reach 4+ stars to advance to the next level.'
            : `Score too low — going back to level ${Math.max(1, level - 1)} to practise.`;

    const handlePrimary = canAdvance ? onNextLevel : mustRepeat ? onPlayAgain : onPrevLevel;

    return (
        <motion.div
            className="w-full max-w-sm mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Confetti burst (lightweight SVG dots) */}
            {isExcellent && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                    {confettiColours().flatMap((colour, ci) =>
                        Array.from({ length: 8 }, (_, i) => (
                            <motion.div
                                key={`${ci}-${i}`}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    background: colour,
                                    left: `${10 + i * 10}%`,
                                    top: '10%',
                                }}
                                initial={{ y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                    y: 120 + Math.random() * 80,
                                    x: (Math.random() - 0.5) * 60,
                                    opacity: 0,
                                    scale: 0.5,
                                }}
                                transition={{ delay: ci * 0.06 + i * 0.03, duration: 1.2 }}
                            />
                        ))
                    )}
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-5">
                {/* Header */}
                <div className="text-center space-y-2">
                    <motion.div
                        className="text-5xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
                    >
                        {result.stars === 5 ? '🏆' : result.stars >= 4 ? '🎯' : result.stars >= 3 ? '✅' : '💪'}
                    </motion.div>
                    <h2 className="font-heading text-2xl text-gray-900">{headline}</h2>
                    <Stars count={result.stars} />
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <StatBar label="Memory Accuracy" value={result.memoryAccuracy} colour="#10b981" />
                    <StatBar label="Route Accuracy" value={result.routeAccuracy} colour="#6366f1" />
                    <StatBar label="Planning Score" value={result.planningScore} colour="#f59e0b" />
                </div>

                {/* Time */}
                <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
                    <span className="text-sm text-gray-500 font-medium">Completion Time</span>
                    <span className="text-sm font-bold text-gray-900">{result.completionTimeSec}s</span>
                </div>

                {/* Progression hint */}
                {progressionHint && (
                    <p className="text-xs text-center text-amber-600 font-medium bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2">
                        {progressionHint}
                    </p>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                    {/* Secondary: always "Play Again" (repeat current level) */}
                    {canAdvance && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onPlayAgain}
                            className="flex-1 border-2 border-brand-600 text-brand-600 font-bold py-3 rounded-2xl transition-colors hover:bg-brand-50"
                        >
                            Play Again
                        </motion.button>
                    )}
                    {/* Primary: context-aware */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handlePrimary}
                        className={`flex-1 font-bold py-3 rounded-2xl transition-colors shadow-lg text-white
                            ${dropBack
                                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25'
                                : 'bg-brand-600 hover:bg-brand-700 shadow-brand-600/25'
                            }`}
                    >
                        {primaryLabel}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
