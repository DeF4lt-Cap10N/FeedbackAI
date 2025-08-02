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
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a helpful AI assistant that analyzes customer feedback and gives concise, actionable insights.',
                    },
                    {
                        role: 'user',
                        content: `Analyze this customer feedback and extract any useful product insights:\n\n"${question}"`,
                    },
                ],

                temperature: 0.4
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiInsight = response.data.choices[0].message.content;
        res.json({ insight: aiInsight });

    } catch (error) {
        console.error('Groq API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error generating insight.' });
    }
});


export default router;
