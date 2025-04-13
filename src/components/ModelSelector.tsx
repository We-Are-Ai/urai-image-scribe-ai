
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type AIModel = 'gemini' | 'groq';

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  isLoading: boolean;
}

const ModelSelector = ({ selectedModel, onModelChange, isLoading }: ModelSelectorProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-4">Select AI Model</h2>
      <Select 
        value={selectedModel} 
        onValueChange={(value) => onModelChange(value as AIModel)}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select AI Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gemini">Gemini</SelectItem>
          <SelectItem value="groq">Groq AI</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
