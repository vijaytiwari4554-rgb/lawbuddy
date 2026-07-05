import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined");
}

// AI Endpoint
app.post("/api/ai", async (req: any, res: any) => {
  try {
    const { action, prompt, context } = req.body;
    
    if (!ai) {
      return res.status(500).json({ error: "Gemini API client is not initialized. Please configure GEMINI_API_KEY." });
    }

    const systemInstruction = "You are LawBuddy AI, an expert legal educational assistant for India. Your goal is to explain concepts clearly, summarize case laws accurately with legal analysis, explain bare acts thoroughly, generate LLB notes following standard Indian legal curricula (Mumbai, Delhi, National Law Universities), create MCQs for Judiciary exam preparation, and explain complex legal terms in simpler terms.";
    
    let modelPrompt = prompt;

    if (action === "summarize") {
      modelPrompt = `Provide a comprehensive summary for the following case law.
Case details/Context: ${context || ""}
Provide details in structured format:
1. Facts of the case
2. Key Legal Issues involved
3. Arguments of both Appellant and Respondent
4. Final Judgment (Decision of the court)
5. Ratio Decidendi (legal principle established)
6. Significance and impact of the judgment

Input prompt: ${prompt}`;
    } else if (action === "explain_act") {
      modelPrompt = `Explain the following Bare Act section/chapter in a clear, comprehensive, and student-friendly manner.
Act/Context: ${context || ""}
Provide:
1. Key definition/terms
2. Plain language breakdown of the legal provisions
3. Practical illustrations/examples
4. Key judicial interpretations or landmark cases if any.

Section/Input details: ${prompt}`;
    } else if (action === "generate_notes") {
      modelPrompt = `Generate study notes for the following legal topic. Include a standard Indian legal syllabus perspective (e.g. GLC Mumbai, Delhi University, NLUs).
Topic: ${prompt}
Include:
1. Introduction & Historical background
2. Core concepts & statutory provisions (BNS, Constitution, Contract Act, etc.)
3. Landmark judicial precedents with facts & ratio
4. Detailed analysis/criticisms
5. Typical examination questions.`;
    } else if (action === "create_mcqs") {
      modelPrompt = `Generate a set of 5 highly relevant multiple-choice questions (MCQs) for the Indian Judiciary Exams (PCS-J) on the following topic/statute: ${prompt}.
For each question, provide:
- The question text
- 4 options (A, B, C, D)
- The correct option
- A comprehensive explanation citing relevant sections of Bare Acts or case laws.`;
    } else if (action === "explain_term") {
      modelPrompt = `Explain the following legal term/maxim in English, noting its origin, meaning in plain English, application in Indian courts, and standard context: ${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: modelPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const resultText = response.text || "No response received from LawBuddy AI.";
    res.json({ response: resultText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with LawBuddy AI" });
  }
});

// Vite server / Static asset middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
