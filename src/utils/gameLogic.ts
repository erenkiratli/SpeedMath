@@ .. @@
 import { Difficulty, Problem, Operation } from '../types/game';

-const operations: Operation[] = ['+', '-', '×', '÷'];
+const basicOperations: Operation[] = ['+', '-', '×', '÷'];
+const advancedOperations: Operation[] = ['²', '√', '!', '^'];

 function getRandomNumber(min: number, max: number): number {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }

+function factorial(n: number): number {
+  if (n <= 1) return 1;
+  let result = 1;
+  for (let i = 2; i <= n; i++) {
+    result *= i;
+  }
+  return result;
+}
+
+function isPerfectSquare(n: number): boolean {
+  const sqrt = Math.sqrt(n);
+  return sqrt === Math.floor(sqrt);
+}
+
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
+    case 'advanced':
+      return { min: 1, max: 20 }; // Smaller range for advanced operations
   }
 }

+function generateAdvancedProblem(): Problem {
+  const operation = advancedOperations[Math.floor(Math.random() * advancedOperations.length)];
+  
+  switch (operation) {
+    case '²': {
+      // Squares: n² where n is 1-25
+      const num1 = getRandomNumber(1, 25);
+      return {
+        num1,
+        num2: 0,
+        operation: '²',
+        answer: num1 * num1,
+        displayText: `${num1}²`
+      };
+    }
+    
+    case '√': {
+      // Square roots: √n where n is a perfect square
+      const base = getRandomNumber(1, 20);
+      const num1 = base * base;
+      return {
+        num1,
+        num2: 0,
+        operation: '√',
+        answer: base,
+        displayText: `√${num1}`
+      };
+    }
+    
+    case '!': {
+      // Factorials: n! where n is 1-8 (8! = 40320)
+      const num1 = getRandomNumber(1, 8);
+      return {
+        num1,
+        num2: 0,
+        operation: '!',
+        answer: factorial(num1),
+        displayText: `${num1}!`
+      };
+    }
+    
+    case '^': {
+      // Powers: a^n where a is 2-10 and n is 2-4
+      const base = getRandomNumber(2, 10);
+      const exponent = getRandomNumber(2, 4);
+      return {
+        num1: base,
+        num2: exponent,
+        operation: '^',
+        answer: Math.pow(base, exponent),
+        displayText: `${base}^${exponent}`
+      };
+    }
+    
+    default:
+      // Fallback to square
+      const num1 = getRandomNumber(1, 15);
+      return {
+        num1,
+        num2: 0,
+        operation: '²',
+        answer: num1 * num1,
+        displayText: `${num1}²`
+      };
+  }
+}
+
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
+  // Handle advanced difficulty separately
+  if (difficulty === 'advanced') {
+    return generateAdvancedProblem();
+  }
+  
   const range = generateNumberRange(difficulty);
-  const operation = operations[Math.floor(Math.random() * operations.length)];
+  const operation = basicOperations[Math.floor(Math.random() * basicOperations.length)];
   
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