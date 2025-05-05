
import { useExam } from "@/context/ExamContext";
import QuestionDisplay from "@/components/QuestionDisplay";
import QuestionNavigator from "@/components/QuestionNavigator";
import ExamSummary from "@/components/ExamSummary";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Exam() {
  const { 
    questions, 
    examState, 
    navigateToQuestion, 
    selectAnswer, 
    submitExam, 
    startExam,
    resetExam,
    getResult,
    isLoading
  } = useExam();
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const currentQuestion = questions[examState.currentQuestionIndex];
  const currentAnswer = examState.answers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  const handleNext = () => {
    if (examState.currentQuestionIndex < questions.length - 1) {
      navigateToQuestion(examState.currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (examState.currentQuestionIndex > 0) {
      navigateToQuestion(examState.currentQuestionIndex - 1);
    }
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "Your exam has been automatically submitted.",
      variant: "destructive",
    });
    submitExam();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading Exam...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your questions.</p>
        </div>
      </div>
    );
  }

  // Show start screen if exam hasn't been started yet
  if (!examState.answers.length) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Chaitanya University Exam Portal</CardTitle>
            <CardDescription>
              100 Multiple Choice Questions | 60 Minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Exam Instructions</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>This exam contains 100 multiple-choice questions.</li>
                <li>You have 60 minutes to complete the exam.</li>
                <li>Each question has one correct answer.</li>
                <li>You can navigate between questions using the question navigator.</li>
                <li>You can review and change your answers before submitting.</li>
                <li>The exam will be automatically submitted when the time is up.</li>
              </ul>
            </div>

            <div className="flex justify-center pt-4">
              <Button size="lg" onClick={startExam}>
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate results if exam is submitted
  const result = examState.isSubmitted ? getResult() : undefined;

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Chaitanya University Exam</h1>
        <Timer 
          seconds={examState.timeRemaining} 
          onTimeUp={handleTimeUp} 
        />
      </div>
      
      <div className={`grid gap-6 ${isMobile ? "" : "grid-cols-[1fr_300px]"}`}>
        <div className="space-y-6">
          {currentQuestion && (
            <QuestionDisplay
              question={currentQuestion}
              userAnswer={currentAnswer}
              onSelectAnswer={selectAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={examState.currentQuestionIndex === 0}
              isLast={examState.currentQuestionIndex === questions.length - 1}
              isSubmitted={examState.isSubmitted}
            />
          )}
          
          {!isMobile && (
            <QuestionNavigator
              totalQuestions={questions.length}
              currentQuestionIndex={examState.currentQuestionIndex}
              answers={examState.answers}
              onNavigate={navigateToQuestion}
            />
          )}
        </div>
        
        <div className="space-y-6">
          <ExamSummary 
            answers={examState.answers}
            questions={questions}
            onSubmit={submitExam}
            result={result}
            isSubmitted={examState.isSubmitted}
            onReset={resetExam}
            timeRemaining={examState.timeRemaining}
            totalTime={60 * 60}
          />
          
          {isMobile && (
            <QuestionNavigator
              totalQuestions={questions.length}
              currentQuestionIndex={examState.currentQuestionIndex}
              answers={examState.answers}
              onNavigate={navigateToQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}
