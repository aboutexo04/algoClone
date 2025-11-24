import React from 'react';
import { ALGORITHM_PROBLEMS } from '../constants';
import { AlgorithmProblem, Difficulty } from '../types';
import { ChevronRight, Code2, Database, Brain } from 'lucide-react';

interface ProblemListProps {
  selectedId: string;
  onSelect: (problem: AlgorithmProblem) => void;
}

const DifficultyBadge = ({ level }: { level: Difficulty }) => {
  const colors = {
    [Difficulty.EASY]: 'bg-green-500/10 text-green-400 border-green-500/20',
    [Difficulty.MEDIUM]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    [Difficulty.HARD]: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${colors[level]}`}>
      {level}
    </span>
  );
};

export const ProblemList: React.FC<ProblemListProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-500" />
          AlgoMaster
        </h2>
        <p className="text-sm text-gray-400 mt-1">Select a challenge</p>
      </div>
      
      <div className="flex-1 p-2 space-y-1">
        {ALGORITHM_PROBLEMS.map((problem) => (
          <button
            key={problem.id}
            onClick={() => onSelect(problem)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 group relative
              ${selectedId === problem.id 
                ? 'bg-blue-600/10 border border-blue-500/50' 
                : 'hover:bg-gray-800 border border-transparent'
              }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={`font-medium ${selectedId === problem.id ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'}`}>
                {problem.title}
              </span>
              {selectedId === problem.id && <ChevronRight className="w-4 h-4 text-blue-400" />}
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <DifficultyBadge level={problem.difficulty} />
              <span className="text-xs text-gray-500 flex items-center gap-1">
                 {problem.category.includes('Graph') || problem.category.includes('Search') ? <Code2 size={10} /> : <Database size={10} />}
                 {problem.category}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-800 text-xs text-center text-gray-600">
        Powered by Gemini 2.5 Flash
      </div>
    </div>
  );
};