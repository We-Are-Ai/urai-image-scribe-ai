
import React, { useState } from 'react';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import PlatformSelector, { SocialPlatform } from '@/components/PlatformSelector';
import ModelSelector, { AIModel } from '@/components/ModelSelector';
import DescriptionGenerator from '@/components/DescriptionGenerator';
import ImageGenerator from '@/components/ImageGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateImageDescription } from '@/services/geminiService';
import { generateImageDescriptionWithGroq } from '@/services/groqService';
import { generateImageWithGemini, generateImageWithGroq } from '@/services/imageGenerationService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState<SocialPlatform>('twitter');
  const [model, setModel] = useState<AIModel>('gemini');
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<'description' | 'generation'>('description');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
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
    setGeneratedImageUrl(null);
    
    if (mode === 'description' && uploadedImage) {
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
          platform: selectedPlatform
        });
      } else {
        result = await generateImageDescriptionWithGroq({
          imageData,
          platform: selectedPlatform
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

  const generateImage = async (prompt: string) => {
    setIsLoading(true);
    setGeneratedImageUrl(null);
    
    try {
      let result;
      
      if (model === 'gemini') {
        result = await generateImageWithGemini(prompt);
      } else {
        result = await generateImageWithGroq(prompt);
      }
      
      setGeneratedImageUrl(result.imageUrl);
      
      toast({
        title: "Image Generated",
        description: `Successfully generated image using ${model === 'gemini' ? 'U.R LLM Pro' : 'U.R LLM BETA'}.`
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: `Failed to generate image using ${model === 'gemini' ? 'U.R LLM Pro' : 'U.R LLM BETA'}. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (value: string) => {
    setMode(value as 'description' | 'generation');
    setDescription(null);
    setGeneratedImageUrl(null);
  };

  return (
    <div className="container max-w-3xl py-8 px-4 min-h-screen">
      <Header />
      
      <main>
        <Tabs value={mode} onValueChange={handleModeChange} className="w-full mb-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="description">Image to Description</TabsTrigger>
            <TabsTrigger value="generation">Text to Image</TabsTrigger>
          </TabsList>
        </Tabs>

        <ModelSelector
          selectedModel={model}
          onModelChange={handleModelChange}
          isLoading={isLoading}
        />
        
        {mode === 'description' ? (
          <>
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
          </>
        ) : (
          <ImageGenerator 
            model={model}
            isLoading={isLoading}
            onGenerateImage={generateImage}
            generatedImageUrl={generatedImageUrl}
          />
        )}
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} U.R LLM - AI-powered social media description generator</p>
      </footer>
    </div>
  );
};

export default Index;
