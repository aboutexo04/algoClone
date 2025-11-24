import React, { useState, useEffect } from 'react';
import { ALGORITHM_PROBLEMS } from './constants';
import { ProblemList } from './components/ProblemList';
import { EditorArea } from './components/EditorArea';
import { ReviewPanel } from './components/ReviewPanel';
import { reviewUserCode } from './services/geminiService';
import { AlgorithmProblem, AppState, CodeReviewResult, Difficulty } from './types';
import { Play, RotateCcw, Loader2, BookOpen, ArrowLeft, Code2, Terminal, Cpu, Database, ChevronRight, Star } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<AlgorithmProblem | null>(null);
  const [userCode, setUserCode] = useState<string>("");
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);

  // When problem changes, reset state
  useEffect(() => {
    if (selectedProblem) {
      setUserCode(selectedProblem.boilerplate);
      setAppState(AppState.IDLE);
      setReviewResult(null);
    }
  }, [selectedProblem]);

  const handleSelectProblem = (problem: AlgorithmProblem) => {
    if (selectedProblem && userCode !== selectedProblem.boilerplate && userCode.trim() !== '' && appState !== AppState.REVIEWED) {
      if (!window.confirm("작성 중인 코드가 초기화됩니다. 다른 문제로 이동하시겠습니까?")) {
        return;
      }
    }
    setSelectedProblem(problem);
  };

  const handleReturnToMenu = () => {
    if (userCode !== selectedProblem?.boilerplate && userCode.trim() !== '' && appState !== AppState.REVIEWED) {
       if (!window.confirm("작성 중인 코드가 저장되지 않았습니다. 메뉴로 돌아가시겠습니까?")) {
        return;
      }
    }
    setSelectedProblem(null);
  };

  const handleReset = () => {
    if (selectedProblem && window.confirm("작성한 코드를 초기화 하시겠습니까?")) {
      setUserCode(selectedProblem.boilerplate);
      setAppState(AppState.IDLE);
      setReviewResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!userCode.trim() || !selectedProblem) return;

    setAppState(AppState.ANALYZING);
    try {
      const result = await reviewUserCode(selectedProblem, userCode);
      setReviewResult(result);
      setAppState(AppState.REVIEWED);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      alert("코드 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.EASY: return 'text-green-400 bg-green-400/10 border-green-400/20';
      case Difficulty.MEDIUM: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case Difficulty.HARD: return 'text-red-400 bg-red-400/10 border-red-400/20';
    }
  };

  // --- MENU SCREEN (LANDING PAGE) ---
  if (!selectedProblem) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-gray-100 font-sans selection:bg-blue-500/30 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-600/10 mb-4 ring-1 ring-blue-500/30">
              <Terminal className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              AlgoMaster AI
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Master algorithms by <span className="text-blue-300 font-semibold">Clone Coding</span>. 
              <br />
              Select a pattern, type the reference code, and get instant AI feedback.
            </p>
          </div>

          {/* Problem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALGORITHM_PROBLEMS.map((problem) => (
              <div 
                key={problem.id}
                onClick={() => handleSelectProblem(problem)}
                className="group relative bg-[#161b22] rounded-xl border border-gray-800 p-6 hover:border-blue-500/50 hover:bg-[#1c2128] transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-blue-900/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`text-xs font-bold px-2 py-1 rounded border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </div>
                  <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                    <Code2 className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-300 transition-colors">
                  {problem.title}
                </h3>
                
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 h-10">
                  {problem.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-800">
                  <span className="flex items-center gap-1">
                     {problem.category.includes('Graph') ? <Cpu size={14}/> : <Database size={14} />}
                     {problem.category}
                  </span>
                  <span className="flex items-center gap-1 text-blue-500/0 group-hover:text-blue-400 transition-all transform translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 font-medium">
                    Start Coding <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4" /> 
              Powered by Google Gemini 2.5 Flash
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- WORKSPACE SCREEN ---
  return (
    <div className="flex h-screen w-screen bg-[#0d1117] text-gray-100 overflow-hidden font-sans">
      {/* Sidebar - Problem List (Hidden on mobile, usually) */}
      <div className="w-64 h-full flex-shrink-0 hidden xl:flex flex-col border-r border-gray-800 bg-[#0d1117]">
        <ProblemList selectedId={selectedProblem.id} onSelect={handleSelectProblem} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header Area */}
        <div className="bg-[#161b22] border-b border-gray-800 p-4 shadow-sm flex-shrink-0 flex justify-between items-center z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleReturnToMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="Back to Menu"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                {selectedProblem.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Clone Coding Mode</span>
                <span className="hidden md:inline text-gray-500">|</span>
                <span className="hidden md:inline">{selectedProblem.description}</span>
              </div>
            </div>
          </div>
          
          {/* Actions Toolbar */}
          <div className="flex gap-2 items-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-xs font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              <button
                onClick={handleSubmit}
                disabled={appState === AppState.ANALYZING}
                className="flex items-center gap-2 px-5 py-2 rounded bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed ml-2"
              >
                {appState === AppState.ANALYZING ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Submit Check
                  </>
                )}
              </button>
            </div>
        </div>

        {/* Split View Container: STRICT COLUMN FORMAT */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Left Column: Reference Code */}
          <div className="flex-1 h-full border-r border-gray-800 flex flex-col min-w-0 bg-[#0d1117]">
            <EditorArea 
              code={selectedProblem.solutionCode} 
              onChange={() => {}} 
              readOnly={true}
              label="REFERENCE (정답 코드)"
            />
          </div>

          {/* Center Divider Visual (Optional) */}
          <div className="w-[1px] bg-gray-800 h-full hidden md:block"></div>

          {/* Right Column: User Practice */}
          <div className="flex-1 h-full flex flex-col min-w-0 bg-[#0d1117] relative">
             <EditorArea 
              code={userCode} 
              onChange={setUserCode} 
              disabled={appState === AppState.ANALYZING} 
              label="PRACTICE (따라 쓰기)"
              readOnly={false}
            />
          </div>
          
          {/* Review Panel Overlay */}
          <ReviewPanel 
            status={appState} 
            result={reviewResult} 
            onClose={() => setAppState(AppState.IDLE)} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;