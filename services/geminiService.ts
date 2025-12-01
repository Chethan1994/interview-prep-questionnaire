import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Question, Evaluation } from "../types";

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
    ? `focusing on ${topic}` 
    : `focusing on core competencies and standard interview questions for this role`;

  const prompt = `Generate ${count} ${difficulty} level interview questions for a ${role} position ${topicPhrase}. 
  The questions should be challenging but clear. 
  Include a short hint for each question.`;

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
              id: { type: Type.STRING, description: "A unique identifier for the question (e.g., q1, q2)" },
              text: { type: Type.STRING, description: "The interview question text" },
              hint: { type: Type.STRING, description: "A subtle hint to help the candidate" },
              topic: { type: Type.STRING, description: "The specific sub-topic of this question" }
            },
            required: ["id", "text", "hint", "topic"]
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

export const evaluateAnswer = async (
  question: Question,
  userAnswer: string,
  role: string,
  difficulty: Difficulty
): Promise<Evaluation> => {
  if (!apiKey) throw new Error("API Key not found");

  const contextPrompt = question.modelAnswer 
    ? `The specific technical correct answer is: "${question.modelAnswer}". Use this as the definitive reference.` 
    : `Generate an ideal answer based on your knowledge.`;

  const prompt = `You are an expert interviewer interviewing a ${difficulty} ${role}.
  Question: "${question.text}"
  Candidate Answer: "${userAnswer}"
  
  ${contextPrompt}
  
  Evaluate the answer. strictness based on level: ${difficulty}.
  Provide a score from 1-10.
  Provide constructive feedback (what was good, what was missing).
  Provide a brief ideal answer summary (if a reference was provided, paraphrase it for clarity).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Score from 1 to 10" },
            feedback: { type: Type.STRING, description: "Constructive feedback on the answer" },
            idealAnswer: { type: Type.STRING, description: "A concise version of the ideal answer" }
          },
          required: ["score", "feedback", "idealAnswer"]
        }
      }
    });

    if (response.text) {
      const result = JSON.parse(response.text);
      return {
        questionId: question.id,
        userAnswer,
        score: result.score,
        feedback: result.feedback,
        idealAnswer: result.idealAnswer
      };
    }
    throw new Error("No evaluation generated");

  } catch (error) {
    console.error("Gemini Evaluate Error:", error);
    throw new Error("Failed to evaluate answer.");
  }
};