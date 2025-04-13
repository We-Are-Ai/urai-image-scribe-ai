
// Note: In a production environment, this API key should be stored securely, not in the frontend code
const API_KEY = "AIzaSyCI9781rp3kenGrEGF0K38nWVklNbn9oWo";

export type SocialPlatform = 'twitter' | 'instagram' | 'pinterest' | 'youtube';

interface GenerateDescriptionParams {
  imageData: string;
  platform: SocialPlatform;
}

export const generateImageDescription = async ({ 
  imageData, 
  platform 
}: GenerateDescriptionParams): Promise<string> => {
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
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64ImageData
                }
              }
            ]
          }
        ],
        generation_config: {
          temperature: 0.4,
          top_p: 1,
          top_k: 32,
          max_output_tokens: 1024,
        },
        safety_settings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate description');
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate a description for this image.";
    return generatedText;
  } catch (error) {
    console.error('Error generating image description:', error);
    throw error;
  }
};
