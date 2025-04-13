
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { SocialPlatform } from './PlatformSelector';

interface DescriptionGeneratorProps {
  imageDescription: string | null;
  platform: SocialPlatform;
  isLoading: boolean;
}

const DescriptionGenerator = ({ imageDescription, platform, isLoading }: DescriptionGeneratorProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

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

  const platformTitle = {
    twitter: "Twitter Description",
    instagram: "Instagram Caption",
    pinterest: "Pinterest Description",
    youtube: "YouTube Description"
  };

  return (
    <Card className="mt-6 border border-border">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
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
