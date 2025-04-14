
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlantQuestionnaire from "@/components/PlantQuestionnaire";
import { QuestionnaireResult } from "@/types";
import { toast } from "@/components/ui/use-toast";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plantId = searchParams.get("plant") || undefined;

  const handleBack = () => {
    navigate("/");
  };

  const handleComplete = (result: QuestionnaireResult) => {
    // In a real app, we would save this result and update the plant
    console.log("Questionnaire completed with result:", result);
    
    toast({
      title: "Analysis Complete",
      description: "Your plant care recommendations are ready",
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen">
      <PlantQuestionnaire 
        plantId={plantId} 
        onBack={handleBack} 
        onComplete={handleComplete}
      />
    </div>
  );
};

export default Questionnaire;
