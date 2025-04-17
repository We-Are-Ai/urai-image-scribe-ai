
import React, { useState } from 'react';
import { ArrowLeft, Globe, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from '@/components/ui/use-toast';

const WebsiteSummary = () => {
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive"
      });
      return;
    }

    if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
      setWebsiteUrl(`https://${websiteUrl}`);
    }

    setIsLoading(true);
    setSummary('');

    // Simulate API call for demo purposes
    setTimeout(() => {
      setSummary("This website is an e-commerce platform specializing in tech gadgets and accessories. The homepage features a minimalist design with a dark theme, prominently displaying new product releases and special offers. The site has a comprehensive navigation system with categories for smartphones, laptops, wearables, and smart home devices. Customer reviews are featured prominently, and the site includes a blog section with tech news and product comparisons. The checkout process is streamlined with multiple payment options and shipping methods available.");
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Website successfully summarized",
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
          <h1 className="text-2xl font-bold gradient-text">Website Summarizer</h1>
        </div>
        <ThemeToggle />
      </div>

      <main>
        <Card className="amoled-card mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="website-url" className="text-sm font-medium">
                  Website URL
                </label>
                <Input
                  id="website-url"
                  placeholder="example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
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
                    <Globe className="mr-2 h-4 w-4" />
                    Summarize Website
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

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

export default WebsiteSummary;
