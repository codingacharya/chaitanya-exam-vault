
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimerProps {
  seconds: number;
  onTimeUp?: () => void;
}

export default function Timer({ seconds, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  // Format seconds into MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate percentage of time remaining
  const timePercentage = (timeLeft / seconds) * 100;

  // Determine color based on time remaining
  const getTimerColor = () => {
    if (timePercentage > 50) return "text-exam-success";
    if (timePercentage > 25) return "text-exam-warning";
    return "text-exam-danger";
  };

  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-between p-4">
        <div className="text-sm font-medium">Time Remaining</div>
        <div className={cn("text-xl font-bold", getTimerColor())}>
          {formatTime(timeLeft)}
        </div>
      </CardContent>
    </Card>
  );
}
