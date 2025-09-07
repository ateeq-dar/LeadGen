import { GoogleGenAI, Type } from "@google/genai";
import type { Lead } from '../types';

// Lazily initialize the AI client to prevent the app from crashing on load
// if the API key environment variable is not set.
let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
    if (!ai) {
        // The API key is expected to be available in the environment.
        // This will throw an error if the API key is not set, but it will
        // happen during form submission instead of on app load.
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};


const leadsSchema = {
    type: Type.OBJECT,
    properties: {
        leads: {
            type: Type.ARRAY,
            description: "A list of potential Instagram leads.",
            items: {
                type: Type.OBJECT,
                properties: {
                    username: {
                        type: Type.STRING,
                        description: "A creative and realistic Instagram username for the lead. Should not include the '@' symbol."
                    },
                    profileDescription: {
                        type: Type.STRING,
                        description: "A brief, realistic bio or profile description for this user."
                    },
                    reasoning: {
                        type: Type.STRING,
                        description: "A short, compelling reason why this profile is a good lead based on the user's criteria."
                    }
                },
                required: ["username", "profileDescription", "reasoning"]
            }
        }
    },
    required: ["leads"]
};

export const generateLeads = async (lookingFor: string, location: string): Promise<Lead[]> => {
  const prompt = `
    Act as an expert lead generation specialist for Instagram.
    Based on the following criteria, generate a list of 5 diverse and high-quality potential user profiles that would be excellent leads.

    Criteria:
    - Looking for: "${lookingFor}"
    - Location: "${location}"

    For each lead, provide a potential username, a brief but realistic profile description, and a short reason why they are a good match.
    The response must be in a JSON format.
  `;

  try {
    const geminiClient = getAiClient();
    const response = await geminiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: leadsSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });
    
    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);

    if (parsed && parsed.leads && Array.isArray(parsed.leads)) {
      return parsed.leads;
    } else {
      console.error("Unexpected JSON structure:", parsed);
      throw new Error("Failed to parse leads from AI response.");
    }

  } catch (error) {
    console.error("Error generating leads from Gemini API:", error);
    // Provide a more helpful error message for the missing API key case.
    if (error instanceof Error && error.message.includes("API Key")) {
        throw new Error("The AI service is currently unavailable. Please try again later.");
    }
    // Re-throw the error to be handled by the calling component
    throw new Error("The AI service failed to generate leads.");
  }
};