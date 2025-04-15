
import React from 'react';
import { Twitter } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 mb-8">
      <div className="flex items-center justify-center gap-4">
        <img 
          src="/lovable-uploads/b7cbe059-cd3a-4288-ab61-b6dbf9719bfc.png" 
          alt="U.R LLM Logo" 
          className="w-16 h-16"
        />
        <h1 className="text-4xl font-bold text-white font-manrope">U.R LLM</h1>
      </div>
      <p className="mt-2 text-center text-muted-foreground">
        Generate optimized social media descriptions from your images
      </p>
      <a 
        href="https://twitter.com/SwitchToMonk" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors"
      >
        <Twitter className="w-4 h-4" />
        <span>@SwitchToMonk</span>
      </a>
    </header>
  );
};

export default Header;
