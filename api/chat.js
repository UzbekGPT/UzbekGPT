const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { question } = req.body || {};

        if (!question) {
            return res.status(400).json({
                error: "Savol yozilmadi"
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: "GEMINI_API_KEY topilmadi"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: question
        });

        return res.status(200).json({
            answer: response.text
        });

    } catch (error) {
        console.error("Gemini error:", error);

        return res.status(500).json({
            error: error?.message || "Xatolik yuz berdi"
        });
    }
};