'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { LEVELS, type GamePhase, type PathResult } from './types';
import type { CellCoord } from './types';
import { generateLevel, scoreResult } from './pathEngine';
import PathGrid from './PathGrid';
import StudyTimer from './StudyTimer';
import ResultScreen from './ResultScreen';
import Countdown from './Countdown';
import { sounds, initAudio } from './sounds';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function HomeButton() {
    return (
        <Link href="/" className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 text-sm font-semibold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
        </Link>
    );
}

function LevelBadge({ level, label }: { level: number; label: string }) {
    return (
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-2xl px-3 py-1.5 shadow-sm">
            <span className="text-xs font-bold text-brand-600">Lv {level}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs font-medium text-gray-500">{label}</span>
        </div>
    );
}

const FADE_DURATION_MS = 1200;
// Horizontal padding on each side — used to calculate available grid width
const SIDE_PAD = 20;

export default function PathFinderGame() {
    const [levelIndex, setLevelIndex] = useState(0);
    const [phase, setPhase] = useState<GamePhase>('splash');
    const [countdownVal, setCountdownVal] = useState(3);
    const [studyElapsed, setStudyElapsed] = useState(0);
    const [fadeProgress, setFadeProgress] = useState(0);
    const [drawnPath, setDrawnPath] = useState<CellCoord[]>([]);
    const [result, setResult] = useState<PathResult | null>(null);
    const [recallStart, setRecallStart] = useState(0);
    const [generatedLevel, setGeneratedLevel] = useState(() => generateLevel(LEVELS[0]));
    // Available width for the grid — measured from viewport
    const [gridAreaWidth, setGridAreaWidth] = useState(320);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const rafRef = useRef<number | null>(null);
    const studyStartRef = useRef(0);
    const fadeStartRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const config = LEVELS[levelIndex];

    // Measure container width on mount and resize
    useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                setGridAreaWidth(containerRef.current.clientWidth - SIDE_PAD * 2);
            }
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    // ─── Timers ───────────────────────────────────────────────────────────────
    const clearTimers = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        timerRef.current = rafRef.current = null;
    }, []);

    useEffect(() => () => clearTimers(), [clearTimers]);

    // ─── Level setup ──────────────────────────────────────────────────────────
    const prepareLevel = useCallback((idx: number) => {
        setGeneratedLevel(generateLevel(LEVELS[idx]));
        setDrawnPath([]);
        setResult(null);
        setStudyElapsed(0);
        setFadeProgress(0);
    }, []);

    // ─── Phase transitions ────────────────────────────────────────────────────
    const startStudy = useCallback(() => {
        setPhase('study');
        studyStartRef.current = performance.now();
        const tick = () => {
            const elapsed = performance.now() - studyStartRef.current;
            setStudyElapsed(elapsed);
            if (elapsed < config.studyTimeMs) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                // Begin fade
                setPhase('fading');
                fadeStartRef.current = performance.now();
                const fadeTick = () => {
                    const fe = performance.now() - fadeStartRef.current;
                    const prog = Math.min(1, fe / FADE_DURATION_MS);
                    setFadeProgress(prog);
                    if (prog < 1) {
                        rafRef.current = requestAnimationFrame(fadeTick);
                    } else {
                        setPhase('recall');
                        setRecallStart(Date.now());
                    }
                };
                rafRef.current = requestAnimationFrame(fadeTick);
            }
        };
        rafRef.current = requestAnimationFrame(tick);
    }, [config.studyTimeMs]);

    const startCountdown = useCallback(() => {
        initAudio();
        prepareLevel(levelIndex);
        setCountdownVal(3);
        setPhase('countdown');
        let c = 3;
        sounds.countdown();
        timerRef.current = setInterval(() => {
            c -= 1;
            if (c > 0) {
                sounds.countdown();
                setCountdownVal(c);
            } else {
                setCountdownVal(0);
                sounds.countdownGo();
                clearInterval(timerRef.current!);
                timerRef.current = null;
                setTimeout(() => startStudy(), 700);
            }
        }, 1000);
    }, [levelIndex, prepareLevel, startStudy]);

    // ─── Recall ───────────────────────────────────────────────────────────────
    const handleCellInteract = useCallback((cell: CellCoord) => {
        if (phase !== 'recall') return;
        const key = `${cell.row},${cell.col}`;
        setDrawnPath(prev => {
            if (prev.some(p => `${p.row},${p.col}` === key)) return prev;
            const last = prev[prev.length - 1];
            if (last && `${last.row},${last.col}` === key) return prev;
            sounds.cellPlace();
            return [...prev, cell];
        });
    }, [phase]);

    const handleUndo = useCallback(() => setDrawnPath(p => p.slice(0, -1)), []);
    const handleClear = useCallback(() => setDrawnPath([]), []);

    const handleSubmit = useCallback(() => {
        if (phase !== 'recall') return;
        setPhase('validating');
        const timeSec = Math.round((Date.now() - recallStart) / 1000);
        const res = scoreResult(generatedLevel.path, drawnPath, timeSec);
        if (res.stars >= 4) sounds.success();
        else sounds.partial();
        setTimeout(() => { setResult(res); setPhase('result'); }, 400);
    }, [phase, recallStart, generatedLevel.path, drawnPath]);

    // ─── Navigation ───────────────────────────────────────────────────────────
    const handlePlayAgain = useCallback(() => { clearTimers(); startCountdown(); }, [clearTimers, startCountdown]);

    const handleNextLevel = useCallback(() => {
        const next = Math.min(levelIndex + 1, LEVELS.length - 1);
        clearTimers();
        setLevelIndex(next);
        // Use timeout so levelIndex state propagates before startCountdown reads it
        setTimeout(() => {
            prepareLevel(next);
            initAudio();
            setCountdownVal(3);
            setPhase('countdown');
            let c = 3;
            sounds.countdown();
            timerRef.current = setInterval(() => {
                c -= 1;
                if (c > 0) { sounds.countdown(); setCountdownVal(c); }
                else {
                    setCountdownVal(0);
                    sounds.countdownGo();
                    clearInterval(timerRef.current!);
                    timerRef.current = null;
                    setTimeout(() => startStudy(), 700);
                }
            }, 1000);
        }, 80);
    }, [levelIndex, clearTimers, prepareLevel, startStudy]);

    // ─── Grid available width — cap at 440 and leave room for card padding ────
    const gridWidth = Math.min(gridAreaWidth, 440);

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div
            ref={containerRef}
            className="h-svh bg-gradient-to-br from-brand-50 via-white to-violet-50 flex flex-col overflow-hidden"
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-brand-100 bg-white/80 backdrop-blur-sm shrink-0">
                <HomeButton />
                <p className="font-heading text-brand-600 text-sm font-semibold">Path Finder</p>
                {(phase === 'study' || phase === 'fading' || phase === 'recall' || phase === 'validating') ? (
                    <LevelBadge level={config.level} label={config.label} />
                ) : (
                    <div className="w-16" />
                )}
            </div>

            {/* Body — scrollable only on non-game screens */}
            <div className={`flex-1 min-h-0 flex flex-col items-center px-5
                ${(phase === 'study' || phase === 'fading' || phase === 'recall' || phase === 'validating')
                    ? 'justify-between py-3 overflow-hidden'
                    : 'justify-center py-4 overflow-y-auto'}`}
            >
                <AnimatePresence mode="wait">

                    {/* ── SPLASH ─────────────────────────────────────────── */}
                    {phase === 'splash' && (
                        <motion.div key="splash" className="text-center space-y-5 max-w-sm w-full"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 to-brand-600 flex items-center justify-center shadow-2xl shadow-brand-600/30">
                                <span className="text-5xl">⛳</span>
                            </div>
                            <div>
                                <h1 className="font-heading text-3xl text-gray-900">Path Finder</h1>
                                <p className="text-gray-500 mt-1 text-sm">Based on Cognigym Visual Spatial Golf</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['Visual Memory', 'Planning', 'Attention', 'Route Recall'].map(s => (
                                    <span key={s} className="bg-brand-50 text-brand-700 border border-brand-200 rounded-full px-3 py-1 text-xs font-semibold">{s}</span>
                                ))}
                            </div>
                            <motion.button whileTap={{ scale: 0.97 }} onClick={() => setPhase('instructions')}
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-600/25 transition-colors">
                                Let's Play
                            </motion.button>
                        </motion.div>
                    )}

                    {/* ── INSTRUCTIONS ───────────────────────────────────── */}
                    {phase === 'instructions' && (
                        <motion.div key="instructions" className="max-w-sm w-full space-y-4"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <h2 className="font-heading text-2xl text-gray-900 text-center">How to Play</h2>
                            <div className="space-y-2">
                                {[
                                    { icon: '👀', title: 'Study the path', desc: 'A coloured route appears. Memorise it.' },
                                    { icon: '🕐', title: 'It fades away', desc: 'After a few seconds, the route disappears.' },
                                    { icon: '✏️', title: 'Redraw it', desc: 'Tap cells to recreate the route from memory.' },
                                    { icon: '✅', title: 'Submit', desc: 'Tap Submit when done. Your accuracy is scored.' },
                                ].map(step => (
                                    <div key={step.title} className="flex gap-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
                                        <span className="text-xl shrink-0 mt-0.5">{step.icon}</span>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                                            <p className="text-gray-500 text-xs">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Start Level</p>
                                <div className="flex gap-2">
                                    {LEVELS.map((l, i) => (
                                        <button key={l.level} onClick={() => setLevelIndex(i)}
                                            className={`flex-1 py-2.5 rounded-xl text-sm font-bold ring-1 transition-all
                                                ${levelIndex === i ? 'bg-brand-600 text-white ring-brand-500 shadow-md shadow-brand-600/20' : 'bg-white text-gray-600 ring-gray-200'}`}>
                                            {l.level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <motion.button whileTap={{ scale: 0.97 }} onClick={startCountdown}
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-600/25 transition-colors">
                                Start Level {config.level}
                            </motion.button>
                        </motion.div>
                    )}

                    {/* ── COUNTDOWN ──────────────────────────────────────── */}
                    {phase === 'countdown' && (
                        <motion.div key="countdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Countdown count={countdownVal} />
                        </motion.div>
                    )}

                    {/* ── STUDY / FADING ─────────────────────────────────── */}
                    {(phase === 'study' || phase === 'fading') && (
                        <motion.div key="study"
                            className="flex flex-col items-center gap-3 w-full"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                            {/* Timer row */}
                            <div className="flex items-center justify-between w-full max-w-sm">
                                <p className="text-xs text-gray-500">
                                    🏌️ <strong className="text-gray-700">Start</strong> → trace → <strong className="text-gray-700">⛳ Hole</strong>
                                </p>
                                <StudyTimer totalMs={config.studyTimeMs} elapsedMs={studyElapsed} phase={phase as 'study' | 'fading'} />
                            </div>

                            {/* Grid card */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-3 shrink-0">
                                <PathGrid
                                    gridSize={config.gridSize}
                                    correctPath={generatedLevel.path}
                                    obstacles={generatedLevel.obstacles}
                                    falseRoutes={generatedLevel.falseRoutes}
                                    drawnPath={[]}
                                    phase={phase as 'study' | 'fading'}
                                    onCellInteract={() => { }}
                                    fadeProgress={fadeProgress}
                                    availableWidth={gridWidth - 24} // minus card padding
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* ── RECALL ─────────────────────────────────────────── */}
                    {(phase === 'recall' || phase === 'validating') && (
                        <motion.div key="recall"
                            className="flex flex-col items-center gap-3 w-full flex-1 min-h-0"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                            {/* Instruction pill */}
                            <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-2xl px-3 py-2 shrink-0">
                                <span>✏️</span>
                                <p className="text-sm font-semibold text-violet-700">Redraw the path from memory</p>
                            </div>

                            {/* Grid card */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-3 shrink-0">
                                <PathGrid
                                    gridSize={config.gridSize}
                                    correctPath={generatedLevel.path}
                                    obstacles={generatedLevel.obstacles}
                                    falseRoutes={[]}
                                    drawnPath={drawnPath}
                                    phase="recall"
                                    onCellInteract={handleCellInteract}
                                    fadeProgress={1}
                                    availableWidth={gridWidth - 24}
                                />
                            </div>

                            {/* Controls — 3 equal buttons */}
                            <div className="flex gap-2 w-full max-w-sm shrink-0">
                                <motion.button whileTap={{ scale: 0.95 }} onClick={handleUndo}
                                    disabled={drawnPath.length === 0}
                                    className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-2xl disabled:opacity-40 text-sm transition-all">
                                    ← Undo
                                </motion.button>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={handleClear}
                                    disabled={drawnPath.length === 0}
                                    className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-2xl disabled:opacity-40 text-sm transition-all">
                                    Clear
                                </motion.button>
                                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit}
                                    disabled={drawnPath.length === 0 || phase === 'validating'}
                                    className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold py-3 rounded-2xl shadow-lg shadow-brand-600/25 text-sm transition-all">
                                    {phase === 'validating' ? '…' : 'Submit'}
                                </motion.button>
                            </div>

                            <p className="text-xs text-gray-400 shrink-0">
                                {drawnPath.length} / {generatedLevel.path.length} cells
                            </p>
                        </motion.div>
                    )}

                    {/* ── RESULT ─────────────────────────────────────────── */}
                    {phase === 'result' && result && (
                        <motion.div key="result" className="relative w-full max-w-sm"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ResultScreen
                                result={result}
                                level={config.level}
                                maxLevel={LEVELS.length}
                                onPlayAgain={handlePlayAgain}
                                onNextLevel={handleNextLevel}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
