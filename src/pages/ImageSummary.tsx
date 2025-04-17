
import React, { useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from '@/components/ui/use-toast';

const ImageSummary = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl && !imageFile) {
      toast({
        title: "Error",
        description: "Please provide an image URL or upload an image",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setSummary('');

    // Simulate API call for demo purposes
    setTimeout(() => {
      setSummary("This image shows a scenic mountain landscape with a clear blue sky. In the foreground, there's a lush green meadow with wildflowers. The mountains in the background are snow-capped and majestic. The lighting suggests it's taken during the golden hour, creating a warm atmosphere across the scene.");
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Image successfully summarized",
      });
    }, 2000);
  };

  return (
    <div className="container max-w-3xl py-8 px-4 min-h-screen transition-colors duration-300 amoled">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold gradient-text">Image Summarizer</h1>
        </div>
        <ThemeToggle />
      </div>

      <main>
        <Card className="amoled-card mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="image-url" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  className="bg-black/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image-upload" className="text-sm font-medium">
                  Or upload an image
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-black/50"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Summarize Image
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {imageUrl && (
          <Card className="amoled-card mb-8">
            <CardContent className="p-6 flex justify-center">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="max-h-64 object-contain rounded-md" 
              />
            </CardContent>
          </Card>
        )}

        {summary && (
          <Card className="amoled-card">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <Textarea 
                value={summary} 
                readOnly 
                className="min-h-[150px] bg-black/50 text-white" 
              />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ImageSummary;
