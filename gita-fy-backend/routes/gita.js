const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google AI model using the key from your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

router.post('/get-wisdom', async (req, res) => {
    try {
        // --- NEW: It now looks for EITHER an emotion or a problem ---
        const { emotion, problem } = req.body;

        if (!emotion && !problem) {
            return res.status(400).json({ msg: 'An emotion or a problem is required' });
        }

        let userInput = '';
        if (emotion) {
            userInput = `The user is feeling the emotion: "${emotion}".`;
        } else {
            userInput = `The user is facing the following problem or situation: "${problem}".`;
        }

        // The prompt now dynamically includes the user's input
        const prompt = `
            You are a wise and compassionate guide to the Bhagavad Gita.
            ${userInput}
            Provide one relevant verse from the Bhagavad Gita to offer them guidance.
            Analyze their input and select a verse that truly speaks to their situation.
            Respond ONLY with a single, raw JSON object in the following format, with no extra text or markdown:
            {
              "verse": "Chapter X, Verse Y",
              "text": "The Sanskrit verse text here...",
              "explanation": "A simple, compassionate explanation of how this verse applies to the user's situation."
            }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        const jsonStartIndex = rawText.indexOf('{');
        const jsonEndIndex = rawText.lastIndexOf('}');

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            throw new Error("AI response did not contain a valid JSON object.");
        }

        const jsonString = rawText.substring(jsonStartIndex, jsonEndIndex + 1);
        const jsonResponse = JSON.parse(jsonString);
        
        res.json(jsonResponse);

    } catch (error) {
        console.error('Error processing Gemini API response:', error);
        res.status(500).send('Error getting wisdom from AI');
    }
});

module.exports = router;