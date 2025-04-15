import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { SocialPlatform } from './PlatformSelector';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DescriptionGeneratorProps {
  imageDescription: string | null;
  platform: SocialPlatform;
  isLoading: boolean;
  onPromptChange?: (prompt: string) => void;
}

const DescriptionGenerator = ({ 
  imageDescription, 
  platform, 
  isLoading,
  onPromptChange 
}: DescriptionGeneratorProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [customPrompt, setCustomPrompt] = React.useState('');

  const copyToClipboard = () => {
    if (!imageDescription) return;
    
    navigator.clipboard.writeText(imageDescription);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The description has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(e.target.value);
    onPromptChange?.(e.target.value);
  };

  const platformTitle = {
    twitter: "Twitter Description",
    instagram: "Instagram Caption",
    pinterest: "Pinterest Description",
    youtube: "YouTube Description",
    threads: "Threads Post",
    snapchat: "Snapchat Caption"
  };

  return (
    <Card className="mt-6 border border-border">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">{platformTitle[platform]}</h3>
          {imageDescription && (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={copyToClipboard}
              disabled={isLoading}
            >
              {copied ? (
                <><Check className="h-4 w-4 mr-2" /> Copied</>
              ) : (
                <><Copy className="h-4 w-4 mr-2" /> Copy</>
              )}
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="custom-prompt"
            checked={showPrompt}
            onCheckedChange={setShowPrompt}
          />
          <Label htmlFor="custom-prompt">Add custom prompt for better results</Label>
        </div>

        {showPrompt && (
          <div className="space-y-2">
            <Label htmlFor="prompt-input">Additional Context</Label>
            <Textarea
              id="prompt-input"
              placeholder="Add specific details or context to help generate a better description..."
              value={customPrompt}
              onChange={handlePromptChange}
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>
        )}

        <div className="min-h-[200px] rounded-md bg-muted p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing image and generating description...</p>
            </div>
          ) : imageDescription ? (
            <div className="whitespace-pre-wrap">{imageDescription}</div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>Upload an image to generate a description</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionGenerator;
