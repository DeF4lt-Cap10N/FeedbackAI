import axios from 'axios';

export async function analyzeFeedback(question) {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent',
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

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No answer from Gemini'
    );
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn(' Gemini rate limit hit');
      return 'Gemini API rate limit';
    }

    console.error(' Gemini API Error:', error.response?.data || error.message);
    return 'An error occurred while analyzing feedback.';
  }
}
