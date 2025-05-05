
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAnswer, Question, ExamResult } from "@/types/exam";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ExamSummaryProps {
  answers: UserAnswer[];
  questions: Question[];
  onSubmit: () => void;
  result?: ExamResult;
  isSubmitted: boolean;
  onReset?: () => void;
  timeRemaining: number;
  totalTime: number;
}

export default function ExamSummary({ 
  answers, 
  questions, 
  onSubmit, 
  result,
  isSubmitted,
  onReset,
  timeRemaining,
  totalTime
}: ExamSummaryProps) {
  const totalQuestions = questions.length;
  const answeredQuestions = answers.filter(a => a.selectedOptionId !== null).length;
  const percentage = (answeredQuestions / totalQuestions) * 100;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const timeTaken = totalTime - timeRemaining;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isSubmitted ? "Exam Result" : "Exam Summary"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isSubmitted && result ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-xl font-bold">{result.totalQuestions}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Attempted</p>
                <p className="text-xl font-bold">{result.attempted}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Correct Answers</p>
                <p className="text-xl font-bold text-exam-success">{result.correct}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Time Taken</p>
                <p className="text-xl font-bold">{formatTime(result.timeTaken)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Score</p>
              <div className="flex items-center gap-2">
                <Progress value={result.score} className="h-3" />
                <span className="font-bold">{result.score.toFixed(1)}%</span>
              </div>
            </div>
            
            <Button onClick={onReset} className="w-full mt-4">
              Restart Exam
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Questions Answered</p>
                <p className="text-xl font-bold">{answeredQuestions} / {totalQuestions}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Time Elapsed</p>
                <p className="text-xl font-bold">{formatTime(timeTaken)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-sm font-medium">{percentage.toFixed(1)}%</p>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
            
            <Button onClick={onSubmit} className="w-full mt-4">
              Submit Exam
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
