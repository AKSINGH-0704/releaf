
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageCapture: (file: File) => void;
  previewUrl?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageCapture, 
  previewUrl,
  className 
}) => {
  const [preview, setPreview] = useState<string | undefined>(previewUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageCapture(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      
      {preview ? (
        <Card className="relative w-full aspect-square overflow-hidden bg-muted">
          <img 
            src={preview} 
            alt="Plant preview" 
            className="w-full h-full object-cover" 
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ) : (
        <Card 
          className="w-full aspect-square flex flex-col items-center justify-center p-4 border-dashed border-2 border-muted-foreground/50 bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={handleCameraClick}
        >
          <Camera className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground font-medium">Take a photo</p>
          <p className="text-xs text-muted-foreground mt-1">or</p>
          <div className="flex items-center mt-2">
            <Upload className="h-4 w-4 mr-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Upload an image</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
