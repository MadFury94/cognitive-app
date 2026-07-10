// ─── Core types for the Path Finder game ─────────────────────────────────────

export type CellCoord = { row: number; col: number };

export type CellType = 'empty' | 'path' | 'start' | 'end' | 'obstacle' | 'false-route';

export interface Cell {
    row: number;
    col: number;
    type: CellType;
    pathIndex?: number; // position in the correct path sequence
}

export type GamePhase =
    | 'splash'
    | 'instructions'
    | 'countdown'
    | 'study'       // route visible
    | 'fading'      // route fading out
    | 'recall'      // player redraws
    | 'validating'  // brief pause before result
    | 'result';

export interface LevelConfig {
    level: number;
    label: string;
    gridSize: number;
    studyTimeMs: number;
    pathLength: number;         // number of cells in correct path (incl start/end)
    minTurns: number;
    hasObstacles: boolean;
    hasFalseRoutes: boolean;
    falseRouteCount: number;
}

export interface PathResult {
    memoryAccuracy: number;     // % of correct cells recalled
    routeAccuracy: number;      // % of path drawn correctly (order matters)
    completionTimeSec: number;
    planningScore: number;      // derived from turns and backtracking
    stars: number;              // 1–5
}

// Minimum stars needed to advance to the next level.
// Stars < PASS_STARS → drop back one level.
// Stars === PASS_STARS → repeat the current level.
// Stars > PASS_STARS → advance.
export const PASS_STARS = 3;

// Each level adds exactly one path cell (starts at 4).
// Grid grows every 3 levels to give the grid room for longer paths.
// Study time decreases gradually as levels get harder.
export const LEVELS: LevelConfig[] = [
    // ── Beginner block (4×4 grid) ─────────────────────────────────────────────
    { level: 1, label: 'Warm Up', gridSize: 4, studyTimeMs: 9000, pathLength: 4, minTurns: 1, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    { level: 2, label: 'Warm Up', gridSize: 4, studyTimeMs: 8500, pathLength: 5, minTurns: 1, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    { level: 3, label: 'Steady', gridSize: 4, studyTimeMs: 8000, pathLength: 6, minTurns: 2, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    // ── Intermediate block (5×5 grid) ────────────────────────────────────────
    { level: 4, label: 'Steady', gridSize: 5, studyTimeMs: 7500, pathLength: 7, minTurns: 2, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    { level: 5, label: 'Focus', gridSize: 5, studyTimeMs: 7000, pathLength: 8, minTurns: 2, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    { level: 6, label: 'Focus', gridSize: 5, studyTimeMs: 6500, pathLength: 9, minTurns: 3, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    { level: 7, label: 'Focus', gridSize: 5, studyTimeMs: 6000, pathLength: 10, minTurns: 3, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    // ── Advanced block (6×6 grid) ─────────────────────────────────────────────
    { level: 8, label: 'Challenge', gridSize: 6, studyTimeMs: 6000, pathLength: 11, minTurns: 3, hasObstacles: false, hasFalseRoutes: false, falseRouteCount: 0 },
    { level: 9, label: 'Challenge', gridSize: 6, studyTimeMs: 5500, pathLength: 12, minTurns: 3, hasObstacles: true, hasFalseRoutes: false, falseRouteCount: 0 },
    { level: 10, label: 'Challenge', gridSize: 6, studyTimeMs: 5000, pathLength: 13, minTurns: 4, hasObstacles: true, hasFalseRoutes: false, falseRouteCount: 0 },
    // ── Expert block (7×7 grid) ───────────────────────────────────────────────
    { level: 11, label: 'Expert', gridSize: 7, studyTimeMs: 5000, pathLength: 14, minTurns: 4, hasObstacles: false, hasFalseRoutes: true, falseRouteCount: 1 },
    { level: 12, label: 'Expert', gridSize: 7, studyTimeMs: 4500, pathLength: 15, minTurns: 4, hasObstacles: false, hasFalseRoutes: true, falseRouteCount: 1 },
    { level: 13, label: 'Expert', gridSize: 7, studyTimeMs: 4000, pathLength: 16, minTurns: 4, hasObstacles: true, hasFalseRoutes: true, falseRouteCount: 1 },
    // ── Master block (8×8 grid) ───────────────────────────────────────────────
    { level: 14, label: 'Master', gridSize: 8, studyTimeMs: 4000, pathLength: 17, minTurns: 5, hasObstacles: true, hasFalseRoutes: true, falseRouteCount: 1 },
    { level: 15, label: 'Master', gridSize: 8, studyTimeMs: 3500, pathLength: 18, minTurns: 5, hasObstacles: true, hasFalseRoutes: true, falseRouteCount: 2 },
];
