import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Pause, RotateCcw, X } from 'lucide-react';
import { Problem } from '../types/game';
import { formatTime } from '../utils/gameLogic';

interface GameScreenProps {
  problem: Problem;
  score: number;
  timeRemaining: number;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  isCorrect: boolean | null;
  onStopTimer: () => void;
  onResetGame: () => void;
  onExitGame: () => void;
  isTimerPaused: boolean;
}

export default function GameScreen({
  problem,
  score,
  timeRemaining,
  userAnswer,
  onAnswerChange,
  isCorrect,
  onStopTimer,
  onResetGame,
  onExitGame,
  isTimerPaused,
}: GameScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [problem]);

  const timePercentage = Math.max(0, (timeRemaining / (3 * 60)) * 100);
  const isLowTime = timeRemaining <= 30;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        {/* Header with Score and Timer */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">{score}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className={`w-6 h-6 ${isLowTime ? 'text-red-500' : isTimerPaused ? 'text-orange-500' : 'text-blue-500'}`} />
            <span className={`text-2xl font-bold ${isLowTime ? 'text-red-600' : isTimerPaused ? 'text-orange-600' : 'text-gray-900'}`}>
              {formatTime(timeRemaining)}
            </span>
            {isTimerPaused && (
              <span className="text-sm text-orange-600 font-medium ml-2">PAUSED</span>
            )}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStopTimer}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
              isTimerPaused
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
          >
            <Pause className="w-3 h-3" />
            <span>{isTimerPaused ? 'Resume' : 'Pause'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResetGame}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200 text-sm"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExitGame}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 text-sm"
          >
            <X className="w-3 h-3" />
            <span>Exit</span>
          </motion.button>
        </div>
        {/* Timer Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <motion.div
            className={`h-2 rounded-full transition-colors duration-300 ${
              isLowTime ? 'bg-red-500' : isTimerPaused ? 'bg-orange-500' : 'bg-blue-500'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${Math.min(100, timePercentage * 3)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Problem Display */}
        <motion.div
          key={`${problem.num1}-${problem.operation}-${problem.num2}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight break-all">
            {problem.num1} {problem.operation} {problem.num2} =
          </div>
          
          <motion.input
            ref={inputRef}
            type="number"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center border-4 rounded-xl py-3 px-4 w-full max-w-xs transition-colors duration-200 ${
              isCorrect === null
                ? 'border-gray-300 focus:border-blue-500'
                : isCorrect
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
            } focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
              isCorrect === null
                ? 'focus:ring-blue-500'
                : isCorrect
                ? 'focus:ring-green-500'
                : 'focus:ring-red-500'
            }`}
            placeholder="?"
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
              // Prevent arrow keys from changing the value
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
              }
            }}
            onWheel={(e) => {
              // Prevent mouse wheel from changing the value
              e.currentTarget.blur();
            }}
          />
        </motion.div>

        {/* Feedback */}
        <motion.div
          className="text-center h-8"
          key={isCorrect?.toString()}
        >
          {isCorrect === true && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-green-600 font-semibold text-lg"
            >
              Correct! 🎉
            </motion.div>
          )}
          {isCorrect === false && userAnswer && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-red-600 font-semibold text-lg"
            >
              Try again! 🤔
            </motion.div>
          )}
        </motion.div>

        {/* Instructions */}
        <div className="text-center text-gray-500 text-sm mt-8">
          Type your answer and press Enter or wait for auto-check
        </div>
      </div>
    </motion.div>
  );
}