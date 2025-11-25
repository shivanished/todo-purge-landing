import { GoogleGenAI, Type } from "@google/genai";
import { LinearTicket } from "../types";
import { GEMINI_MODEL } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTicketFromCode = async (
  fileContent: string,
  fileName: string,
  lineNumber: number
): Promise<Partial<LinearTicket>> => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `
        You are a Senior Technical Product Manager at a high-growth tech startup.
        Your goal is to convert a technical TODO or FIXME comment from the codebase into a high-quality Linear ticket.

        Context:
        File: ${fileName}:${lineNumber}
        Code:
        ${fileContent}

        Instructions:
        1. Extract the core problem described in the TODO/FIXME.
        2. Create a concise, action-oriented title (e.g., "Fix race condition in X", "Refactor Y for performance").
        3. Write a professional description in Markdown format. Explain *why* this is an issue and *how* to fix it based on the code context.
        4. Assess priority: 'Urgent' for security/crashes, 'High' for functionality bugs, 'Medium' for tech debt, 'Low' for nitpicks.
        5. Suggest relevant labels (e.g., "Bug", "Refactor", "Security", "Performance").
        6. Infer the Team name if possible (default to "Engineering").
        
        Return JSON matching the schema.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ['No Priority', 'Low', 'Medium', 'High', 'Urgent'] },
            labels: { type: Type.ARRAY, items: { type: Type.STRING } },
            team: { type: Type.STRING },
            status: { type: Type.STRING, enum: ['Backlog', 'Todo', 'In Progress', 'Done'] }
          },
          required: ["title", "description", "priority", "labels", "team", "status"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as Partial<LinearTicket>;
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback if AI fails
    return {
      title: "Refactor code",
      description: "Address the TODO comment in " + fileName,
      priority: "Medium",
      labels: ["Refactor"],
      team: "Engineering",
      status: "Todo"
    };
  }
};
