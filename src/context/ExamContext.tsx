
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Question, UserAnswer, ExamState, ExamResult } from "../types/exam";
import { mockQuestions } from "../data/mockQuestions";
import { toast } from "@/components/ui/use-toast";

type ExamContextType = {
  questions: Question[];
  examState: ExamState;
  navigateToQuestion: (index: number) => void;
  selectAnswer: (questionId: number, optionId: string) => void;
  submitExam: () => void;
  startExam: () => void;
  resetExam: () => void;
  getResult: () => ExamResult;
  isLoading: boolean;
};

const initialExamState: ExamState = {
  currentQuestionIndex: 0,
  timeRemaining: 60 * 60, // 60 minutes in seconds
  answers: [],
  isSubmitted: false,
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [examState, setExamState] = useState<ExamState>(initialExamState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize exam with questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // In a real app, you would fetch from MongoDB here
        // For now, use mock data
        setQuestions(mockQuestions);
        
        // Initialize answers array
        const initialAnswers: UserAnswer[] = mockQuestions.map((q) => ({
          questionId: q.id,
          selectedOptionId: null,
        }));
        
        setExamState((prev) => ({
          ...prev,
          answers: initialAnswers,
        }));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load questions:", error);
        toast({
          title: "Error",
          description: "Failed to load exam questions. Please try again.",
          variant: "destructive",
        });
      }
    };

    loadQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (examState.isSubmitted || !examState.timeRemaining || isLoading) {
      return;
    }

    const timer = setInterval(() => {
      setExamState((prev) => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          // Auto-submit when time is up
          submitExam();
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState.isSubmitted, examState.timeRemaining, isLoading]);

  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length && !examState.isSubmitted) {
      setExamState((prev) => ({ ...prev, currentQuestionIndex: index }));
    }
  };

  const selectAnswer = (questionId: number, optionId: string) => {
    if (examState.isSubmitted) return;

    setExamState((prev) => ({
      ...prev,
      answers: prev.answers.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, selectedOptionId: optionId }
          : answer
      ),
    }));
  };

  const startExam = () => {
    setExamState({
      ...initialExamState,
      answers: questions.map((q) => ({ questionId: q.id, selectedOptionId: null })),
    });
  };

  const submitExam = () => {
    setExamState((prev) => ({ ...prev, isSubmitted: true }));
    toast({
      title: "Exam Submitted",
      description: "Your exam has been submitted successfully.",
    });
  };

  const resetExam = () => {
    setExamState({
      ...initialExamState,
      answers: questions.map((q) => ({ questionId: q.id, selectedOptionId: null })),
    });
  };

  const getResult = (): ExamResult => {
    const attempted = examState.answers.filter(
      (answer) => answer.selectedOptionId !== null
    ).length;

    const correct = examState.answers.filter((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      return question && answer.selectedOptionId === question.correctOptionId;
    }).length;

    const totalQuestions = questions.length;
    const score = (correct / totalQuestions) * 100;
    const timeTaken = 60 * 60 - examState.timeRemaining;

    return {
      totalQuestions,
      attempted,
      correct,
      score,
      timeTaken,
    };
  };

  const value = {
    questions,
    examState,
    navigateToQuestion,
    selectAnswer,
    submitExam,
    startExam,
    resetExam,
    getResult,
    isLoading,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export const useExam = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
};
