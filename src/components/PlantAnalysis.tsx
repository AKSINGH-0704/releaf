
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertTriangle, Leaf, ThumbsUp, ThumbsDown } from "lucide-react";
import ImageUpload from "./common/ImageUpload";
import { AnalysisResult } from "@/types";
import { useNavigate } from "react-router-dom";

interface PlantAnalysisProps {
  plantId?: string;
  onBack: () => void;
}

const PlantAnalysis: React.FC<PlantAnalysisProps> = ({ plantId, onBack }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const navigate = useNavigate();

  const handleImageCapture = (file: File) => {
    // In a real app, we'd send this to an API for analysis
    console.log("Captured image:", file);
    setAnalyzing(true);

    // Simulate API delay
    setTimeout(() => {
      // Mock analysis result
      setResult({
        health: "warning",
        issues: [
          "Yellowing leaves suggest possible nutrient deficiency",
          "Some signs of underwatering detected"
        ],
        recommendations: [
          "Water more frequently, allowing soil to dry only slightly between waterings",
          "Consider applying a balanced fertilizer following package directions",
          "Move to a location with slightly brighter, indirect light"
        ],
        confidence: 0.85
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleQuestionnaire = () => {
    navigate(plantId ? `/questionnaire?plant=${plantId}` : '/questionnaire');
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          className="mr-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Plant Health Analysis</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            Upload a photo of your plant for AI-powered health analysis
          </p>
          <ImageUpload onImageCapture={handleImageCapture} />

          {analyzing && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-pulse">
                <Leaf className="h-8 w-8 text-leaf animate-spin" />
              </div>
              <p className="mt-2 text-sm font-medium">Analyzing your plant...</p>
            </div>
          )}

          {result && !analyzing && (
            <div className="mt-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {result.health === "healthy" ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  )}
                  <span className="font-medium capitalize">{result.health}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(result.confidence * 100)}% confidence
                </span>
              </div>

              {result.issues.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Issues Detected:</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {result.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <h3 className="text-sm font-medium mb-2">Recommendations:</h3>
              <ul className="text-sm space-y-1 list-disc pl-5 mb-4">
                {result.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>

              <div className="flex justify-center space-x-4 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>Helpful</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  <span>Not Accurate</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground mb-3">
          Not sure what's wrong with your plant?
        </p>
        <Button 
          variant="outline" 
          className="border-leaf text-leaf hover:bg-leaf/10"
          onClick={handleQuestionnaire}
        >
          Take our plant health questionnaire
        </Button>
      </div>
    </div>
  );
};

export default PlantAnalysis;
