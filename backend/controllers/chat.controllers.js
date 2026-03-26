import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/user.model.js";

export const generateResponse = async (req, res) => {
    try {
        const userId = req.userId;
        const { message } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Gemini API Key is missing in the backend." });
        }

        const apiKey = process.env.GEMINI_API_KEY.trim();
        console.log("Using API Key starting with:", apiKey.substring(0, 5));
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a helpful, polite, and conscious AI virtual assistant named ${user.assistantName || "Assistant"}. 
You are currently talking directly to the user, whose name is ${user.name}. 
Keep your answers brief, conversational, and direct, because they will be spoken out loud via text-to-speech. 
Do NOT use markdown formatting like asterisks or bold text. Just plain conversational text.
Here is what the user said:
"${message}"`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return res.status(200).json({ response: responseText });
    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(500).json({ message: "Failed to generate response", error: error.message });
    }
};
