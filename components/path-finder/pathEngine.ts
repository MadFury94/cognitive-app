// ─── Path generation engine ───────────────────────────────────────────────────
// Generates a valid, non-self-intersecting path through the grid.

import type { CellCoord, LevelConfig } from './types';

type Grid = boolean[][]; // true = occupied

const DIRS: CellCoord[] = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
];

function inBounds(r: number, c: number, size: number) {
    return r >= 0 && c >= 0 && r < size && c < size;
}

function neighbors(pos: CellCoord, size: number): CellCoord[] {
    return DIRS.map(d => ({ row: pos.row + d.row, col: pos.col + d.col }))
        .filter(p => inBounds(p.row, p.col, size));
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function isTurn(prev: CellCoord, curr: CellCoord, next: CellCoord): boolean {
    const dr1 = curr.row - prev.row;
    const dc1 = curr.col - prev.col;
    const dr2 = next.row - curr.row;
    const dc2 = next.col - curr.col;
    return dr1 !== dr2 || dc1 !== dc2;
}

/**
 * Generates a path of exactly `targetLen` cells with at least `minTurns` turns.
 * Returns null if it fails (caller should retry).
 */
function generatePath(
    size: number,
    targetLen: number,
    minTurns: number,
    seed?: number
): CellCoord[] | null {
    void seed; // reserved for future deterministic mode
    const occupied: Grid = Array.from({ length: size }, () => Array(size).fill(false));

    // Random start on any edge
    const edges: CellCoord[] = [];
    for (let i = 0; i < size; i++) {
        edges.push({ row: 0, col: i });
        edges.push({ row: size - 1, col: i });
        edges.push({ row: i, col: 0 });
        edges.push({ row: i, col: size - 1 });
    }
    const start = shuffle(edges)[0];
    occupied[start.row][start.col] = true;
    const path: CellCoord[] = [start];

    function dfs(current: CellCoord, turns: number): boolean {
        if (path.length === targetLen) {
            return turns >= minTurns;
        }

        const candidates = shuffle(neighbors(current, size)).filter(
            n => !occupied[n.row][n.col]
        );

        for (const next of candidates) {
            const newTurns =
                path.length >= 2 ? turns + (isTurn(path[path.length - 2], current, next) ? 1 : 0) : turns;

            // Don't accumulate too many turns (keeps paths readable)
            if (newTurns > minTurns + 4) continue;

            occupied[next.row][next.col] = true;
            path.push(next);

            if (dfs(next, newTurns)) return true;

            path.pop();
            occupied[next.row][next.col] = false;
        }

        return false;
    }

    return dfs(start, 0) ? path : null;
}

/**
 * Generates obstacles that don't overlap the path and aren't adjacent to start/end.
 */
function generateObstacles(path: CellCoord[], size: number, count: number): CellCoord[] {
    const pathSet = new Set(path.map(p => `${p.row},${p.col}`));
    const forbidden = new Set([
        ...neighbors(path[0], size).map(p => `${p.row},${p.col}`),
        ...neighbors(path[path.length - 1], size).map(p => `${p.row},${p.col}`),
    ]);

    const candidates: CellCoord[] = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const key = `${r},${c}`;
            if (!pathSet.has(key) && !forbidden.has(key)) {
                candidates.push({ row: r, col: c });
            }
        }
    }

    return shuffle(candidates).slice(0, Math.min(count, candidates.length));
}

/**
 * Generates a false route — a plausible but wrong path.
 */
function generateFalseRoute(correctPath: CellCoord[], size: number, len: number): CellCoord[] {
    const pathSet = new Set(correctPath.map(p => `${p.row},${p.col}`));

    // Start near the correct start but branch off
    const start = { ...correctPath[0] };
    const occupied: Grid = Array.from({ length: size }, () => Array(size).fill(false));
    occupied[start.row][start.col] = true;

    const route: CellCoord[] = [start];

    for (let i = 0; i < len - 1; i++) {
        const current = route[route.length - 1];
        const candidates = shuffle(neighbors(current, size)).filter(n => {
            const key = `${n.row},${n.col}`;
            return !occupied[n.row][n.col] && !pathSet.has(key);
        });
        if (!candidates.length) break;
        const next = candidates[0];
        occupied[next.row][next.col] = true;
        route.push(next);
    }

    return route;
}

export interface GeneratedLevel {
    path: CellCoord[];
    obstacles: CellCoord[];
    falseRoutes: CellCoord[][];
    gridSize: number;
}

export function generateLevel(config: LevelConfig): GeneratedLevel {
    const { gridSize, pathLength, minTurns, hasObstacles, hasFalseRoutes, falseRouteCount } = config;

    let path: CellCoord[] | null = null;
    let attempts = 0;
    while (!path && attempts < 200) {
        path = generatePath(gridSize, pathLength, minTurns);
        attempts++;
    }
    if (!path) {
        // Fallback: straight horizontal path
        path = Array.from({ length: Math.min(pathLength, gridSize) }, (_, i) => ({ row: 0, col: i }));
    }

    const obstacleCount = hasObstacles ? Math.floor(gridSize * 1.5) : 0;
    const obstacles = obstacleCount > 0 ? generateObstacles(path, gridSize, obstacleCount) : [];

    const falseRoutes: CellCoord[][] = [];
    if (hasFalseRoutes) {
        for (let i = 0; i < falseRouteCount; i++) {
            falseRoutes.push(generateFalseRoute(path, gridSize, Math.floor(pathLength * 0.6)));
        }
    }

    return { path, obstacles, falseRoutes, gridSize };
}

export function scoreResult(
    correct: CellCoord[],
    drawn: CellCoord[],
    timeSec: number
): { memoryAccuracy: number; routeAccuracy: number; planningScore: number; completionTimeSec: number; stars: number } {
    const correctSet = new Set(correct.map(p => `${p.row},${p.col}`));
    const drawnSet = new Set(drawn.map(p => `${p.row},${p.col}`));

    // Memory accuracy: what % of correct cells did the player recall
    let recalled = 0;
    for (const key of drawnSet) {
        if (correctSet.has(key)) recalled++;
    }
    const memoryAccuracy = correct.length > 0 ? Math.round((recalled / correct.length) * 100) : 0;

    // Route accuracy: sequential match
    let sequential = 0;
    const minLen = Math.min(correct.length, drawn.length);
    for (let i = 0; i < minLen; i++) {
        if (correct[i].row === drawn[i].row && correct[i].col === drawn[i].col) sequential++;
    }
    const routeAccuracy = correct.length > 0 ? Math.round((sequential / correct.length) * 100) : 0;

    // Planning score: penalise backtracking
    let backtracks = 0;
    const visitedKeys = new Set<string>();
    for (const cell of drawn) {
        const key = `${cell.row},${cell.col}`;
        if (visitedKeys.has(key)) backtracks++;
        visitedKeys.add(key);
    }
    const planningScore = Math.max(0, Math.round(((recalled - backtracks) / Math.max(correct.length, 1)) * 100));

    const avg = (memoryAccuracy + routeAccuracy + planningScore) / 3;
    let stars = 1;
    if (avg >= 95) stars = 5;
    else if (avg >= 80) stars = 4;
    else if (avg >= 65) stars = 3;
    else if (avg >= 45) stars = 2;

    return { memoryAccuracy, routeAccuracy, planningScore, completionTimeSec: timeSec, stars };
}
