
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlantAnalysis from "@/components/PlantAnalysis";

const Analysis = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plantId = searchParams.get("plant") || undefined;

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <PlantAnalysis plantId={plantId} onBack={handleBack} />
    </div>
  );
};

export default Analysis;
