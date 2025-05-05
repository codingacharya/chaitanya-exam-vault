
import { Question } from "../types/exam";

// Generate 100 mock questions
export const mockQuestions: Question[] = Array.from({ length: 100 }, (_, i) => {
  const questionNumber = i + 1;
  const optionCount = 4;
  const correctOption = String.fromCharCode(65 + Math.floor(Math.random() * optionCount));
  
  return {
    id: questionNumber,
    text: `Question ${questionNumber}: This is a sample question for the exam. What is the correct answer?`,
    options: Array.from({ length: optionCount }, (_, j) => {
      const optionId = String.fromCharCode(65 + j);
      return {
        id: optionId,
        text: `Option ${optionId}: This is sample option ${optionId} for question ${questionNumber}.`
      };
    }),
    correctOptionId: correctOption,
  };
});
