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

export const LEVELS: LevelConfig[] = [
    {
        level: 1,
        label: 'Warm Up',
        gridSize: 4,
        studyTimeMs: 8000,
        pathLength: 6,
        minTurns: 1,
        hasObstacles: false,
        hasFalseRoutes: false,
        falseRouteCount: 0,
    },
    {
        level: 2,
        label: 'Steady',
        gridSize: 5,
        studyTimeMs: 7000,
        pathLength: 8,
        minTurns: 2,
        hasObstacles: false,
        hasFalseRoutes: false,
        falseRouteCount: 0,
    },
    {
        level: 3,
        label: 'Focus',
        gridSize: 6,
        studyTimeMs: 6000,
        pathLength: 11,
        minTurns: 3,
        hasObstacles: false,
        hasFalseRoutes: false,
        falseRouteCount: 0,
    },
    {
        level: 4,
        label: 'Challenge',
        gridSize: 6,
        studyTimeMs: 5000,
        pathLength: 11,
        minTurns: 3,
        hasObstacles: true,
        hasFalseRoutes: false,
        falseRouteCount: 0,
    },
    {
        level: 5,
        label: 'Expert',
        gridSize: 6,
        studyTimeMs: 5000,
        pathLength: 11,
        minTurns: 4,
        hasObstacles: false,
        hasFalseRoutes: true,
        falseRouteCount: 1,
    },
];
