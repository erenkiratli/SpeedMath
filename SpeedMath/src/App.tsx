import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { generateProblem } from './utils/gameLogic';
import { GameState, Difficulty, Problem, GameSettings } from './types/game';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    difficulty: 'easy',
    timeLimit: 60,
  });
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  const generateNewProblem = useCallback(() => {
    const problem = generateProblem(gameSettings.difficulty);
    setCurrentProblem(problem);
    setUserAnswer('');
    setIsCorrect(null);
  }, [gameSettings.difficulty]);

  const startGame = (difficulty: Difficulty, timeLimit: number) => {
    setGameSettings({ difficulty, timeLimit });
    setGameState('playing');
    setScore(0);
    setTimeRemaining(timeLimit);
    setIsCorrect(null);
    setIsTimerPaused(false);
    // Generate first problem
    const problem = generateProblem(difficulty);
    setCurrentProblem(problem);
    setUserAnswer('');
  };

  const resetGame = () => {
    setScore(0);
    setTimeRemaining(gameSettings.timeLimit);
    setIsCorrect(null);
    setIsTimerPaused(false);
    // Generate new problem
    const problem = generateProblem(gameSettings.difficulty);
    setCurrentProblem(problem);
    setUserAnswer('');
  };

  const stopTimer = () => {
    setIsTimerPaused(prev => !prev);
  };

  const exitGame = () => {
    setGameState('start');
    setCurrentProblem(null);
    setUserAnswer('');
    setScore(0);
    setTimeRemaining(0);
    setIsCorrect(null);
    setIsTimerPaused(false);
  };
  const playAgain = () => {
    setGameState('start');
    setCurrentProblem(null);
    setUserAnswer('');
    setScore(0);
    setTimeRemaining(0);
    setIsCorrect(null);
    setIsTimerPaused(false);
  };

  const handleAnswerChange = (answer: string) => {
    setUserAnswer(answer);
    
    if (currentProblem && answer !== '') {
      const numericAnswer = parseInt(answer, 10);
      if (!isNaN(numericAnswer)) {
        if (numericAnswer === currentProblem.answer) {
          setIsCorrect(true);
          setScore(prev => prev + 1);
          
          // Generate new problem after a short delay
          setTimeout(() => {
            generateNewProblem();
          }, 600);
        } else {
          setIsCorrect(false);
        }
      }
    } else {
      setIsCorrect(null);
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0 && !isTimerPaused) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, timeRemaining, isTimerPaused]);

  // Reset correct state when new problem is generated
  useEffect(() => {
    if (currentProblem) {
      setIsCorrect(null);
    }
  }, [currentProblem]);

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <StartScreen key="start" onStartGame={startGame} />
        )}
        
        {gameState === 'playing' && currentProblem && (
          <GameScreen
            key="game"
            problem={currentProblem}
            score={score}
            timeRemaining={timeRemaining}
            userAnswer={userAnswer}
            onAnswerChange={handleAnswerChange}
            isCorrect={isCorrect}
            onStopTimer={stopTimer}
            onResetGame={resetGame}
            onExitGame={exitGame}
            isTimerPaused={isTimerPaused}
          />
        )}
        
        {gameState === 'finished' && (
          <EndScreen key="end" score={score} onPlayAgain={playAgain} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;