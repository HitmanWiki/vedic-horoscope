// pages/api/horoscope.js
// Runs on SERVER only — Gemini API key is never exposed to the browser

// Extend Vercel function timeout to 30s (default 10s is too short for Gemini)
export const config = {
  maxDuration: 30,
};

// ── Compact prompts (server-side, never sent to browser) ──────────────────────

const ABHI = (d, day) => `You are a Vedic astrologer. Give a personalized daily horoscope for Abhi, ${d} (${day}).

Chart: Cancer Lagna (Pushya), Gemini Moon (Punarvasu), Sun Taurus (Mrigashira).
Strongest: Mercury 590 Shadbala. Atmakaraka: Venus (Kalpavriksha level).
Saturn R in 5th, Jupiter in 8th, Rahu 11th, Ketu 4th.
Dasha: Mercury MD / Sun AD (Dec 2025–Nov 2026) — career recognition phase.
Personality: Nurturing Cancer, resilient Punarvasu, sharp Mercury mind.

Reply with ONLY a JSON object (no markdown, no backticks). Schema:
{"overallEnergy":"4-6 word title","overallDesc":"2-3 sentences","scores":{"career":0,"love":0,"health":0,"wealth":0},"morningGuidance":"2-3 sentences","careerInsight":"2-3 sentences","relationshipInsight":"2-3 sentences","healthInsight":"2-3 sentences","dos":["","","",""],"donts":["","","",""],"luckyColor":"","luckyNumber":"","luckyDirection":"","luckyGem":"","luckyTime":"","avoidTime":"","mantra":"","mantraMeaning":"","bestTimeFor":"","avoidTimeDesc":"","dayMessage":""}`;

const SAPNA = (d, day) => `You are a Vedic astrologer. Give a personalized daily horoscope for Sapna, ${d} (${day}).

Chart: Scorpio Lagna (Anuradha), Gemini Moon (Ardra pada 2), Sun Scorpio (Anuradha).
5 planets in Scorpio: Sun, Mercury R (strongest 540 Shadbala), Venus (DK), Saturn, Lagna.
Atmakaraka: Mars (Virgo, Chitra). Jupiter debilitated Capricorn (Neecha Bhanga). Rahu 6th, Ketu 12th.
Dasha: Saturn MD / Jupiter AD (Jan 2026–Nov 2028) — best sub-period, healing after hardship.
Personality: Intense Scorpio, hidden resilience (Ardra Moon), warrior soul (Mars AK).

Reply with ONLY a JSON object (no markdown, no backticks). Schema:
{"overallEnergy":"4-7 word title","overallDesc":"2-3 sentences","scores":{"family":0,"career":0,"health":0,"intuition":0},"morningGuidance":"2-3 sentences","familyInsight":"2-3 sentences","careerInsight":"2-3 sentences","healthInsight":"2-3 sentences","dos":["","","",""],"donts":["","","",""],"luckyColor":"","luckyNumber":"","luckyDirection":"","luckyGem":"","luckyTime":"","avoidTime":"","mantra":"","mantraMeaning":"","bestTimeFor":"","avoidTimeDesc":"","jupiterGrace":"1-2 sentences","dayMessage":""}`;

// ─────────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { person, dateStr, dayName } = req.body || {};

  if (!person || !dateStr || !dayName) {
    return res.status(400).json({ error: 'Missing: person, dateStr, dayName' });
  }
  if (!['abhi', 'sapna'].includes(person)) {
    return res.status(400).json({ error: 'person must be "abhi" or "sapna"' });
  }

  const KEY = process.env.GEMINI_API_KEY;
  if (!KEY) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not set. Go to Vercel → your project → Settings → Environment Variables and add it.',
    });
  }

  const prompt = person === 'abhi' ? ABHI(dateStr, dayName) : SAPNA(dateStr, dayName);

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 2048,
            // NOTE: NO responseMimeType here — causes 400/502 errors with Flash models
          },
        }),
      }
    );

    // Read body once
    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      const msg = data?.error?.message || `Gemini HTTP ${geminiRes.status}`;
      console.error('Gemini error:', msg);
      return res.status(502).json({ error: msg });
    }

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!raw) {
      console.error('Empty Gemini response body:', JSON.stringify(data).slice(0, 400));
      return res.status(502).json({ error: 'Gemini returned empty content. Please try again.' });
    }

    // Extract JSON — strip markdown fences if present
    const jsonStr = raw
      .replace(/^[\s\S]*?(\{)/, '$1')   // drop any text before first {
      .replace(/\}[\s\S]*$/, '}')        // drop any text after last }
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Parse failed. Raw start:', raw.slice(0, 300));
      return res.status(502).json({ error: 'Response parsing failed. Please try again.' });
    }

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Handler error:', err.message);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
