import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Pi } from 'lucide-react';
import { Difficulty } from '../types/game';

interface StartScreenProps {
  onStartGame: (difficulty: Difficulty, timeLimit: number) => void;
}

const difficulties = [
  { key: 'easy' as Difficulty, label: 'Easy', description: 'Single-digit numbers (1-9)' },
  { key: 'medium' as Difficulty, label: 'Medium', description: 'Two-digit numbers (10-99)' },
  { key: 'hard' as Difficulty, label: 'Hard', description: 'Three-digit numbers (100-999)' },
  { key: 'extreme' as Difficulty, label: 'Extreme', description: 'Four-digit numbers (1000-9999)' },
];

const timeOptions = [
  { value: 60, label: '1 Minute' },
  { value: 120, label: '2 Minutes' },
  { value: 180, label: '3 Minutes' },
];

export default function StartScreen({ onStartGame }: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>('easy');
  const [selectedTime, setSelectedTime] = React.useState(60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Pi className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Speed Math</h1>
          <p className="text-gray-600 text-lg">Test your mental arithmetic skills</p>
        </motion.div>

        <div className="space-y-8">
          {/* Difficulty Selection */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Pi className="w-5 h-5 mr-2 text-blue-600" />
              Choose Difficulty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {difficulties.map((diff) => (
                <motion.button
                  key={diff.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(diff.key)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedDifficulty === diff.key
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{diff.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{diff.description}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Choose Time Limit
            </h2>
            <div className="flex flex-wrap gap-3">
              {timeOptions.map((time) => (
                <motion.button
                  key={time.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time.value)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all duration-200 flex-1 min-w-0 text-center ${
                    selectedTime === time.value
                      ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {time.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStartGame(selectedDifficulty, selectedTime)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Start Game</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}