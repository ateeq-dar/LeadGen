import type { Lead } from '../types';

// A predefined list of mock leads to be used for demonstration purposes.
// This replaces the live call to the Gemini API.
const mockLeads: Lead[] = [
    {
      username: "wanderlust_jane",
      profileDescription: "Digital nomad exploring the world one city at a time. Coffee lover. 📍Currently in Lisbon.",
      reasoning: "Matches location criteria and has a profile focused on travel, aligning with the user's search."
    },
    {
      username: "techie_tom_dev",
      profileDescription: "Software Engineer passionate about AI and building cool stuff. Cat dad.",
      reasoning: "Strong technology focus, likely interested in new software and tech-related products."
    },
    {
      username: "foodie_sarah_sf",
      profileDescription: "Bay Area food blogger on a mission to find the best tacos. 🌮 Follow my culinary adventures!",
      reasoning: "Perfect for food/restaurant promotions in the specified location."
    },
    {
      username: "fit_freddy_coach",
      profileDescription: "Fitness coach & personal trainer. Helping you become the best version of yourself. DM for plans.",
      reasoning: "Directly aligns with health and fitness-related searches, clearly a professional in the space."
    },
    {
      username: "artisan_ally_creates",
      profileDescription: "Creator of handmade pottery & ceramics. ✨ Each piece tells a story. Shop link in bio!",
      reasoning: "Ideal for collaborations with brands targeting artists, crafters, and small business owners."
    }
];

/**
 * Simulates generating leads without calling an external API.
 * This function returns a hardcoded list of leads after a brief delay
 * to mimic a real network request.
 * @param lookingFor - The type of user being searched for (ignored in this mock).
 * @param location - The location for the search (ignored in this mock).
 * @returns A promise that resolves to an array of Lead objects.
 */
export const generateLeads = async (lookingFor: string, location: string): Promise<Lead[]> => {
  console.log(`Simulating lead generation for: "${lookingFor}" in "${location}"`);

  // Simulate network delay to make the loading animation visible.
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return the mock leads.
  return mockLeads;
};
