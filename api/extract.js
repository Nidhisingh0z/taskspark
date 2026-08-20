require('dotenv').config({ path: '.env.local' });
const { GoogleGenAI } = require('@google/genai');

const MAX_TEXT_LENGTH = 5000;
const TIMEOUT_MS = 15000;

const SYSTEM_PROMPT = `You extract actionable tasks and their due dates from raw, messy text such as emails, chat messages, or notes.

RULES:
- Only extract genuine action items — things the reader needs to do. Ignore greetings, small talk, and general commentary.
- For each task, detect a due date or deadline if one is mentioned. This includes relative phrases like "tomorrow", "next Friday", "by Monday", or urgency words like "asap" / "urgent". If no date or urgency is mentioned, use null.
- Do not invent tasks that are not implied by the text.
- If the text contains no actionable tasks, return an empty tasks array.
- Respond with ONLY valid JSON in exactly this shape, and nothing else — no explanation, no markdown code fences:
{"tasks":[{"task":"string","dueDate":"string or null"}]}

EXAMPLES:

Input: "Hey can you send the deck by Friday, and don't forget we need the budget numbers from Raj before the Monday meeting"
Output: {"tasks":[{"task":"Send the deck","dueDate":"Friday"},{"task":"Get budget numbers from Raj","dueDate":"Monday (before meeting)"}]}

Input: "Just checking in, hope you're doing well, let's catch up soon"
Output: {"tasks":[]}

Input: "remember to call the dentist, pick up groceries tomorrow, and finish the report asap"
Output: {"tasks":[{"task":"Call the dentist","dueDate":null},{"task":"Pick up groceries","dueDate":"Tomorrow"},{"task":"Finish the report","dueDate":"ASAP"}]}`;

function extractJson(rawText) {
  // Defensive: Gemini sometimes wraps JSON in markdown code fences despite instructions not to.
  let cleaned = rawText.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }
  return JSON.parse(cleaned);
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), ms)
    ),
  ]);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Only POST requests are allowed.' });
  }

  const { text } = req.body || {};

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Please provide some text to extract tasks from.' });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return res.status(413).json({ error: 'That text is too long — please shorten it and try again.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: text,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      }),
      TIMEOUT_MS
    );

    let parsed;
    try {
      parsed = extractJson(response.text);
    } catch (parseErr) {
      console.error('JSON parse failed. Raw response:', response.text);
      return res.status(502).json({ error: 'Something went wrong extracting your tasks. Please try again.' });
    }

    if (!parsed || !Array.isArray(parsed.tasks)) {
      console.error('Unexpected response shape:', parsed);
      return res.status(502).json({ error: 'Something went wrong extracting your tasks. Please try again.' });
    }

    return res.status(200).json({ tasks: parsed.tasks });

  } catch (err) {
    if (err.message === 'TIMEOUT') {
      console.error('Gemini request timed out');
      return res.status(504).json({ error: 'That took too long — please try again.' });
    }
    console.error('Gemini API error:', err);
    return res.status(502).json({ error: 'Something went wrong extracting your tasks. Please try again.' });
  }
};