
import React from 'react';

const Header = () => {
  return (
    <header className="py-6 mb-8">
      <div className="flex items-center justify-center gap-3">
        <img 
          src="/lovable-uploads/b7cbe059-cd3a-4288-ab61-b6dbf9719bfc.png" 
          alt="U.R LLM Logo" 
          className="w-10 h-10"
        />
        <h1 className="text-4xl font-bold text-white">U.R LLM</h1>
      </div>
      <p className="mt-2 text-center text-muted-foreground">
        Generate optimized social media descriptions from your images
      </p>
    </header>
  );
};

export default Header;
