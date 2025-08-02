import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/ask', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
            {
                contents: [
                    {
                        parts: [{ text: question }],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': process.env.GEMINI_API_KEY,
                },
            }
        );


        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        res.json({ answer: reply || 'No answer received' });
    } catch (err) {
        console.error('Gemini API Error:', err?.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch from Gemini LLM' });
    }
});

export default router;
