
export type AnswerOption = {
  id: string;
  text: string;
};

export type Question = {
  id: number;
  text: string;
  options: AnswerOption[];
  correctOptionId: string;
};

export type UserAnswer = {
  questionId: number;
  selectedOptionId: string | null;
};

export type ExamState = {
  currentQuestionIndex: number;
  timeRemaining: number;
  answers: UserAnswer[];
  isSubmitted: boolean;
};

export type ExamResult = {
  totalQuestions: number;
  attempted: number;
  correct: number;
  score: number;
  timeTaken: number;
};
