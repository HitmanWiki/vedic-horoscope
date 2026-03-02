// pages/api/horoscope.js
// Runs on SERVER only — Gemini API key is never exposed to the browser

import { buildAbhiPrompt, buildSapnaPrompt } from '../../lib/prompts';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { person, dateStr, dayName } = req.body;

  if (!person || !dateStr || !dayName) {
    return res.status(400).json({ error: 'Missing required fields: person, dateStr, dayName' });
  }

  if (!['abhi', 'sapna'].includes(person)) {
    return res.status(400).json({ error: 'person must be "abhi" or "sapna"' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set. Add it in Vercel → Settings → Environment Variables.' });
  }

  // Build prompt server-side — keeps request payload tiny
  const prompt = person === 'abhi'
    ? buildAbhiPrompt(dateStr, dayName)
    : buildSapnaPrompt(dateStr, dayName);

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 2048,        // was 1400 — too low, caused truncated JSON
            responseMimeType: 'application/json', // force Gemini to return clean JSON
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errBody = await geminiRes.json().catch(() => ({}));
      const msg = errBody.error?.message || `Gemini HTTP ${geminiRes.status}`;
      console.error('Gemini API error:', msg);
      return res.status(502).json({ error: msg });
    }

    const data = await geminiRes.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw) {
      console.error('Empty Gemini response:', JSON.stringify(data));
      return res.status(502).json({ error: 'Gemini returned an empty response. Please try again.' });
    }

    // Strip any accidental markdown fences
    const jsonStr = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('JSON parse error. Raw:', raw.substring(0, 300));
      return res.status(502).json({ error: 'Could not parse response. Please try again.' });
    }

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Horoscope handler error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
