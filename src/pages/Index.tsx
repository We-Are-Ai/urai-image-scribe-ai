import React, { useState } from 'react';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import PlatformSelector, { SocialPlatform } from '@/components/PlatformSelector';
import ModelSelector, { AIModel } from '@/components/ModelSelector';
import DescriptionGenerator from '@/components/DescriptionGenerator';
import { generateImageDescription } from '@/services/geminiService';
import { generateImageDescriptionWithGroq } from '@/services/groqService';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState<SocialPlatform>('twitter');
  const [model, setModel] = useState<AIModel>('gemini');
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const { toast } = useToast();

  const handleImageUpload = async (imageData: string, file: File) => {
    setUploadedImage(imageData);
    setUploadedFile(file);
    setDescription(null);
    
    if (imageData) {
      await generateDescription(imageData, platform, model);
    }
  };

  const handlePlatformChange = async (newPlatform: SocialPlatform) => {
    setPlatform(newPlatform);
    setDescription(null);
    
    if (uploadedImage) {
      await generateDescription(uploadedImage, newPlatform, model);
    }
  };

  const handleModelChange = async (newModel: AIModel) => {
    setModel(newModel);
    setDescription(null);
    
    if (uploadedImage) {
      await generateDescription(uploadedImage, platform, newModel);
    }
  };

  const generateDescription = async (imageData: string, selectedPlatform: SocialPlatform, selectedModel: AIModel) => {
    setIsLoading(true);
    try {
      let result;
      
      if (selectedModel === 'gemini') {
        result = await generateImageDescription({
          imageData,
          platform: selectedPlatform,
          customPrompt
        });
      } else {
        result = await generateImageDescriptionWithGroq({
          imageData,
          platform: selectedPlatform,
          customPrompt
        });
      }
      
      setDescription(result);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: `Failed to generate description using ${selectedModel}. Please try again.`,
        variant: "destructive"
      });
      setDescription(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptChange = (prompt: string) => {
    setCustomPrompt(prompt);
    if (uploadedImage) {
      generateDescription(uploadedImage, platform, model);
    }
  };

  return (
    <div className="container max-w-3xl py-8 px-4 min-h-screen">
      <Header />
      
      <main>
        <ModelSelector
          selectedModel={model}
          onModelChange={handleModelChange}
          isLoading={isLoading}
        />
        
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
              onPromptChange={handlePromptChange}
            />
          </>
        )}
        
        {/* Social Card */}
        <Card className="mt-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <a 
                href="https://instagram.com/nota12sa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
              >
                <Instagram size={24} />
                <span className="text-lg">@nota12sa</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} U.R LLM - AI-powered social media description generator</p>
      </footer>
    </div>
  );
};

export default Index;
