
// Plant-related types
export type PlantHealth = 'healthy' | 'warning' | 'unhealthy' | 'unknown';

export interface Plant {
  id: string;
  name: string;
  species?: string;
  image?: string;
  health: PlantHealth;
  waterFrequency: number; // days between watering
  lastWatered?: string; // ISO date string
  sunlight: 'low' | 'medium' | 'high';
  notes?: string;
  addedAt: string; // ISO date string
}

// Plant analysis types
export interface AnalysisResult {
  health: PlantHealth;
  issues: string[];
  recommendations: string[];
  confidence: number;
}

// Question types for plant questionnaire
export interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'radio' | 'checkbox';
  options?: string[];
  nextQuestionId?: string | null;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface QuestionnaireResult {
  plantType?: string;
  careRecommendations: string[];
  waterSchedule?: {
    frequency: number;
    amount: string;
  };
  sunlightNeeds?: string;
  problems?: string[];
}
