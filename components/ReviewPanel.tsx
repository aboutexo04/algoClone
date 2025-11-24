import React from 'react';
import { CodeReviewResult, AppState } from '../types';
import { CheckCircle, XCircle, Clock, Database, Lightbulb, Code } from 'lucide-react';

interface ReviewPanelProps {
  status: AppState;
  result: CodeReviewResult | null;
  onClose: () => void;
}

export const ReviewPanel: React.FC<ReviewPanelProps> = ({ status, result, onClose }) => {
  if (status !== AppState.REVIEWED || !result) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-2xl transform transition-transform duration-300 max-h-[50vh] flex flex-col z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-850">
        <div className="flex items-center gap-3">
          {result.isCorrect ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold text-lg">정답입니다!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400">
              <XCircle className="w-6 h-6" />
              <span className="font-bold text-lg">다시 시도해보세요</span>
            </div>
          )}
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${result.score >= 80 ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'}`}>
            점수: {result.score}/100
          </span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          닫기
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="bg-gray-800 p-3 rounded-lg flex-1 border border-gray-700">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Time Complexity</span>
              </div>
              <p className="text-blue-300 font-mono font-bold">{result.timeComplexity}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg flex-1 border border-gray-700">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Database className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Space Complexity</span>
              </div>
              <p className="text-purple-300 font-mono font-bold">{result.spaceComplexity}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-gray-300 font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              AI 피드백
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {result.feedback}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
           <div className="bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
             <Code className="w-4 h-4 text-blue-400" />
             <span className="text-sm font-medium text-gray-300">개선된 코드</span>
           </div>
           <div className="flex-1 overflow-auto bg-gray-950 p-4">
             <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
               {result.improvedCode}
             </pre>
           </div>
        </div>
      </div>
    </div>
  );
};