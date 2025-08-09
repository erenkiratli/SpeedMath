import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { GameState, Difficulty } from './types/game';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [timeLimit, setTimeLimit] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [totalProblems, setTotalProblems] = useState<number>(0);

  const startGame = (selectedDifficulty: Difficulty, selectedTime: number) => {
    setDifficulty(selectedDifficulty);
    setTimeLimit(selectedTime);
    setScore(0);
    setTotalProblems(0);
    setGameState('playing');
  };

  const endGame = (finalScore: number, finalTotal: number) => {
    setScore(finalScore);
    setTotalProblems(finalTotal);
    setGameState('finished');
  };

  const resetGame = () => {
    setGameState('start');
    setScore(0);
    setTotalProblems(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {gameState === 'start' && (
          <StartScreen onStartGame={startGame} />
        )}
        
        {gameState === 'playing' && (
          <GameScreen
            difficulty={difficulty}
            timeLimit={timeLimit}
            onGameEnd={endGame}
          />
        )}
        
        {gameState === 'finished' && (
          <ResultScreen
            score={score}
            totalProblems={totalProblems}
            difficulty={difficulty}
            timeLimit={timeLimit}
            onPlayAgain={resetGame}
          />
        )}
      </motion.div>
    </div>
  );
}

export default App;