
import React from 'react';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type SocialPlatform = 'twitter' | 'instagram' | 'pinterest' | 'youtube';

interface PlatformSelectorProps {
  selectedPlatform: SocialPlatform;
  onPlatformChange: (platform: SocialPlatform) => void;
  isLoading: boolean;
}

const PlatformSelector = ({ selectedPlatform, onPlatformChange, isLoading }: PlatformSelectorProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">Select Platform</h2>
      <Tabs 
        value={selectedPlatform} 
        onValueChange={(value) => onPlatformChange(value as SocialPlatform)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="twitter" disabled={isLoading} className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            <span className="hidden sm:inline">Twitter</span>
          </TabsTrigger>
          <TabsTrigger value="instagram" disabled={isLoading} className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">Instagram</span>
          </TabsTrigger>
          <TabsTrigger value="pinterest" disabled={isLoading} className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span className="hidden sm:inline">Pinterest</span>
          </TabsTrigger>
          <TabsTrigger value="youtube" disabled={isLoading} className="flex items-center gap-2">
            <Youtube className="h-4 w-4" />
            <span className="hidden sm:inline">YouTube</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PlatformSelector;
