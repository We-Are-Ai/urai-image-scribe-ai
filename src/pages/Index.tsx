
import React, { useState } from 'react';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import PlatformSelector, { SocialPlatform } from '@/components/PlatformSelector';
import DescriptionGenerator from '@/components/DescriptionGenerator';
import { generateImageDescription } from '@/services/geminiService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState<SocialPlatform>('twitter');
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleImageUpload = async (imageData: string, file: File) => {
    setUploadedImage(imageData);
    setUploadedFile(file);
    setDescription(null);
    
    if (imageData) {
      await generateDescription(imageData, platform);
    }
  };

  const handlePlatformChange = async (newPlatform: SocialPlatform) => {
    setPlatform(newPlatform);
    setDescription(null);
    
    if (uploadedImage) {
      await generateDescription(uploadedImage, newPlatform);
    }
  };

  const generateDescription = async (imageData: string, selectedPlatform: SocialPlatform) => {
    setIsLoading(true);
    try {
      const result = await generateImageDescription({
        imageData,
        platform: selectedPlatform
      });
      setDescription(result);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive"
      });
      setDescription(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-8 px-4 min-h-screen">
      <Header />
      
      <main>
        <ImageUploader 
          onImageUpload={handleImageUpload}
          isLoading={isLoading}
        />
        
        {uploadedImage && (
          <>
            <PlatformSelector 
              selectedPlatform={platform}
              onPlatformChange={handlePlatformChange}
              isLoading={isLoading}
            />
            
            <DescriptionGenerator
              imageDescription={description}
              platform={platform}
              isLoading={isLoading}
            />
          </>
        )}
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} URAI - AI-powered social media description generator</p>
      </footer>
    </div>
  );
};

export default Index;
