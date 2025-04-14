
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, SlidersHorizontal, Leaf } from "lucide-react";
import PlantCard from "./PlantCard";
import { Plant } from "@/types";
import { useNavigate } from "react-router-dom";

interface PlantDashboardProps {
  plants: Plant[];
  onAddPlant: () => void;
}

const PlantDashboard: React.FC<PlantDashboardProps> = ({ plants, onAddPlant }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    plant.species?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPlant = (plant: Plant) => {
    // In a future implementation, this would navigate to a plant detail view
    console.log("Selected plant:", plant);
    // For now we'll navigate to the analysis page as a placeholder
    navigate(`/analysis?plant=${plant.id}`);
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Leaf className="h-6 w-6 text-leaf mr-2" />
          <h1 className="text-2xl font-bold text-leaf-dark">LeafLogic</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          className="border-leaf/20 text-leaf"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <Input 
          type="text"
          placeholder="Search plants..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {filteredPlants.map(plant => (
            <PlantCard 
              key={plant.id} 
              plant={plant} 
              onSelect={handleSelectPlant}
            />
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-8 text-center my-8">
          <Leaf className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <h3 className="text-xl font-medium text-foreground mb-2">No plants yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your first plant to start receiving personalized care recommendations
          </p>
          <Button 
            onClick={onAddPlant}
            className="bg-leaf hover:bg-leaf-dark text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Your First Plant
          </Button>
        </div>
      )}

      {filteredPlants.length > 0 && (
        <Button 
          onClick={onAddPlant} 
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-leaf hover:bg-leaf-dark shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default PlantDashboard;
