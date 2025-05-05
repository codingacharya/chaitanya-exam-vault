
import { Question, UserAnswer } from "@/types/exam";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface QuestionDisplayProps {
  question: Question;
  userAnswer: UserAnswer | undefined;
  onSelectAnswer: (questionId: number, optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitted: boolean;
}

export default function QuestionDisplay({
  question,
  userAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  isSubmitted,
}: QuestionDisplayProps) {
  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      onSelectAnswer(question.id, optionId);
    }
  };

  const getOptionClassName = (optionId: string) => {
    if (!isSubmitted) {
      return userAnswer?.selectedOptionId === optionId
        ? "option-button selected"
        : "option-button";
    }

    // Show correct/incorrect answers when submitted
    if (optionId === question.correctOptionId) {
      return "option-button bg-exam-success/20 border-exam-success";
    }
    
    if (userAnswer?.selectedOptionId === optionId) {
      return optionId !== question.correctOptionId
        ? "option-button bg-exam-danger/20 border-exam-danger"
        : "option-button bg-exam-success/20 border-exam-success";
    }
    
    return "option-button";
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Question {question.id}: {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option.id}
              className={getOptionClassName(option.id)}
              onClick={() => handleOptionSelect(option.id)}
              disabled={isSubmitted}
            >
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                  {userAnswer?.selectedOptionId === option.id && (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <span>
                  {option.id}. {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={isFirst}
        >
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={isLast}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
