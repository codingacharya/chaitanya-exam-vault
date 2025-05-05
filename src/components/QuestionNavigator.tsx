
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAnswer } from "@/types/exam";
import { cn } from "@/lib/utils";

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answers: UserAnswer[];
  onNavigate: (index: number) => void;
  className?: string;
}

export default function QuestionNavigator({
  totalQuestions,
  currentQuestionIndex,
  answers,
  onNavigate,
  className,
}: QuestionNavigatorProps) {
  // Determine button style based on question status
  const getButtonStyle = (index: number) => {
    const isCurrentQuestion = currentQuestionIndex === index;
    const answer = answers.find((a) => a.questionId === index + 1);
    const isAnswered = answer?.selectedOptionId !== null;

    if (isCurrentQuestion) return "bg-exam-primary text-white";
    if (isAnswered) return "bg-exam-success text-white";
    return "bg-gray-100";
  };

  return (
    <div className={cn("border rounded-lg p-4", className)}>
      <h3 className="font-medium mb-2">Question Navigator</h3>
      <ScrollArea className="h-[200px] px-1">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onNavigate(index)}
              className={cn(
                "w-10 h-10 p-0 font-medium",
                getButtonStyle(index)
              )}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
