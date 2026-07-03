// ─── Web Audio sounds for Path Finder ────────────────────────────────────────
// Soft, minimal, premium. No arcade sounds.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
}

function tone(freq: number, gainVal: number, duration: number, type: OscillatorType = 'sine') {
    const c = getCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    gain.gain.setValueAtTime(gainVal, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + duration + 0.01);
}

export const sounds = {
    /** Soft pleasant click when placing a correct tile */
    cellPlace() {
        tone(880, 0.08, 0.08);
    },

    /** Gentle tap for incorrect tile */
    cellWrong() {
        tone(220, 0.06, 0.12);
    },

    /** Light chime for each countdown beat */
    countdown() {
        tone(660, 0.1, 0.12);
    },

    /** Higher chime for countdown "Go" */
    countdownGo() {
        tone(880, 0.12, 0.2);
        setTimeout(() => tone(1100, 0.1, 0.18), 80);
    },

    /** Path fully correct — warm celebration */
    success() {
        const c = getCtx();
        if (!c) return;
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => tone(freq, 0.1, 0.25), i * 90);
        });
    },

    /** Partial success */
    partial() {
        tone(523, 0.08, 0.15);
        setTimeout(() => tone(659, 0.07, 0.15), 100);
    },
};

export function initAudio() {
    getCtx();
}
