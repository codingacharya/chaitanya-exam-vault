
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-blue-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-4xl font-bold text-exam-secondary">
            Chaitanya University Exam Vault
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Your centralized platform for online exams and assessments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Comprehensive Testing</h3>
              <p className="text-gray-600">
                Access a variety of standardized exams with 100 questions designed to 
                thoroughly evaluate your knowledge and understanding.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Instant Results</h3>
              <p className="text-gray-600">
                Receive detailed feedback and performance analytics immediately 
                after completing your assessment.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Secure Platform</h3>
              <p className="text-gray-600">
                Our MongoDB-backed system ensures your exam data and results 
                are securely stored and readily available.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Flexible Learning</h3>
              <p className="text-gray-600">
                Take exams at your own pace, review your answers, and learn 
                from detailed explanations of correct solutions.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center pt-4">
            <Button asChild size="lg" className="px-8 py-2 text-lg bg-exam-primary hover:bg-exam-secondary">
              <Link to="/exam">Start An Exam Now</Link>
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Experience our advanced examination platform with MongoDB integration
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
