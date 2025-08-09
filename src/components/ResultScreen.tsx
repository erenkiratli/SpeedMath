import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Target, Clock, Brain } from 'lucide-react';
import { Difficulty } from '../types/game';

interface ResultScreenProps {
  score: number;
  totalProblems: number;
  difficulty: Difficulty;
  timeLimit: number;
  onPlayAgain: () => void;
}

export default function ResultScreen({
  score,
  totalProblems,
  difficulty,
  timeLimit,
  onPlayAgain
}: ResultScreenProps) {
  const accuracy = totalProblems > 0 ? Math.round((score / totalProblems) * 100) : 0;
  const problemsPerMinute = Math.round((totalProblems / timeLimit) * 60);

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding! 🌟";
    if (accuracy >= 80) return "Excellent work! 🎉";
    if (accuracy >= 70) return "Great job! 👏";
    if (accuracy >= 60) return "Good effort! 👍";
    return "Keep practicing! 💪";
  };

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      case 'extreme': return 'Extreme';
      case 'advanced': return 'Advanced';
      default: return 'Unknown';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Game Complete!</h1>
          <p className="text-xl text-gray-600">{getPerformanceMessage()}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 rounded-xl p-6"
          >
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-900">{score}/{totalProblems}</div>
            <div className="text-sm text-blue-700">Correct Answers</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-green-50 rounded-xl p-6"
          >
            <Brain className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-900">{accuracy}%</div>
            <div className="text-sm text-green-700">Accuracy</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-purple-50 rounded-xl p-6"
          >
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-900">{problemsPerMinute}</div>
            <div className="text-sm text-purple-700">Problems/Min</div>
          </motion.div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="text-sm text-gray-600 mb-2">Game Settings</div>
          <div className="flex justify-center space-x-6 text-sm">
            <span className="font-medium">Difficulty: {getDifficultyLabel()}</span>
            <span className="font-medium">Time: {timeLimit}s</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center mx-auto"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </motion.button>
      </div>
    </motion.div>
  );
}