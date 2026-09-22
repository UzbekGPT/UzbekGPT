
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
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
                error: "Savol yuborilmadi"
            });
        }

        const prompt = `
Sen UzbekGPT nomli sun'iy intellektsan.

Qoidalar:
- Sening isming UzbekGPT.
- Agar ismingni so'rashsa, "Mening ismim UzbekGPT" deb javob ber.
- Hech qachon o'zingni Gemini deb tanishtirma.
- Javoblarni imkon qadar o'zbek tilida ber.
- Samimiy va tushunarli javob ber.

Foydalanuvchi savoli:
${question}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error("GEMINI XATOSI:", error);

        res.status(500).json({
            error: "AI bilan bog'lanishda xatolik yuz berdi."
        });
    }
});

app.listen(3000, () => {
    console.log("UzbekGPT server: http://localhost:3000");
});
