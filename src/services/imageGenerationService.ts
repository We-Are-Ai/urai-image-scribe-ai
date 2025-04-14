
// For demonstration purposes only - in a real app, these would be API calls to image generation services

export interface ImageGenerationResponse {
  imageUrl: string;
}

// Example image URLs for demonstration
const demoImageUrls = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
  "https://images.unsplash.com/photo-1682686581221-c129e7636df8"
];

export const generateImageWithGemini = async (prompt: string): Promise<ImageGenerationResponse> => {
  // This would be replaced with an actual API call in production
  // For now, simulate a delay and return a random demo image
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    imageUrl: demoImageUrls[Math.floor(Math.random() * demoImageUrls.length)]
  };
};

export const generateImageWithGroq = async (prompt: string): Promise<ImageGenerationResponse> => {
  // This would be replaced with an actual API call in production
  // For now, simulate a delay and return a random demo image
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    imageUrl: demoImageUrls[Math.floor(Math.random() * demoImageUrls.length)]
  };
};
