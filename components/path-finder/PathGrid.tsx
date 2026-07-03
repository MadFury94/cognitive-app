'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useRef } from 'react';
import type { CellCoord } from './types';

interface PathGridProps {
    gridSize: number;
    correctPath: CellCoord[];
    obstacles: CellCoord[];
    falseRoutes: CellCoord[][];
    drawnPath: CellCoord[];
    phase: 'study' | 'fading' | 'recall';
    onCellInteract: (cell: CellCoord) => void;
    fadeProgress: number;
    /** Available width in px — grid sizes itself to fit */
    availableWidth: number;
}

type CellRole =
    | 'correct-start'
    | 'correct-end'
    | 'correct-middle'
    | 'false-route'
    | 'obstacle'
    | 'drawn-correct'
    | 'drawn-wrong'
    | 'drawn-start'
    | 'empty';

function getCellRole(
    row: number, col: number,
    correctPath: CellCoord[], obstacles: CellCoord[],
    falseRoutes: CellCoord[][], drawnPath: CellCoord[],
    phase: PathGridProps['phase']
): CellRole {
    const key = `${row},${col}`;
    const correctSet = new Set(correctPath.map(p => `${p.row},${p.col}`));
    const drawnSet = new Set(drawnPath.map(p => `${p.row},${p.col}`));
    const isDrawn = drawnSet.has(key);
    const isCorrect = correctSet.has(key);

    if (phase === 'study' || phase === 'fading') {
        if (correctPath[0] && `${correctPath[0].row},${correctPath[0].col}` === key) return 'correct-start';
        const last = correctPath[correctPath.length - 1];
        if (last && `${last.row},${last.col}` === key) return 'correct-end';
        if (isCorrect) return 'correct-middle';
        if (falseRoutes.some(r => r.some(p => `${p.row},${p.col}` === key))) return 'false-route';
        if (obstacles.some(o => `${o.row},${o.col}` === key)) return 'obstacle';
        return 'empty';
    }

    if (isDrawn) {
        if (drawnPath[0] && `${drawnPath[0].row},${drawnPath[0].col}` === key) return 'drawn-start';
        return isCorrect ? 'drawn-correct' : 'drawn-wrong';
    }
    if (obstacles.some(o => `${o.row},${o.col}` === key)) return 'obstacle';
    return 'empty';
}

const CELL_STYLES: Record<CellRole, string> = {
    'correct-start': 'bg-emerald-400 border-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.6)]',
    'correct-end': 'bg-violet-500  border-violet-600  shadow-[0_0_12px_rgba(139,92,246,0.6)]',
    'correct-middle': 'bg-sky-400     border-sky-500     shadow-[0_0_8px_rgba(56,189,248,0.4)]',
    'false-route': 'bg-amber-300   border-amber-400',
    'obstacle': 'bg-gray-300    border-gray-400',
    'drawn-correct': 'bg-emerald-400 border-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]',
    'drawn-wrong': 'bg-rose-400    border-rose-500    shadow-[0_0_8px_rgba(251,113,133,0.5)]',
    'drawn-start': 'bg-emerald-500 border-emerald-600 shadow-[0_0_12px_rgba(52,211,153,0.7)]',
    'empty': 'bg-white/70    border-gray-200',
};

const CELL_ICONS: Partial<Record<CellRole, string>> = {
    'correct-start': '🏌️',
    'correct-end': '⛳',
    'obstacle': '🌳',
    'drawn-start': '🏌️',
};

export default function PathGrid({
    gridSize, correctPath, obstacles, falseRoutes,
    drawnPath, phase, onCellInteract, fadeProgress, availableWidth,
}: PathGridProps) {
    const GAP = 5;
    // Cell size = (available width − padding×2 − gap×(n−1)) / n, capped at 72
    const cellSize = Math.min(72, Math.floor((availableWidth - GAP * 2 - GAP * (gridSize - 1)) / gridSize));

    const studyOpacity = phase === 'fading' ? 1 - fadeProgress : 1;
    const gridRef = useRef<HTMLDivElement>(null);

    // ── Touch/pointer drag — fire onCellInteract for every cell the finger moves over ──
    const getCoordFromPointer = useCallback((e: React.PointerEvent): CellCoord | null => {
        const grid = gridRef.current;
        if (!grid) return null;
        const rect = grid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const col = Math.floor(x / (cellSize + GAP));
        const row = Math.floor(y / (cellSize + GAP));
        if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return null;
        // Verify we're within the cell bounds (not in the gap)
        const cellX = col * (cellSize + GAP);
        const cellY = row * (cellSize + GAP);
        if (x - cellX > cellSize || y - cellY > cellSize) return null;
        return { row, col };
    }, [cellSize, gridSize]);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (phase !== 'recall') return;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        const coord = getCoordFromPointer(e);
        if (coord) onCellInteract(coord);
    }, [phase, getCoordFromPointer, onCellInteract]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (phase !== 'recall' || e.buttons === 0) return;
        const coord = getCoordFromPointer(e);
        if (coord) onCellInteract(coord);
    }, [phase, getCoordFromPointer, onCellInteract]);

    const gridWidth = gridSize * cellSize + (gridSize - 1) * GAP;
    const gridHeight = gridWidth; // square grid

    return (
        <div
            ref={gridRef}
            className="relative select-none touch-none"
            style={{ width: gridWidth, height: gridHeight }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            {Array.from({ length: gridSize }, (_, row) =>
                Array.from({ length: gridSize }, (_, col) => {
                    const role = getCellRole(row, col, correctPath, obstacles, falseRoutes, drawnPath, phase);
                    const isStudyCell = (phase === 'study' || phase === 'fading') && role !== 'empty' && role !== 'obstacle';
                    const icon = CELL_ICONS[role];
                    const opacity = isStudyCell ? studyOpacity : 1;

                    return (
                        <motion.div
                            key={`${row}-${col}`}
                            className={`absolute rounded-xl border-2 flex items-center justify-center overflow-hidden
                                ${CELL_STYLES[role]}`}
                            style={{
                                width: cellSize,
                                height: cellSize,
                                left: col * (cellSize + GAP),
                                top: row * (cellSize + GAP),
                                opacity,
                            }}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity }}
                            transition={{ delay: (row * gridSize + col) * 0.012, duration: 0.18, type: 'spring', stiffness: 300 }}
                        >
                            {icon && (
                                <span
                                    className="leading-none select-none"
                                    style={{ fontSize: Math.max(14, cellSize * 0.42) }}
                                >
                                    {icon}
                                </span>
                            )}

                            {/* Tap-in pulse for drawn cells */}
                            <AnimatePresence>
                                {phase === 'recall' && (role === 'drawn-correct' || role === 'drawn-wrong' || role === 'drawn-start') && (
                                    <motion.div
                                        className="absolute inset-0 rounded-xl"
                                        initial={{ scale: 1.5, opacity: 0.5 }}
                                        animate={{ scale: 1, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        style={{
                                            background: role === 'drawn-wrong'
                                                ? 'rgba(251,113,133,0.5)'
                                                : 'rgba(52,211,153,0.5)',
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}
