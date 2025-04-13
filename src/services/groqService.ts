
import { SocialPlatform } from "@/components/PlatformSelector";

// Note: In a production environment, this API key should be stored securely
const GROQ_API_KEY = "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";

interface GenerateDescriptionParams {
  imageData: string;
  platform: SocialPlatform;
}

export const generateImageDescriptionWithGroq = async (
  params: GenerateDescriptionParams
): Promise<string> => {
  const { imageData, platform } = params;
  
  // Extract base64 data from the data URL
  const base64ImageData = imageData.split(',')[1];
  
  // Create prompt based on the platform
  const platformPromptMap = {
    twitter: "Generate a compelling Twitter post description with relevant hashtags for this image. Keep it within 280 characters. Make it engaging, optimize for engagement, and include 3-5 relevant hashtags.",
    instagram: "Create an engaging Instagram caption for this image. Include relevant emojis and 8-10 hashtags at the end. Make it visually appealing with some paragraph breaks.",
    pinterest: "Write a SEO-optimized Pinterest description for this image. Include relevant keywords and 4-6 hashtags. Focus on making it discoverable in Pinterest search.",
    youtube: "Generate a YouTube video description for this thumbnail image. Include relevant keywords, a short engaging summary, and 3-5 hashtags. Make it SEO friendly."
  };
  
  const prompt = platformPromptMap[platform];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a social media expert who creates optimized descriptions based on images. Analyze the image provided and generate relevant, engaging content."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 500
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate description with Groq');
    }

    const generatedText = data.choices?.[0]?.message?.content || "Could not generate a description for this image.";
    return generatedText;
  } catch (error) {
    console.error('Error generating image description with Groq:', error);
    throw error;
  }
};
