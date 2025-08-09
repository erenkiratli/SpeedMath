export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';
export type GameState = 'start' | 'playing' | 'finished';
export type Operation = '+' | '-' | '×' | '÷';

export interface Problem {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

export interface GameSettings {
  difficulty: Difficulty;
  timeLimit: number;
}

export interface GameStats {
  score: number;
  timeRemaining: number;
  currentProblem: Problem;
}