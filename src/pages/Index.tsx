
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingScreen from "@/components/OnboardingScreen";
import PlantDashboard from "@/components/PlantDashboard";
import { Plant } from "@/types";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [plants, setPlants] = useState<Plant[]>([]);
  const navigate = useNavigate();

  // This would normally check if user has completed onboarding before
  useEffect(() => {
    // Check local storage for onboarding status
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    
    if (hasCompletedOnboarding === 'true') {
      setShowOnboarding(false);
      
      // Load sample plant data
      setPlants([
        {
          id: "plant1",
          name: "Monstera Deliciosa",
          species: "Swiss Cheese Plant",
          image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
          health: "healthy",
          waterFrequency: 7,
          lastWatered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          sunlight: "medium",
          notes: "Thriving in the living room corner",
          addedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
        },
        {
          id: "plant2",
          name: "Peace Lily",
          species: "Spathiphyllum",
          image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          health: "warning",
          waterFrequency: 5,
          lastWatered: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
          sunlight: "low",
          notes: "Leaves drooping slightly, may need more water",
          addedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() // 45 days ago
        },
        {
          id: "plant3",
          name: "Snake Plant",
          species: "Sansevieria",
          health: "healthy",
          waterFrequency: 14,
          lastWatered: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          sunlight: "low",
          addedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() // 60 days ago
        }
      ]);
    }
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const handleAddPlant = () => {
    // In a real app, this would navigate to a plant addition flow
    // For now, navigate to the analysis page
    navigate('/analysis');
  };

  return (
    <div className="min-h-screen">
      {showOnboarding ? (
        <OnboardingScreen onGetStarted={handleGetStarted} />
      ) : (
        <PlantDashboard plants={plants} onAddPlant={handleAddPlant} />
      )}
    </div>
  );
};

export default Index;
