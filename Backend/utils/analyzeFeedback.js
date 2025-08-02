import axios from 'axios';

export async function analyzeFeedback(question) {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
       model: 'llama3-70b-8192', 
        messages: [{ role: 'user', content: question }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return (
      response.data?.choices?.[0]?.message?.content ||
      'No answer received from Groq'
    );
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn('Groq rate limit hit');
      return 'Groq API rate limit';
    }

    console.error('Groq API Error:', error.response?.data || error.message);
    return 'An error occurred while analyzing feedback.';
  }
}
