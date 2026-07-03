'use client';

import { motion } from 'framer-motion';

interface StudyTimerProps {
    totalMs: number;
    elapsedMs: number;
    phase: 'study' | 'fading';
}

export default function StudyTimer({ totalMs, elapsedMs, phase }: StudyTimerProps) {
    const remaining = Math.max(0, totalMs - elapsedMs);
    const secondsLeft = Math.ceil(remaining / 1000);
    const progress = Math.min(1, elapsedMs / totalMs);
    const circumference = 2 * Math.PI * 22; // r=22
    const dashOffset = circumference * (1 - progress);

    const colour = progress < 0.6
        ? '#10b981' // emerald
        : progress < 0.85
            ? '#f59e0b' // amber
            : '#ef4444'; // red

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="relative w-14 h-14">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                    <motion.circle
                        cx="28" cy="28" r="22"
                        fill="none"
                        stroke={colour}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        transition={{ duration: 0.1 }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-base font-bold text-gray-700">{secondsLeft}</span>
                </div>
            </div>
            <span className="text-xs text-gray-400 font-medium">
                {phase === 'study' ? 'Memorise' : 'Fading…'}
            </span>
        </div>
    );
}
