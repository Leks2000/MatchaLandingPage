import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization of Gemini client to prevent crash if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Using mock data fallback on server.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API core endpoint: generate quirky user vibe signatures
  app.post("/api/profile-vibe", async (req, res) => {
    const { name, age, role, tags } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: "Name and role are required." });
    }

    const tagsList = Array.isArray(tags) ? tags.join(", ") : "general creative";
    const prompt = `Generate exactly 3 funny, modern, witty, and highly relatable profile bullet points ("vibe facts") for a young professional/builder networking app (it's called Matcha, for matching on a "vibe" frequency). 
Keep them in English, short (under 75 characters each), and quirky. Match them to the person's profile:
- Name: ${name}
- Age: ${age || 'dynamic'}
- Role: ${role}
- Selected Interests/Tags: ${tagsList}

Examples of styles:
1. "always ready for spontaneous matchas in local hubs"
2. "regularly stays up until 3AM exploring obscure technologies"
3. "never replies to texts in under 12 hours unless it's a launch emergency"
4. "convinced that the perfect cup of coffee is a compiler optimizer"
5. "spent 48 hours tweaking a button border radius instead of sleeping"

Return the 3 facts in a structured JSON response with a single key 'vibeFacts' which is a list of exactly 3 strings. Avoid uppercase letters or overly formal language. Keep the vibe casual, self-ironic, and hipster-tech.`;

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Fallback mock vibe facts if API key is not configured or placeholder
        const fallbackFacts = [
          `always ready for spontaneous matchas in local hubs`,
          `regularly stays up until 3AM exploring obscure tech`,
          `convinced that ${role === "Студент" ? "college is a side quest" : "debugging is visual meditation"}`
        ];
        return res.json({ vibeFacts: fallbackFacts, fallback: true });
      }

      const client = getGeminiClient();
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              vibeFacts: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "Array of exactly three user vibe facts.",
              },
            },
            required: ["vibeFacts"],
          },
        },
      });

      const jsonText = response.text ? response.text.trim() : "";
      const parsed = JSON.parse(jsonText);
      
      const vibeFacts = parsed.vibeFacts || [];
      // Ensure we have exactly 3
      if (vibeFacts.length < 3) {
        throw new Error("Generated less than 3 facts.");
      }
      res.json({ vibeFacts: vibeFacts.slice(0, 3) });

    } catch (err: any) {
      console.error("Gemini API error in /api/profile-vibe:", err);
      // Clean fallback
      const fallbackFacts = [
        `always ready for spontaneous matchas in local hubs`,
        `spent 48 hours tweaking a button border radius instead of sleeping`,
        `never replies to texts in under 12 hours unless vital`
      ];
      res.json({ vibeFacts: fallbackFacts, error: err.message, fallback: true });
    }
  });

  // Vite middleware setup
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
    console.log(`Matcha server running on port ${PORT}`);
  });
}

startServer();
