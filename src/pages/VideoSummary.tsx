
import React, { useState } from 'react';
import { ArrowLeft, Youtube, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from '@/components/ui/use-toast';

const VideoSummary = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl) {
      toast({
        title: "Error",
        description: "Please enter a YouTube video URL",
        variant: "destructive"
      });
      return;
    }

    const extractedId = extractYoutubeId(videoUrl);
    if (!extractedId) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL",
        variant: "destructive"
      });
      return;
    }

    setVideoId(extractedId);
    setIsLoading(true);
    setSummary('');

    // Simulate API call for demo purposes
    setTimeout(() => {
      setSummary("This video is a comprehensive tutorial on modern web development with React and TypeScript. The presenter starts by explaining the benefits of TypeScript in large React applications, then demonstrates setting up a new project with Vite. Key topics covered include component structure, state management with hooks, styling with Tailwind CSS, and handling API calls. The tutorial also covers best practices for error handling, performance optimization, and testing. The presenter provides practical examples and real-world use cases throughout the 25-minute video, making it suitable for intermediate developers looking to enhance their skills.");
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Video successfully summarized",
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
          <h1 className="text-2xl font-bold gradient-text">YouTube Video Summarizer</h1>
        </div>
        <ThemeToggle />
      </div>

      <main>
        <Card className="amoled-card mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="video-url" className="text-sm font-medium">
                  YouTube Video URL
                </label>
                <Input
                  id="video-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
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
                    <Youtube className="mr-2 h-4 w-4" />
                    Summarize Video
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {videoId && (
          <Card className="amoled-card mb-8">
            <CardContent className="p-6">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
              </div>
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

export default VideoSummary;
