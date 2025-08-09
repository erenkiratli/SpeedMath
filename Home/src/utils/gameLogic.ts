import { Difficulty, Problem, Operation } from '../types/game';

const operations: Operation[] = ['+', '-', '×', '÷'];

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumberRange(difficulty: Difficulty): { min: number; max: number } {
  switch (difficulty) {
    case 'easy':
      return { min: 1, max: 9 };
    case 'medium':
      return { min: 10, max: 99 };
    case 'hard':
      return { min: 100, max: 999 };
    case 'extreme':
      return { min: 1000, max: 9999 };
  }
}

function generateDivisionProblem(difficulty: Difficulty): Problem {
  const range = generateNumberRange(difficulty);
  let num2 = getRandomNumber(range.min, range.max);
  
  // For extreme difficulty, allow larger divisors
  if (difficulty === 'extreme') {
    num2 = getRandomNumber(2, 99);
  } else {
    num2 = getRandomNumber(2, Math.min(range.max, 20));
  }
  
  // Generate a number that's divisible by num2
  const quotient = getRandomNumber(
    difficulty === 'easy' ? 2 : difficulty === 'medium' ? 2 : 5,
    difficulty === 'easy' ? 9 : difficulty === 'medium' ? 15 : 25
  );
  
  const num1 = num2 * quotient;
  
  return {
    num1,
    num2,
    operation: '÷',
    answer: quotient
  };
}

export function generateProblem(difficulty: Difficulty): Problem {
  const range = generateNumberRange(difficulty);
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  if (operation === '÷') {
    return generateDivisionProblem(difficulty);
  }
  
  let num1 = getRandomNumber(range.min, range.max);
  let num2 = getRandomNumber(range.min, range.max);
  
  // For extreme difficulty, make multiplication more challenging
  if (difficulty === 'extreme' && operation === '×') {
    num1 = getRandomNumber(1000, 9999);
    num2 = getRandomNumber(100, 999);
  }
  
  // Ensure subtraction doesn't result in negative numbers
  if (operation === '-' && num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  
  let answer: number;
  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '×':
      answer = num1 * num2;
      break;
    default:
      answer = 0;
  }
  
  return { num1, num2, operation, answer };
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}