import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const feedbackFile = path.join(process.cwd(), 'feedback.json');
import { analyzeFeedback } from "../utils/analyzeFeedback.js";


if (!fs.existsSync(feedbackFile)) {
    fs.writeFileSync(feedbackFile, '[]', 'utf-8');
}

router.post('/feedback', async(req, res) => {
    const { username, message } = req.body;

    if (!username || !message) {
        return res.status(400).json({ error: 'Missing username or message' });
    }
  const analysis = await analyzeFeedback(message); 
    const newFeedback = {
        id: Date.now(),
        username,
        message,
        analysis,
        createdAt: new Date().toISOString()
    };

    const data = JSON.parse(fs.readFileSync(feedbackFile, 'utf-8'));
    data.push(newFeedback);

    fs.writeFileSync(feedbackFile, JSON.stringify(data, null, 2));

    res.status(201).json({ message: 'Feedback stored successfully', feedback: newFeedback });
});

router.get('/feedback', (req, res) => {
    const data = JSON.parse(fs.readFileSync(feedbackFile, 'utf-8'));
    res.json(data);
});

export default router;
