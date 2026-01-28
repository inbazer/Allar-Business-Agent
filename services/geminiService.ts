
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are ALLAR AI, a professional AI assistant built for speed and clarity.
Your role is to help users make better business decisions and assist with fundraising efforts.

GUIDELINES:
- Give practical, actionable answers.
- Be concise, structured, and confident.
- Do not hallucinate or guess. If data is missing, say so clearly.
- Prefer bullet points and step-by-step instructions.
- Think and communicate like a high-level business consultant, not a chatbot.
- Tone: Premium, Calm, Direct, and User-Friendly.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async *streamChat(history: { role: string; parts: string }[], message: string) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 800,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.parts }]
      }))
    });

    const result = await chat.sendMessageStream({ message });
    
    for await (const chunk of result) {
      const response = chunk as GenerateContentResponse;
      yield response.text;
    }
  }
}

export const gemini = new GeminiService();
