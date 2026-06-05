import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Virtual Curves Stylist
  app.post("/api/stylist", async (req, res) => {
    try {
      const { prompt, chatHistory, preferences } = req.body;

      // Check if API key is configured
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
        return res.json({
          text: "### Welcome to your Virtual Curves Stylist!\n\n*(Note: Accessing personalized AI stylist matches requires a `GEMINI_API_KEY`. You can set this in the Secrets panel in AI Studio!)*\n\nHere is a luxury curation to get you started:\n- **Accentuate Your Waist**: A mid-waist tailoring is timeless. Pair a structured blazer with a draped wrap skirt to bring definition.\n- **Luxury Highlights**: Bring life to corporate casuals with touches of Luxury Gold accessories and our signature Primary Glam Pink coats.\n- **V-Necks & Wrap Designs**: These elongate your silhouette, perfect for corporate and evening fashion alike.\n\n*Tell me more about your occasion and body shape, and once your key is connected, we will design custom outfit pairings!*"
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are an elite, high-end Virtual Fashion Stylist for the brand "CLASSY GLAM CLOSET" (Fashion That Celebrates Every Curve).
Your persona is incredibly supportive, body-positive, elegant, highly sophisticated, and warm. You speak like a senior luxury fashion concierge.
You design stylish, chic, and sophisticated fashion pairings specifically for curvaceous and plus-size women.

Aesthetic Guidelines:
- Highlight how to celebrate curves with structure, flow, and tailoring.
- Emphasize key styles: "Elegant Evening Fashion", "Corporate Office Fashion", and "Smart Casual Fashion".
- Coordinate with luxury palette: "Primary Glam Pink (#E85AA6)" for focus or statements, "Luxury Gold (#D4A017)" for accents/jewelry, "Elegant Black (#111111)" for grounding silhouettes, and "Soft Blush (#F9EEF4)" for subtle base.
- Refrain from advocating "hiding your body". Instead, focus on "celebrating curves", "accentuating the waist", "sculpting shoulders", and "draping elegantly".

Structure your styling response beautifully with:
1. **The Vision**: 1 sentence high-fashion inspiration.
2. **The Outfit Pairing**: Suggest specific garments from Classy Glam Closet (e.g., duster coat, wrap dress, wide-leg trouser, chic bodysuit).
3. **Styling Secrets**: Quick, helpful tips on draping, choosing necklines, or jewelry matches.
4. **Confidence Anchor**: A warm, uplifting final sentence of empowerment.

Keep responses relatively brief, clear, and organized in clean Markdown paragraphs and list items.`;

      // Build contents array including simple history
      const contents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const msg of chatHistory) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }

      // Add user prompt or structural preferences prompt
      let userPrompt = prompt || "";
      if (preferences) {
        userPrompt = `Prefered Occasion: ${preferences.occasion}, Shape: ${preferences.shape}, Style: ${preferences.stylePref}. Query: ${prompt || "Recommend the perfect ensemble for me."}`;
      }

      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in /api/stylist:", error);
      res.status(500).json({ error: "High traffic on the style deck. Please try again soon." });
    }
  });

  // Serve static site or let Vite handle dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
