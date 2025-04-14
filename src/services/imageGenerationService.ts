
// For demonstration purposes only - in a real app, these would be API calls to image generation services

export interface ImageGenerationResponse {
  imageUrl: string;
}

// Demo image URLs categorized by themes for better simulation
const demoImageCategories = {
  nature: [
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809", // Aurora
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", // Forest
    "https://images.unsplash.com/photo-1501854140801-50d01698950b"  // Mountains
  ],
  abstract: [
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea", // Abstract light
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1", // Colorful abstract
    "https://images.unsplash.com/photo-1574169208507-84376144848b"  // Abstract art
  ],
  technology: [
    "https://images.unsplash.com/photo-1682686581221-c129e7636df8", // Tech workspace
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f", // VR headset
    "https://images.unsplash.com/photo-1518770660439-4636190af475"  // Tech gadgets
  ]
};

// Helper function to select a category based on prompt keywords
const selectCategory = (prompt: string): string[] => {
  prompt = prompt.toLowerCase();
  
  if (prompt.includes('nature') || prompt.includes('landscape') || 
      prompt.includes('mountain') || prompt.includes('forest') ||
      prompt.includes('sky') || prompt.includes('water')) {
    return demoImageCategories.nature;
  } else if (prompt.includes('tech') || prompt.includes('computer') || 
             prompt.includes('digital') || prompt.includes('future') ||
             prompt.includes('robot') || prompt.includes('ai')) {
    return demoImageCategories.technology;
  } else {
    return demoImageCategories.abstract;
  }
};

export const generateImageWithGemini = async (prompt: string): Promise<ImageGenerationResponse> => {
  // This would be replaced with an actual API call in production
  // For now, simulate a delay and select an image based on the prompt keywords
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const categoryImages = selectCategory(prompt);
  return {
    imageUrl: categoryImages[Math.floor(Math.random() * categoryImages.length)]
  };
};

export const generateImageWithGroq = async (prompt: string): Promise<ImageGenerationResponse> => {
  // This would be replaced with an actual API call in production
  // For now, simulate a delay and select an image based on the prompt keywords
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const categoryImages = selectCategory(prompt);
  return {
    imageUrl: categoryImages[Math.floor(Math.random() * categoryImages.length)]
  };
};
