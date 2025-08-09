@@ .. @@
-export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';
+export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme' | 'advanced';
 export type GameState = 'start' | 'playing' | 'finished';
-export type Operation = '+' | '-' | '×' | '÷';
+export type Operation = '+' | '-' | '×' | '÷' | '²' | '√' | '!' | '^';

 export interface Problem {
   num1: number;
   num2: number;
   operation: Operation;
   answer: number;
+  displayText?: string;
 }