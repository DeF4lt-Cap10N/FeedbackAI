import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import llmRouter from './routes/llm.js';
import feedbackRouter from './routes/feedback.js'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('FeedbackAI backend is live!');
});


app.use('/api', llmRouter);
app.use('/api', feedbackRouter); 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
