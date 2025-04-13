
import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUpload: (imageData: string, file: File) => void;
  isLoading: boolean;
}

const ImageUploader = ({ onImageUpload, isLoading }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 10MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onImageUpload(result, file);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
  };

  return (
    <Card className={`p-6 border-dashed ${dragActive ? 'border-primary' : 'border-border'}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}>
      <div className="flex flex-col items-center justify-center space-y-4">
        {previewUrl ? (
          <div className="relative w-full">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-[300px] mx-auto rounded-md object-contain"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={removeImage}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="p-4 rounded-full bg-secondary">
              <ImageIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-medium">Drag & drop an image</h3>
              <p className="text-sm text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
          </>
        )}
        
        {!previewUrl && (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <Button 
              variant="secondary" 
              className="relative pointer-events-none"
              disabled={isLoading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageUploader;
