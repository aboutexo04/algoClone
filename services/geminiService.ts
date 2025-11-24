import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AlgorithmProblem, CodeReviewResult } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY || import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set VITE_API_KEY environment variable.");
  }
  return new GoogleGenAI({ apiKey });
};

// Response schema for the model
const reviewSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    isCorrect: {
      type: Type.BOOLEAN,
      description: "Whether the user's code functionally works AND closely follows the reference implementation structure.",
    },
    score: {
      type: Type.NUMBER,
      description: "A score from 0 to 100. 100 means perfect clone (logic and structure). Deduct points for logic errors, typos, indentation errors, or significant deviation from the reference pattern.",
    },
    timeComplexity: {
      type: Type.STRING,
      description: "The time complexity of the user's code.",
    },
    spaceComplexity: {
      type: Type.STRING,
      description: "The space complexity of the user's code.",
    },
    feedback: {
      type: Type.STRING,
      description: "Feedback in Korean. Act as a strict but helpful 'Python Clone Coding Tutor'. Focus on: 1. Did they type it correctly? (Python syntax, indentation) 2. Did they miss any important logic? 3. Praise accuracy. If they used valid pythonic alternatives (like list comprehension) that differ from reference, acknowledge it but remind them the goal is to clone the reference structure for practice.",
    },
    improvedCode: {
      type: Type.STRING,
      description: "The corrected version of the user's code to match the reference implementation.",
    },
  },
  required: ["isCorrect", "score", "timeComplexity", "spaceComplexity", "feedback", "improvedCode"],
};

export const reviewUserCode = async (
  problem: AlgorithmProblem,
  userCode: string
): Promise<CodeReviewResult> => {
  const ai = getAiClient();
  
  const prompt = `
    You are a specialized "Python Clone Coding Tutor".
    The user is practicing by typing out a reference implementation of a standard algorithm in Python.
    
    Target Problem: ${problem.title}
    
    REFERENCE CODE (The user is supposed to clone this):
    ${problem.solutionCode}
    
    USER'S TYPED CODE:
    ${userCode}
    
    YOUR GOAL:
    Evaluate if the user successfully cloned the code.
    - Check for PYTHON specifics: indentation (4 spaces), snake_case naming, type hints accuracy.
    - Logic MUST match the reference.
    - Check for typos that might break the code.
    - Comments in user code are optional but good.
    
    If the user's code is empty or completely wrong, give a low score.
    If the user's code is logically correct but very different from reference, give a medium score and explain that for this exercise, they should try to follow the reference pattern.
    If the user's code is a good clone, give a high score.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reviewSchema,
        temperature: 0.1, // Low temperature for consistent code review
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(responseText) as CodeReviewResult;
  } catch (error) {
    console.error("AI Review Error:", error);
    // Fallback error result
    return {
      isCorrect: false,
      score: 0,
      timeComplexity: "Unknown",
      spaceComplexity: "Unknown",
      feedback: "AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      improvedCode: problem.solutionCode
    };
  }
};

export const getHint = async (problem: AlgorithmProblem): Promise<string> => {
    // Hint functionality not primary for clone coding but kept for compatibility
    return "참조 코드를 자세히 읽고 흐름을 파악해보세요."; 
};