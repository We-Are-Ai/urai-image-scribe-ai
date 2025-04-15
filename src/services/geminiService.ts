
// Note: In a production environment, this API key should be stored securely, not in the frontend code
const API_KEY = "AIzaSyCI9781rp3kenGrEGF0K38nWVklNbn9oWo";

export type SocialPlatform = 'twitter' | 'instagram' | 'pinterest' | 'youtube' | 'threads' | 'snapchat';

interface GenerateDescriptionParams {
  imageData: string;
  platform: SocialPlatform;
  customPrompt?: string;
}

export const generateImageDescription = async ({ 
  imageData, 
  platform,
  customPrompt
}: GenerateDescriptionParams): Promise<string> => {
  const base64ImageData = imageData.split(',')[1];
  
  const platformPromptMap = {
    twitter: "Generate a compelling Twitter post description with relevant hashtags for this image. Keep it within 280 characters. Make it engaging, optimize for engagement, and include 3-5 relevant hashtags.",
    instagram: "Create an engaging Instagram caption for this image. Include relevant emojis and 8-10 hashtags at the end. Make it visually appealing with some paragraph breaks.",
    pinterest: "Write a SEO-optimized Pinterest description for this image. Include relevant keywords and 4-6 hashtags. Focus on making it discoverable in Pinterest search.",
    youtube: "Generate a YouTube video description for this thumbnail image. Include relevant keywords, a short engaging summary, and 3-5 hashtags. Make it SEO friendly.",
    threads: "Create a casual, conversational Threads post about this image. Keep it authentic and engaging, include 2-3 relevant hashtags. Focus on starting discussions.",
    snapchat: "Write a fun, informal Snapchat caption for this image. Keep it short, playful, and include 1-2 trending hashtags or a catchy phrase. Make it appeal to the Snapchat audience."
  };
  
  let prompt = platformPromptMap[platform];
  
  if (customPrompt) {
    prompt = `${prompt} Consider the following additional context: ${customPrompt}`;
  }

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
