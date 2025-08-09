import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Clock } from 'lucide-react';

interface EndScreenProps {
  score: number;
  onPlayAgain: () => void;
}

export default function EndScreen({ score, onPlayAgain }: EndScreenProps) {
  const getScoreFeedback = (score: number) => {
    if (score >= 50) return { text: 'Outstanding!', emoji: '🏆', color: 'text-yellow-600' };
    if (score >= 30) return { text: 'Excellent!', emoji: '🎉', color: 'text-green-600' };
    if (score >= 20) return { text: 'Great Job!', emoji: '👏', color: 'text-blue-600' };
    if (score >= 10) return { text: 'Good Work!', emoji: '👍', color: 'text-purple-600' };
    return { text: 'Keep Practicing!', emoji: '💪', color: 'text-orange-600' };
  };

  const feedback = getScoreFeedback(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Time's Up!</h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-5xl font-bold text-gray-900">{score}</span>
          </div>
          <p className="text-gray-600 text-lg mb-2">
            {score === 1 ? 'Correct Answer' : 'Correct Answers'}
          </p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`text-2xl font-bold ${feedback.color} mb-2`}
          >
            {feedback.text} {feedback.emoji}
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </motion.button>

        <p className="text-gray-500 text-sm mt-4">
          Challenge yourself with different difficulty levels!
        </p>
      </div>
    </motion.div>
  );
}