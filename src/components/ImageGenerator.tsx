
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Image as ImageIcon, Download, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageGeneratorProps {
  model: 'gemini' | 'groq';
  isLoading: boolean;
  onGenerateImage: (prompt: string) => Promise<void>;
  generatedImageUrl: string | null;
}

const ImageGenerator = ({ 
  model, 
  isLoading, 
  onGenerateImage,
  generatedImageUrl 
}: ImageGeneratorProps) => {
  const [textPrompt, setTextPrompt] = useState<string>('');
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!textPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a text prompt to generate an image",
        variant: "destructive"
      });
      return;
    }

    try {
      await onGenerateImage(textPrompt);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleDownload = () => {
    if (!generatedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `ur-llm-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Image downloaded",
      description: "Your generated image has been downloaded"
    });
  };

  return (
    <Card className="mt-6 border border-border">
      <CardContent className="pt-6">
        <h2 className="text-xl font-medium mb-4">Generate Image from Text</h2>
        
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {model === 'gemini' ? 
              "Using Gemini API for image generation. Results may vary based on the prompt complexity." :
              "This is a demo using pre-selected images from categories based on keywords in your prompt."}
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <Textarea 
            placeholder={`Describe the image you want to generate with ${model === 'gemini' ? 'U.R LLM Pro' : 'U.R LLM BETA'}...`}
            className="min-h-[100px] resize-none"
            value={textPrompt}
            onChange={(e) => setTextPrompt(e.target.value)}
            disabled={isLoading}
          />
          
          <Button 
            onClick={handleGenerateImage}
            disabled={isLoading || !textPrompt.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating image...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
          
          {generatedImageUrl && (
            <div className="mt-4 space-y-4">
              <div className="relative">
                <img 
                  src={generatedImageUrl} 
                  alt="Generated image" 
                  className="w-full h-auto rounded-md"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGenerator;
