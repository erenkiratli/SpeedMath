const difficulties = [
  { key: 'easy' as Difficulty, label: 'Easy', description: 'Single-digit numbers (1-9)' },
  { key: 'medium' as Difficulty, label: 'Medium', description: 'Two-digit numbers (10-99)' },
  { key: 'hard' as Difficulty, label: 'Hard', description: 'Three-digit numbers (100-999)' },
  { key: 'extreme' as Difficulty, label: 'Extreme', description: 'Four-digit numbers (1000-9999)' },
  { key: 'advanced' as Difficulty, label: 'Advanced', description: 'Squares, roots, factorials & powers' },
];

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Pi className="w-5 h-5 mr-2 text-blue-600" />
              Choose Difficulty
            </h2>
            <div className="grid grid-cols-1 gap-3">
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