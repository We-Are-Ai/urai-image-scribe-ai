
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 mb-8">
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold gradient-text">URAI</h1>
      </div>
      <p className="mt-2 text-center text-muted-foreground">
        Generate optimized social media descriptions from your images
      </p>
    </header>
  );
};

export default Header;
