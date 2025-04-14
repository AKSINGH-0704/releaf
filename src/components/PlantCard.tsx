
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Sun, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { Plant, PlantHealth } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onSelect }) => {
  const getHealthIcon = (health: PlantHealth) => {
    switch (health) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "unhealthy":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getWaterStatus = () => {
    if (!plant.lastWatered) return { text: "Not watered yet", urgent: false };
    
    const lastWatered = new Date(plant.lastWatered);
    const daysSinceWatered = Math.floor((Date.now() - lastWatered.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceWatered >= plant.waterFrequency) {
      return {
        text: `${daysSinceWatered} days ago - Water now!`,
        urgent: true
      };
    } else {
      return {
        text: `${formatDistanceToNow(lastWatered)} ago`,
        urgent: false
      };
    }
  };

  const waterStatus = getWaterStatus();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow animate-fade-in-up">
      <div className="relative h-36">
        {plant.image ? (
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-leaf-light to-leaf flex items-center justify-center">
            <span className="text-white text-xl font-bold">{plant.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-medium truncate">{plant.name}</h3>
          {plant.species && (
            <p className="text-white/80 text-xs truncate italic">{plant.species}</p>
          )}
        </div>
      </div>

      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {getHealthIcon(plant.health)}
            <span className="text-sm ml-1 capitalize">{plant.health}</span>
          </div>
          <Badge variant={plant.health === "healthy" ? "default" : "outline"} className="text-xs">
            {plant.sunlight} light
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center text-xs">
            <Droplets className="h-3 w-3 mr-1 text-sky" />
            <span className={waterStatus.urgent ? "text-destructive font-medium" : ""}>
              {waterStatus.text}
            </span>
          </div>
          <div className="flex items-center text-xs">
            <Sun className="h-3 w-3 mr-1 text-amber-500" />
            <span>Every {plant.waterFrequency} days</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-2 pt-0">
        <Button 
          variant="ghost" 
          className="text-xs h-8 w-full hover:bg-leaf/10 hover:text-leaf"
          onClick={() => onSelect(plant)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
