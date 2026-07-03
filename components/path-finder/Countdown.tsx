'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
    count: number; // 3, 2, 1, or 0 (= "Go!")
}

export default function Countdown({ count }: CountdownProps) {
    const label = count === 0 ? 'Go!' : String(count);
    const isGo = count === 0;

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                Get ready to memorise
            </p>

            <AnimatePresence mode="wait">
                <motion.div
                    key={label}
                    className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl
                        ${isGo
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-400/40'
                            : 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-brand-600/40'}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                    <span className="font-heading text-5xl text-white">{label}</span>
                </motion.div>
            </AnimatePresence>

            <p className="text-sm text-gray-400 text-center max-w-[200px]">
                {isGo ? 'Study the path carefully!' : 'The path will appear…'}
            </p>
        </div>
    );
}
