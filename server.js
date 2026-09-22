require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
    apiKey: process.env.UZBEKGPT_API_KEY
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "UzbekGPT server ishlayapti! 🤖"
    });
});

app.post("/api/chat", async (req, res) => {
    try {
        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                error: "Savol yozilmadi"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: question
        });

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Xatolik yuz berdi"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("UzbekGPT ishlayapti 🚀");
});