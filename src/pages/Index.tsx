
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import PlatformSelector, { SocialPlatform } from '@/components/PlatformSelector';
import ModelSelector, { AIModel } from '@/components/ModelSelector';
import DescriptionGenerator from '@/components/DescriptionGenerator';
import { generateImageDescription } from '@/services/geminiService';
import { generateImageDescriptionWithGroq } from '@/services/groqService';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Twitter, Link2, Image, Globe, Youtube } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

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
    <div className="container max-w-3xl py-8 px-4 min-h-screen transition-colors duration-300 amoled">
      <div className="flex justify-between items-center mb-8">
        <Header />
        <ThemeToggle />
      </div>
      
      <main>
        <Card className="amoled-card mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6 gradient-text">Content Summarizer Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/image-summary">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/20">
                  <Image size={24} />
                  <span>Image Summarizer</span>
                </Button>
              </Link>
              
              <Link to="/website-summary">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/20">
                  <Globe size={24} />
                  <span>Website Summarizer</span>
                </Button>
              </Link>
              
              <Link to="/video-summary">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/20">
                  <Youtube size={24} />
                  <span>Video Summarizer</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
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
        
        {/* Social Links */}
        <Card className="mt-10 amoled-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <a 
                href="https://instagram.com/switchtomonk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
              >
                <Instagram size={24} />
                <span className="text-lg">@switchtomonk</span>
              </a>
              
              <a 
                href="https://pinterest.com/switchtomonk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span className="text-lg">@switchtomonk</span>
              </a>
              
              <a 
                href="https://threads.net/@switchtomonk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
              >
                <Link2 size={24} />
                <span className="text-lg">@switchtomonk</span>
              </a>
              
              <a 
                href="https://twitter.com/SwitchToMonk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
              >
                <Twitter size={24} />
                <span className="text-lg">@SwitchToMonk</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} U.R LLM - AI-powered content summarizer</p>
      </footer>
    </div>
  );
};

export default Index;
