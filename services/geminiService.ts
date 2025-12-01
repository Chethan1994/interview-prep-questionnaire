import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Question } from "../types";

// Ensure API Key is present
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-types' });

export const generateInterviewQuestions = async (
  role: string,
  topic: string,
  difficulty: Difficulty,
  count: number
): Promise<Question[]> => {
  if (!apiKey) throw new Error("API Key not found");

  const topicPhrase = topic && topic.trim().length > 0 
    ? `focusing specifically on ${topic}` 
    : `focusing on core competencies`;

  // Updated prompt to ask for CRISP answers and EXAMPLES
  const prompt = `Generate ${count} ${difficulty} level interview questions for a ${role} position ${topicPhrase}. 
  The questions should be practical and commonly asked.
  For each question:
  1. Provide a VERY concise direct 'answer' (1-2 sentences max).
  2. Provide a 'example' which is a short, simple code snippet or concrete example illustrating the concept.
  
  Optimize for rapid learning/studying.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Unique ID" },
              text: { type: Type.STRING, description: "The question" },
              hint: { type: Type.STRING, description: "A short hint" },
              topic: { type: Type.STRING, description: "Sub-topic (e.g. Hooks, CSS Grid)" },
              answer: { type: Type.STRING, description: "Direct, concise answer." },
              example: { type: Type.STRING, description: "Simple code example or usage syntax." }
            },
            required: ["id", "text", "hint", "topic", "answer", "example"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Question[];
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Gemini Generate Error:", error);
    throw new Error("Failed to generate questions. Please try again.");
  }
};

// Re-export evaluateAnswer to keep imports valid
export const evaluateAnswer = async () => {
    return {};
};