
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Question, Answer, QuestionnaireResult } from "@/types";
import { useNavigate } from "react-router-dom";

interface PlantQuestionnaireProps {
  plantId?: string;
  onBack: () => void;
  onComplete: (result: QuestionnaireResult) => void;
}

const PlantQuestionnaire: React.FC<PlantQuestionnaireProps> = ({ 
  plantId, 
  onBack,
  onComplete 
}) => {
  // Questions for the questionnaire
  const questions: Question[] = [
    {
      id: "q1",
      text: "What type of plant do you have?",
      type: "select",
      options: ["Indoor houseplant", "Outdoor garden plant", "Succulent or cactus", "Not sure"],
      nextQuestionId: "q2"
    },
    {
      id: "q2",
      text: "How much direct sunlight does your plant receive daily?",
      type: "radio",
      options: ["No direct sunlight", "1-3 hours", "4-6 hours", "More than 6 hours"],
      nextQuestionId: "q3"
    },
    {
      id: "q3",
      text: "How often do you water your plant?",
      type: "radio",
      options: ["Daily", "Every 2-3 days", "Weekly", "Every 2 weeks or less"],
      nextQuestionId: "q4"
    },
    {
      id: "q4",
      text: "Have you noticed any of these symptoms? (Select all that apply)",
      type: "checkbox",
      options: [
        "Yellowing leaves", 
        "Brown leaf tips", 
        "Drooping/wilting", 
        "Leaf spots", 
        "Falling leaves",
        "None of the above"
      ],
      nextQuestionId: "q5"
    },
    {
      id: "q5",
      text: "When was the last time you fertilized your plant?",
      type: "radio",
      options: [
        "Within the last month", 
        "1-3 months ago", 
        "More than 3 months ago", 
        "Never/Not sure"
      ],
      nextQuestionId: null
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>("");
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState<QuestionnaireResult | null>(null);
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    // Save the current answer
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = { questionId: currentQuestion.id, value: currentAnswer };
    } else {
      updatedAnswers.push({ questionId: currentQuestion.id, value: currentAnswer });
    }
    
    setAnswers(updatedAnswers);

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // Reset current answer for the next question
      const nextQuestion = questions[currentQuestionIndex + 1];
      if (nextQuestion.type === 'checkbox') {
        setCurrentAnswer([]);
      } else {
        setCurrentAnswer("");
      }
    } else {
      // Questionnaire completed
      setCompleted(true);
      
      // Generate result (in a real app, this would use an AI model or algorithm)
      const mockResult: QuestionnaireResult = {
        plantType: "Monstera Deliciosa",
        careRecommendations: [
          "Your plant appears to be experiencing some stress from overwatering",
          "Let the soil dry out more between waterings, only watering when the top 1-2 inches feel dry",
          "Your lighting conditions seem adequate but could be improved with filtered bright light",
          "Consider repotting if the plant has been in the same container for more than 2 years"
        ],
        waterSchedule: {
          frequency: 7,
          amount: "Enough to moisten soil thoroughly, allowing excess to drain"
        },
        sunlightNeeds: "Bright, indirect light",
        problems: ["Potential overwatering", "May need more humidity"]
      };
      
      setResult(mockResult);
      onComplete(mockResult);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Restore previous answer
      const previousAnswer = answers.find(a => a.questionId === questions[currentQuestionIndex - 1].id);
      if (previousAnswer) {
        setCurrentAnswer(previousAnswer.value);
      }
    } else {
      onBack();
    }
  };

  const handleOptionChange = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleCheckboxChange = (option: string) => {
    const currentValues = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    
    if (currentValues.includes(option)) {
      setCurrentAnswer(currentValues.filter(item => item !== option));
    } else {
      setCurrentAnswer([...currentValues, option]);
    }
  };

  const isOptionSelected = (option: string) => {
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.includes(option);
    }
    return currentAnswer === option;
  };

  const canProceed = () => {
    if (currentQuestion.type === 'checkbox') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    return !!currentAnswer;
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          className="mr-2" 
          onClick={handlePrev}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Plant Questionnaire</h1>
      </div>

      {!completed ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-4">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% complete</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mb-6">
              <div 
                className="bg-leaf h-2 rounded-full" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <h3 className="font-medium mb-4">{currentQuestion.text}</h3>

            {currentQuestion.type === "text" && (
              <Input 
                value={currentAnswer as string} 
                onChange={(e) => setCurrentAnswer(e.target.value)}
                className="mb-4"
              />
            )}

            {currentQuestion.type === "select" && (
              <select 
                className="w-full p-2 border rounded-md mb-4"
                value={currentAnswer as string}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                {currentQuestion.options?.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            )}

            {currentQuestion.type === "radio" && (
              <RadioGroup 
                value={currentAnswer as string} 
                onValueChange={handleOptionChange}
                className="space-y-2 mb-4"
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="ml-2">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "checkbox" && (
              <div className="space-y-2 mb-4">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`option-${index}`}
                      checked={isOptionSelected(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="h-4 w-4 rounded border-gray-300 text-leaf focus:ring-leaf"
                    />
                    <Label htmlFor={`option-${index}`} className="ml-2">{option}</Label>
                  </div>
                ))}
              </div>
            )}

            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full bg-leaf hover:bg-leaf-dark text-white mt-2"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Complete <Check className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="animate-fade-in-up">
          <CardContent className="p-4">
            <div className="flex justify-center mb-4">
              <div className="bg-leaf/20 p-3 rounded-full">
                <Check className="h-6 w-6 text-leaf" />
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-center mb-4">Analysis Complete</h3>
            
            {result && (
              <>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Likely Plant Type</h4>
                  <p className="font-medium">{result.plantType || "Unknown plant"}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Care Recommendations</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {result.careRecommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Water Schedule</h4>
                    <p>Every {result.waterSchedule?.frequency} days</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Sunlight Needs</h4>
                    <p>{result.sunlightNeeds}</p>
                  </div>
                </div>
                
                {result.problems && result.problems.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Potential Issues</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      {result.problems.map((problem, index) => (
                        <li key={index}>{problem}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            
            <Button 
              onClick={handleFinish}
              className="w-full bg-leaf hover:bg-leaf-dark text-white mt-2"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlantQuestionnaire;
