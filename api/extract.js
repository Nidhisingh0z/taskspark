require('dotenv').config({ path: '.env.local' });
const { GoogleGenAI } = require('@google/genai');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Only POST requests are allowed.' });
  }

  const { text } = req.body || {};
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Please provide some text.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: `Repeat this text back to me, exactly as given: "${text}"`,
    });

    return res.status(200).json({ message: response.text });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: 'Something went wrong contacting the AI.' });
  }
};
