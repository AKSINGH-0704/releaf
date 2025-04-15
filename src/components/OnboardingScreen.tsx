
import React from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Upload, BrainCircuit, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-leaf" />,
      title: "Plant Care Made Easy",
      description: "Track and manage your plant collection with personalized care guides."
    },
    {
      icon: <Upload className="h-6 w-6 text-leaf" />,
      title: "Photo Analysis",
      description: "Upload plant photos to instantly identify issues and get solutions."
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-leaf" />,
      title: "AI-Powered Advice",
      description: "Receive tailored recommendations based on your unique environment."
    },
    {
      icon: <Calendar className="h-6 w-6 text-leaf" />,
      title: "Smart Reminders",
      description: "Never forget to water, fertilize, or repot your plants."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 leaf-pattern">
      <div className="text-center mb-8">
        <div className="relative inline-block mb-2">
          <Leaf className="h-16 w-16 text-leaf animate-leaf-sway" />
        </div>
        <h1 className="text-4xl font-bold text-leaf-dark">ReLeaf</h1>
        <p className="text-lg text-muted-foreground mt-2">Your personal plant care assistant</p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-start"
            variants={itemVariants}
          >
            <div className="bg-leaf/10 p-2 rounded-full mr-3">{feature.icon}</div>
            <div>
              <h3 className="font-medium text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Button
        size="lg" 
        className="bg-leaf hover:bg-leaf-dark text-white" 
        onClick={onGetStarted}
      >
        Get Started
      </Button>
      
      <p className="text-xs text-muted-foreground mt-8">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default OnboardingScreen;
