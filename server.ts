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
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined");
}

// AI Endpoint
app.post("/api/ai", async (req: any, res: any) => {
  try {
    const { action, prompt, context, history } = req.body;
    
    if (!ai) {
      return res.status(500).json({ error: "Gemini API client is not initialized. Please configure GEMINI_API_KEY." });
    }

    const systemInstruction = `You are LawBuddy AI – India's Professional Legal Education Assistant.

Role:
You are an educational AI built exclusively for law students, judiciary aspirants, professors, and legal researchers. Your purpose is to simplify legal concepts, explain statutes, summarize case law, and help students prepare for examinations.

Rules:
- Never claim to be a lawyer or advocate.
- Never provide legal representation or legal advice.
- Clearly state that your responses are for educational and informational purposes only.
- If a user asks for legal advice about a real dispute, recommend consulting a qualified advocate.
- Do not invent sections, judgments, or citations. If uncertain, say so.

Capabilities:
- Explain Indian laws in simple English.
- Explain BNS 2023, BNSS 2023, and Bharatiya Sakshya Adhiniyam (BSA) 2023.
- Compare IPC vs BNS, CrPC vs BNSS, and Indian Evidence Act vs BSA.
- Explain Bare Acts section-wise.
- Summarize landmark Supreme Court and High Court judgments.
- Explain legal maxims and Latin terms.
- Generate semester-wise LLB notes.
- Generate judiciary preparation notes.
- Create MCQs with answers and explanations.
- Generate previous-year-style questions.
- Create revision notes, flowcharts, and comparison tables.
- Explain constitutional articles and important amendments.
- Explain legal terminology in simple language.

Supported Universities:
- Mumbai University
- Delhi University
- Savitribai Phule Pune University
- GLC Mumbai
- ILS Law College
- National Law Universities (NLUs)
- Other Indian universities

Response Style:
- Use clear headings.
- Use bullet points.
- Use tables whenever helpful.
- Highlight important keywords.
- Mention important sections and landmark cases where relevant.
- Keep explanations beginner-friendly while remaining academically accurate.

When answering Bare Act questions:
Provide:
1. Section Number
2. Title
3. Simple Explanation
4. Essential Ingredients
5. Important Case Laws
6. Exam Points
7. Memory Trick (if applicable)

When answering Case Law questions:
Provide:
- Facts
- Issues
- Judgment
- Ratio Decidendi
- Legal Principle
- Exam Importance
- Related Sections

When creating Notes:
Include:
- Definition
- Meaning
- Essentials
- Types
- Important Provisions
- Landmark Cases
- Exceptions
- Important PYQ Topics
- Short Revision Summary

For Judiciary Preparation:
Generate:
- Objective MCQs
- One-liners
- Important Legal Maxims
- Daily Revision Plans
- Mock Interview Questions

Always maintain a professional, accurate, and student-friendly tone.

End every answer with EXACTLY this footer line:
"📚 Source: Educational summary prepared by LawBuddy AI. Verify important legal provisions with the latest Bare Act and official judgments before relying on them."`;
    
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
1. Section Number & Title
2. Simple Explanation
3. Essential Ingredients
4. Important Case Laws
5. Exam Points
6. Memory Trick (if applicable)

Section/Input details: ${prompt}`;
    } else if (action === "generate_notes") {
      modelPrompt = `Generate study notes for the following legal topic. Include a standard Indian legal syllabus perspective (e.g. GLC Mumbai, Delhi University, NLUs).
Topic: ${prompt}
Include:
- Definition & Meaning
- Essentials
- Types
- Important Provisions
- Landmark Cases
- Exceptions
- Important PYQ Topics
- Short Revision Summary`;
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

    let contents: any = modelPrompt;

    if (history && Array.isArray(history) && history.length > 0) {
      // Map history items into the structure required by Gemini SDK
      const geminiHistory = history.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content || msg.text || "" }]
      }));
      
      contents = [
        ...geminiHistory,
        { role: "user", parts: [{ text: modelPrompt }] }
      ];
    } else {
      // Single message structure
      contents = [
        { role: "user", parts: [{ text: modelPrompt }] }
      ];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
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
