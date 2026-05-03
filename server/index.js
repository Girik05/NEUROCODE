import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FORCE LOAD .env
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("API KEY:", process.env.OPENAI_API_KEY);
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/explain", async (req, res) => {
  console.log("📩 Request received");

  try {
    const { code } = req.body;
    console.log("🧠 Code:", code);

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Explain code simply." },
        { role: "user", content: code },
      ],
    });

    console.log("✅ OpenAI response:", response);

    res.json({
      result: response.choices?.[0]?.message?.content || "No AI output",
    });

  } catch (err) {
    console.error("❌ ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});