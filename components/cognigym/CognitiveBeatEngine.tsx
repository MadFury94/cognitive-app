'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Direction = '←' | '↑' | '→' | '↓';
type GameState = 'idle' | 'countdown' | 'playing' | 'finished';
type Quality = 'perfect' | 'good' | 'early' | 'late' | 'wrong' | 'miss';
type SoundMode = 'drum' | 'clap' | 'robot' | 'piano' | 'soft';
type BeatMode = 'every-beat' | 'every-other-beat';

interface Target {
    id: number;
    arrow: Direction;
    appearTime: number;
    targetTime: number;
    answered: boolean;
}

interface Result {
    id: number;
    arrow: Direction;
    pressed?: Direction;
    quality: Quality;
    timingErrorMs?: number;
    points: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DIRECTIONS: Direction[] = ['←', '↑', '→', '↓'];

const KEY_MAP: Record<string, Direction> = {
    ArrowLeft: '←', ArrowUp: '↑', ArrowRight: '→', ArrowDown: '↓',
    a: '←', w: '↑', d: '→', s: '↓',
    A: '←', W: '↑', D: '→', S: '↓',
};

const LEVELS = [
    { level: 1, label: 'Warm Up', bpm: 45, perfectMs: 180, goodMs: 380 },
    { level: 2, label: 'Steady Focus', bpm: 55, perfectMs: 160, goodMs: 330 },
    { level: 3, label: 'Training Pace', bpm: 65, perfectMs: 140, goodMs: 290 },
    { level: 4, label: 'Sharp Focus', bpm: 80, perfectMs: 120, goodMs: 240 },
    { level: 5, label: 'Cognigym Pace', bpm: 100, perfectMs: 100, goodMs: 200 },
    { level: 6, label: 'Advanced', bpm: 120, perfectMs: 85, goodMs: 170 },
];

const TOTAL_TARGETS = 24;
const COUNTDOWN_BEATS = 4;
const POINTS: Record<Quality, number> = {
    perfect: 10, good: 6, early: 1, late: 1, wrong: 0, miss: 0,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomArrow(previous?: Direction | null) {
    let next = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    if (previous && DIRECTIONS.length > 1) {
        while (next === previous) next = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    }
    return next;
}

function getQuality(errorMs: number, perfectMs: number, goodMs: number): Quality {
    const abs = Math.abs(errorMs);
    if (abs <= perfectMs) return 'perfect';
    if (abs <= goodMs) return 'good';
    return errorMs < 0 ? 'early' : 'late';
}

function qualityLabel(q: Quality) {
    if (q === 'perfect') return '✦ PERFECT';
    if (q === 'good') return '● GOOD';
    if (q === 'early') return 'TOO EARLY';
    if (q === 'late') return 'TOO LATE';
    if (q === 'wrong') return 'WRONG KEY';
    return 'MISS';
}

function qualityStyle(q: Quality): { text: string; ring: string; bg: string } {
    if (q === 'perfect') return { text: 'text-emerald-700', ring: 'ring-emerald-400', bg: 'bg-emerald-50' };
    if (q === 'good') return { text: 'text-amber-700', ring: 'ring-amber-400', bg: 'bg-amber-50' };
    return { text: 'text-rose-700', ring: 'ring-rose-400', bg: 'bg-rose-50' };
}

// ─── Small shared UI ──────────────────────────────────────────────────────────

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

function StatBadge({ label, value, accent = false }: { label: string; value: string | number; accent?: boolean }) {
    return (
        <div className={`rounded-2xl px-4 py-2 text-center min-w-[72px] ${accent ? 'bg-brand-600 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
            <p className="text-xl font-bold leading-tight">{value}</p>
            <p className={`text-xs mt-0.5 ${accent ? 'text-brand-100' : 'text-gray-500'}`}>{label}</p>
        </div>
    );
}

function ControlBtn({ label, onPress }: { label: Direction; onPress: () => void }) {
    return (
        <button
            onPointerDown={onPress}
            className="aspect-square rounded-2xl bg-white border-2 border-gray-200 hover:border-brand-400 hover:bg-brand-50 active:bg-brand-600 active:border-brand-600 active:text-white text-gray-700 text-2xl sm:text-3xl font-bold transition-all select-none touch-none shadow-sm"
            aria-label={`Press ${label}`}
        >
            {label}
        </button>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BeatRunnerCognigym() {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [levelIndex, setLevelIndex] = useState(0);
    const [soundMode, setSoundMode] = useState<SoundMode>('drum');
    const [beatMode, setBeatMode] = useState<BeatMode>('every-other-beat');
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [targetsCompleted, setTargetsCompleted] = useState(0);
    const [countdown, setCountdown] = useState(COUNTDOWN_BEATS);
    const [activeTarget, setActiveTarget] = useState<Target | null>(null);
    const [feedback, setFeedback] = useState<Quality | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [progress, setProgress] = useState(0);
    const [hitFlash, setHitFlash] = useState<Quality | null>(null);
    const hitFlashTimerRef = useRef<number | null>(null);

    const audioRef = useRef<AudioContext | null>(null);
    const intervalRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);
    const targetRef = useRef<Target | null>(null);
    const resultsRef = useRef<Result[]>([]);
    const scoreRef = useRef(0);
    const comboRef = useRef(0);
    const completedRef = useRef(0);
    const beatCountRef = useRef(0);
    const nextTargetIdRef = useRef(1);
    const lastArrowRef = useRef<Direction | null>(null);
    const feedbackTimerRef = useRef<number | null>(null);

    const currentLevel = LEVELS[levelIndex];
    const beatIntervalMs = useMemo(() => 60000 / currentLevel.bpm, [currentLevel.bpm]);
    const targetEveryBeats = beatMode === 'every-beat' ? 1 : 2;

    const ensureAudio = useCallback(() => {
        if (typeof window === 'undefined') return null;
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioRef.current) audioRef.current = new AudioCtx();
        if (audioRef.current.state === 'suspended') audioRef.current.resume();
        return audioRef.current;
    }, []);

    const playBeat = useCallback((accent = false) => {
        const ctx = ensureAudio();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freqs: Record<SoundMode, number> = {
            drum: accent ? 180 : 120, clap: accent ? 900 : 700,
            robot: accent ? 420 : 320, piano: accent ? 660 : 520, soft: accent ? 520 : 420,
        };
        osc.type = soundMode === 'robot' ? 'square' : soundMode === 'soft' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freqs[soundMode], now);
        gain.gain.setValueAtTime(accent ? 0.13 : 0.075, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (soundMode === 'piano' ? 0.12 : 0.06));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
    }, [ensureAudio, soundMode]);

    const stopTimers = useCallback(() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
        if (hitFlashTimerRef.current) window.clearTimeout(hitFlashTimerRef.current);
        intervalRef.current = rafRef.current = feedbackTimerRef.current = hitFlashTimerRef.current = null;
    }, []);

    // Plays a soft feedback sound — separate from the metronome beat sound
    const playFeedbackSound = useCallback((quality: Quality) => {
        const ctx = ensureAudio();
        if (!ctx) return;
        if (quality === 'miss' || quality === 'wrong') return; // no punishment sound

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (quality === 'perfect') {
            // Soft two-tone "ding"
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.setValueAtTime(1100, now + 0.04);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.start(now);
            osc.stop(now + 0.23);
        } else {
            // good / early / late — softer single tone
            osc.type = 'sine';
            osc.frequency.setValueAtTime(660, now);
            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            osc.start(now);
            osc.stop(now + 0.15);
        }
    }, [ensureAudio]);

    const showFeedback = useCallback((quality: Quality) => {
        setFeedback(quality);
        if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
        feedbackTimerRef.current = window.setTimeout(() => setFeedback(null), 420);

        // Hit circle flash: 150ms perfect (green), 200ms good (blue), 120ms miss (red)
        setHitFlash(quality);
        if (hitFlashTimerRef.current) window.clearTimeout(hitFlashTimerRef.current);
        hitFlashTimerRef.current = window.setTimeout(
            () => setHitFlash(null),
            quality === 'perfect' ? 150 : quality === 'good' ? 200 : 120
        );

        playFeedbackSound(quality);
    }, [playFeedbackSound]);

    const recordResult = useCallback((result: Result) => {
        resultsRef.current = [...resultsRef.current, result];
        completedRef.current += 1;
        scoreRef.current += result.points;
        const keeps = result.quality === 'perfect' || result.quality === 'good';
        comboRef.current = keeps ? comboRef.current + 1 : 0;
        setResults(resultsRef.current);
        setTargetsCompleted(completedRef.current);
        setScore(scoreRef.current);
        setCombo(comboRef.current);
        setMaxCombo(v => Math.max(v, comboRef.current));
        showFeedback(result.quality);
        if (completedRef.current >= TOTAL_TARGETS) {
            setGameState('finished');
            setActiveTarget(null);
            targetRef.current = null;
            stopTimers();
        }
    }, [showFeedback, stopTimers]);

    const createTarget = useCallback((now: number) => {
        const arrow = randomArrow(lastArrowRef.current);
        lastArrowRef.current = arrow;
        const target: Target = {
            id: nextTargetIdRef.current++,
            arrow, appearTime: now,
            targetTime: now + beatIntervalMs, answered: false,
        };
        targetRef.current = target;
        setActiveTarget(target);
        setProgress(0);
    }, [beatIntervalMs]);

    const tick = useCallback(() => {
        const now = performance.now();
        beatCountRef.current += 1;
        const isHitBeat = Boolean(targetRef.current && now >= targetRef.current.targetTime - 35);
        playBeat(isHitBeat || beatCountRef.current === 1);

        if (gameState === 'countdown') {
            setCountdown(v => {
                const next = v - 1;
                if (next <= 0) {
                    setGameState('playing');
                    beatCountRef.current = 0;
                    createTarget(performance.now());
                    return 0;
                }
                return next;
            });
            return;
        }

        const current = targetRef.current;
        if (current && !current.answered && now > current.targetTime + currentLevel.goodMs) {
            current.answered = true;
            recordResult({ id: current.id, arrow: current.arrow, quality: 'miss', points: POINTS.miss });
            targetRef.current = null;
            setActiveTarget(null);
        }

        if (gameState === 'playing' && completedRef.current < TOTAL_TARGETS) {
            if (!targetRef.current && beatCountRef.current % targetEveryBeats === 0) createTarget(now);
        }
    }, [createTarget, currentLevel.goodMs, gameState, playBeat, recordResult, targetEveryBeats]);

    const animate = useCallback(() => {
        const current = targetRef.current;
        if (current) {
            const now = performance.now();
            const total = current.targetTime - current.appearTime;
            setProgress(Math.min(1, Math.max(0, (now - current.appearTime) / total)));
        } else {
            setProgress(0);
        }
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    const startGame = useCallback(() => {
        stopTimers();
        ensureAudio();
        scoreRef.current = comboRef.current = completedRef.current = beatCountRef.current = 0;
        nextTargetIdRef.current = 1;
        lastArrowRef.current = targetRef.current = null;
        resultsRef.current = [];
        setScore(0); setCombo(0); setMaxCombo(0); setTargetsCompleted(0);
        setCountdown(COUNTDOWN_BEATS); setActiveTarget(null); setFeedback(null);
        setResults([]); setProgress(0); setGameState('countdown');
        intervalRef.current = window.setInterval(tick, beatIntervalMs);
        rafRef.current = requestAnimationFrame(animate);
    }, [animate, beatIntervalMs, ensureAudio, stopTimers, tick]);

    const handleInput = useCallback((pressed: Direction) => {
        if (gameState !== 'playing') return;
        const current = targetRef.current;
        if (!current || current.answered) return;
        const now = performance.now();
        const timingErrorMs = Math.round(now - current.targetTime);
        const correct = pressed === current.arrow;
        const quality = correct ? getQuality(timingErrorMs, currentLevel.perfectMs, currentLevel.goodMs) : 'wrong';
        current.answered = true;
        targetRef.current = null;
        setActiveTarget(null);
        recordResult({ id: current.id, arrow: current.arrow, pressed, quality, timingErrorMs, points: POINTS[quality] });
    }, [currentLevel.goodMs, currentLevel.perfectMs, gameState, recordResult]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const dir = KEY_MAP[e.key];
            if (!dir) return;
            e.preventDefault();
            handleInput(dir);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleInput]);

    useEffect(() => {
        if (gameState !== 'countdown' && gameState !== 'playing') return;
        stopTimers();
        intervalRef.current = window.setInterval(tick, beatIntervalMs);
        rafRef.current = requestAnimationFrame(animate);
        return stopTimers;
    }, [animate, beatIntervalMs, gameState, stopTimers, tick]);

    useEffect(() => stopTimers, [stopTimers]);

    // ─── Derived stats ────────────────────────────────────────────────────────
    const directionAcc = results.length
        ? Math.round((results.filter(r => r.pressed && r.pressed === r.arrow).length / results.length) * 100) : 0;
    const rhythmAcc = results.length
        ? Math.round((results.filter(r => r.quality === 'perfect' || r.quality === 'good').length / results.length) * 100) : 0;
    const avgTiming = useMemo(() => {
        const timed = results.filter(r => typeof r.timingErrorMs === 'number' && (r.quality === 'perfect' || r.quality === 'good'));
        if (!timed.length) return 0;
        return Math.round(timed.reduce((s, r) => s + Math.abs(r.timingErrorMs ?? 0), 0) / timed.length);
    }, [results]);
    const canAdvance = directionAcc >= 85 && rhythmAcc >= 75 && avgTiming <= currentLevel.goodMs && results.length >= TOTAL_TARGETS;
    const targetTop = `${8 + progress * 72}%`;

    // ─── FINISHED ─────────────────────────────────────────────────────────────
    if (gameState === 'finished') {
        return (
            <div className="h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50 flex flex-col overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-brand-100 bg-white/80 backdrop-blur-sm">
                    <HomeButton />
                    <p className="font-heading text-brand-600 font-semibold text-sm">Beat Runner — Cognigym</p>
                    <div className="w-12" />
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 py-4 gap-4">
                    <div className="text-5xl">🏆</div>
                    <h1 className="font-heading text-3xl sm:text-4xl text-gray-900 text-center">Training Complete!</h1>
                    <p className="text-sm text-gray-500 text-center max-w-xs">Rhythm control · Direction accuracy · Processing speed · Sustained attention</p>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
                        {[
                            { label: 'Score', value: score },
                            { label: 'Direction', value: `${directionAcc}%` },
                            { label: 'Rhythm', value: `${rhythmAcc}%` },
                            { label: 'Avg Timing', value: `${avgTiming}ms` },
                        ].map(s => (
                            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 text-center">
                                <p className="text-lg sm:text-xl font-bold text-brand-600">{s.value}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Beat map */}
                    <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Beat Map</p>
                        <div className="flex flex-wrap gap-1.5">
                            {results.map(r => {
                                const s = qualityStyle(r.quality);
                                return (
                                    <span key={r.id} className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ring-1 ${s.text} ${s.ring} ${s.bg}`}>
                                        {r.arrow}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 w-full max-w-sm">
                        <button onClick={startGame} className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-brand-600/25">
                            Play Again
                        </button>
                        <button
                            onClick={() => setLevelIndex(v => Math.min(v + 1, LEVELS.length - 1))}
                            disabled={!canAdvance || levelIndex >= LEVELS.length - 1}
                            className="flex-1 border-2 border-brand-600 text-brand-600 hover:bg-brand-50 disabled:opacity-40 font-bold py-3 rounded-2xl transition-all"
                        >
                            Next Level →
                        </button>
                    </div>
                    {!canAdvance && <p className="text-xs text-gray-400 text-center max-w-xs">Need 85% direction + 75% rhythm to advance.</p>}
                </div>
            </div>
        );
    }

    // ─── IDLE / SETTINGS ──────────────────────────────────────────────────────
    if (gameState === 'idle') {
        return (
            <div className="h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50 flex flex-col overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-brand-100 bg-white/80 backdrop-blur-sm shrink-0">
                    <HomeButton />
                    <p className="font-heading text-brand-600 font-semibold text-sm">Beat Runner — Cognigym</p>
                    <div className="w-12" />
                </div>

                {/* Scrollable settings */}
                <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 py-4 gap-4">
                    <div className="text-center">
                        <div className="text-4xl mb-1">🥁</div>
                        <h1 className="font-heading text-3xl sm:text-4xl text-gray-900">Beat Runner</h1>
                        <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">Watch the arrow fall. Hit the correct key exactly on the beat line.</p>
                    </div>

                    <div className="w-full max-w-sm space-y-3">
                        {/* Level */}
                        <Card title="Speed Level">
                            <div className="grid grid-cols-6 gap-1.5">
                                {LEVELS.map((l, i) => (
                                    <button
                                        key={l.level}
                                        onClick={() => setLevelIndex(i)}
                                        className={`rounded-xl py-2 text-center transition-all font-bold text-sm ring-1
                                            ${levelIndex === i
                                                ? 'bg-brand-600 text-white ring-brand-500 shadow-md shadow-brand-600/20'
                                                : 'bg-white text-gray-700 ring-gray-200 hover:ring-brand-300 hover:text-brand-600'}`}
                                    >
                                        <span className="block font-bold">{l.level}</span>
                                        <span className="block text-[10px] opacity-70">{l.bpm}</span>
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Start at Level 1. Level 6 = 120 BPM challenge pace.</p>
                        </Card>

                        {/* Beat mode */}
                        <Card title="Training Mode">
                            <div className="grid grid-cols-2 gap-2">
                                {(['every-other-beat', 'every-beat'] as BeatMode[]).map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setBeatMode(m)}
                                        className={`rounded-xl py-3 text-sm font-bold ring-1 transition-all
                                            ${beatMode === m
                                                ? 'bg-brand-600 text-white ring-brand-500'
                                                : 'bg-white text-gray-700 ring-gray-200 hover:ring-brand-300'}`}
                                    >
                                        {m === 'every-other-beat' ? 'Every Other Beat' : 'Every Beat'}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Every other beat is for beginners. Every beat is advanced.</p>
                        </Card>

                        {/* Sound */}
                        <Card title="Beat Sound">
                            <div className="grid grid-cols-5 gap-1.5">
                                {(['drum', 'clap', 'robot', 'piano', 'soft'] as SoundMode[]).map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setSoundMode(m)}
                                        className={`rounded-xl py-2 text-xs font-bold ring-1 transition-all capitalize
                                            ${soundMode === m
                                                ? 'bg-brand-600 text-white ring-brand-500'
                                                : 'bg-white text-gray-700 ring-gray-200 hover:ring-brand-300'}`}
                                    >
                                        {m === 'drum' ? '🥁' : m === 'clap' ? '👏' : m === 'robot' ? '🤖' : m === 'piano' ? '🎹' : '🎵'}
                                        <span className="block mt-0.5">{m}</span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Controls */}
                        <div className="bg-brand-50 rounded-2xl border border-brand-100 p-3 text-center">
                            <p className="text-xs text-gray-500">Arrow keys / WASD on desktop · Tap the pad on mobile</p>
                            <div className="text-2xl mt-1 tracking-widest text-brand-600">← ↑ ↓ →</div>
                        </div>

                        <button
                            onClick={startGame}
                            className="w-full bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-bold py-4 rounded-2xl text-base transition-all shadow-lg shadow-brand-600/25"
                        >
                            Start 4-Beat Countdown
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── PLAYING / COUNTDOWN ──────────────────────────────────────────────────
    return (
        <div className="h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50 flex flex-col overflow-hidden select-none">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-brand-100 bg-white/80 backdrop-blur-sm shrink-0">
                <HomeButton />
                <div className="flex items-center gap-2">
                    <StatBadge label="Score" value={score} accent />
                    <div className="text-center px-1">
                        <p className="text-xs text-gray-400">{currentLevel.label}</p>
                        <p className="text-sm font-bold text-gray-700">{currentLevel.bpm} BPM</p>
                    </div>
                    <StatBadge label="Combo" value={combo > 0 ? `${combo}x` : '—'} />
                </div>
            </div>

            {/* Progress bar */}
            <div className="shrink-0 px-4 pt-2">
                <div className="h-1.5 rounded-full bg-brand-100 overflow-hidden">
                    <div
                        className="h-full bg-brand-600 transition-all duration-300"
                        style={{ width: `${(targetsCompleted / TOTAL_TARGETS) * 100}%` }}
                    />
                </div>
                <p className="text-center text-xs text-gray-400 mt-1">{targetsCompleted} / {TOTAL_TARGETS}</p>
            </div>

            {/* Countdown */}
            {gameState === 'countdown' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Feel the beat first</p>
                    <div className="w-32 h-32 rounded-full bg-brand-600 flex items-center justify-center shadow-2xl shadow-brand-600/30 animate-pulse">
                        <span className="font-heading text-7xl text-white">{countdown}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">Do not rush — wait for the arrow</p>
                </div>
            ) : (
                /* Playing */
                <div className="flex-1 flex flex-col items-center justify-between px-4 py-2 min-h-0">

                    {/* Feedback pill */}
                    <div className="h-8 flex items-center justify-center shrink-0">
                        {feedback && (() => {
                            const s = qualityStyle(feedback);
                            const pts = POINTS[feedback];
                            return (
                                <span className={`px-4 py-1 rounded-full text-sm font-bold ring-1 transition-opacity ${s.text} ${s.ring} ${s.bg}`}>
                                    {qualityLabel(feedback)}{pts > 0 ? ` +${pts}` : ''}
                                </span>
                            );
                        })()}
                    </div>

                    {/* Arrow lane */}
                    <div className="relative w-full max-w-[220px] flex-1 min-h-0 rounded-3xl bg-white border-2 border-brand-100 shadow-lg overflow-hidden mx-auto my-1">
                        {/* Hit line */}
                        <div className="absolute inset-x-0 top-[80%] h-0.5 bg-brand-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                        {/* Hit circle — flashes green/blue/red on result */}
                        <div className={`absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 transition-all duration-75
                            ${hitFlash === 'perfect'
                                ? 'border-emerald-400 bg-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.7)] scale-110'
                                : hitFlash === 'good' || hitFlash === 'early' || hitFlash === 'late'
                                    ? 'border-blue-400 bg-blue-50 shadow-[0_0_14px_rgba(96,165,250,0.5)] scale-105'
                                    : hitFlash === 'miss' || hitFlash === 'wrong'
                                        ? 'border-rose-400 bg-rose-50'
                                        : 'border-brand-400 bg-brand-50/60'}`}
                        />

                        {/* Hint text */}
                        <p className="absolute bottom-3 inset-x-0 text-center text-[10px] text-brand-300 font-medium">hit on the line</p>

                        {/* Falling arrow */}
                        {activeTarget && (
                            <div
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-600 shadow-lg shadow-brand-600/30 flex items-center justify-center transition-[top] duration-75"
                                style={{ top: targetTop }}
                            >
                                <span className="text-3xl sm:text-4xl text-white font-bold leading-none">{activeTarget.arrow}</span>
                            </div>
                        )}

                        {!activeTarget && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xs text-gray-300 text-center px-4">Wait for the next arrow</p>
                            </div>
                        )}
                    </div>

                    {/* Combo streak */}
                    <div className="h-6 flex items-center justify-center shrink-0">
                        {combo > 0 && combo % 5 === 0 && (
                            <p className="text-brand-600 font-bold text-sm animate-pulse">
                                {combo >= 20 ? '🔥 FOCUS MASTER' : combo >= 10 ? '⚡ ON FIRE' : '🎯 NICE STREAK'} {combo}x
                            </p>
                        )}
                    </div>

                    {/* D-pad */}
                    <div className="w-full max-w-[200px] mx-auto shrink-0 pb-2">
                        <div className="grid grid-cols-3 gap-2">
                            <div />
                            <ControlBtn label="↑" onPress={() => handleInput('↑')} />
                            <div />
                            <ControlBtn label="←" onPress={() => handleInput('←')} />
                            <ControlBtn label="↓" onPress={() => handleInput('↓')} />
                            <ControlBtn label="→" onPress={() => handleInput('→')} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Panel card ───────────────────────────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{title}</p>
            {children}
        </div>
    );
}
