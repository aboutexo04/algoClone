export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface AlgorithmProblem {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  solutionCode: string; // 클론 코딩을 위한 참조 코드 (정답)
  boilerplate: string; // 우측 에디터 초기 상태
  testCases: string[];
}

export interface CodeReviewResult {
  isCorrect: boolean;
  score: number; // 0-100
  timeComplexity: string;
  spaceComplexity: string;
  feedback: string;
  improvedCode: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  REVIEWED = 'REVIEWED',
  ERROR = 'ERROR'
}