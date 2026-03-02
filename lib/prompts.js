// lib/prompts.js — Vedic chart data and prompt builders

export const buildAbhiPrompt = (dateStr, dayName) => `You are an expert Vedic astrologer. Generate a deeply personalized daily horoscope for Abhi for today, ${dateStr} (${dayName}).

BIRTH DETAILS:
- Date: June 10, 1986 | Time: 9:00 AM | Place: Abohar, India
- Lagna: Cancer (10°41') — Pushya Nakshatra, Pada 3
- Moon: Gemini, Punarvasu Nakshatra (Pada 2), 23°24'
- Sun: Taurus, Mrigashira Nakshatra, 25°20'
- Mercury: Gemini — STRONGEST PLANET (590 Shadbala), Ardra Nakshatra
- Venus: Gemini, Punarvasu Nakshatra (Atmakaraka — soul planet)
- Mars: Retrograde Sagittarius, UttaraAshadha Nakshatra
- Jupiter: Aquarius (8th house), PurvaBhadrapada Nakshatra
- Saturn: Retrograde Scorpio (5th house), Anuradha Nakshatra
- Rahu: Aries (11th house) | Ketu: Libra (4th house)

KEY CHART FACTS:
- Venus is Atmakaraka at Kalpavriksha varga level — soul craves love, beauty, abundance
- Mercury is his strongest planet — intellect, communication, and business are his greatest tools
- Bhrigu Bindu in Taurus — financial destiny is written
- Rahu in 11th house (gains) — unconventional or technology-related income
- Jupiter in 8th — wealth through transformation, others' resources
- Saturn retrograde in 5th — disciplined investor, avoid speculation

CURRENT DASHA:
- Mercury Mahadasha (2020–2037)
- Sun Antardasha (December 2025 – November 2026)
- Theme: Career clarity, authority figures, recognition, stepping into the spotlight

PERSONALITY: Cancer Lagna — nurturing, emotionally intelligent, intuitive, sensitive but resilient. Punarvasu Moon — bounces back from hardship, renewal is a constant theme. Mercury dominant — sharp analytical mind, loves learning.

You MUST respond with ONLY a raw JSON object. No markdown. No explanation. No backticks. Start your response with { and end with }. Use exactly this structure:

{
  "overallEnergy": "4-6 word evocative title for today",
  "overallDesc": "2-3 sentences about today's cosmic theme for Abhi",
  "scores": { "career": 75, "love": 60, "health": 70, "wealth": 65 },
  "morningGuidance": "2-3 sentences of specific morning guidance",
  "careerInsight": "2-3 sentences about work and career energy today",
  "relationshipInsight": "2-3 sentences about love and relationships today",
  "healthInsight": "2-3 sentences about health and physical energy today",
  "dos": ["DO 1", "DO 2", "DO 3", "DO 4"],
  "donts": ["DONT 1", "DONT 2", "DONT 3", "DONT 4"],
  "luckyColor": "one color",
  "luckyNumber": "one number",
  "luckyDirection": "one direction",
  "luckyGem": "one gemstone",
  "luckyTime": "e.g. 9 AM – 11 AM",
  "avoidTime": "e.g. 2 PM – 4 PM",
  "mantra": "a Sanskrit mantra suitable for today",
  "mantraMeaning": "English translation of the mantra",
  "bestTimeFor": "what to do during lucky hours",
  "avoidTimeDesc": "what to avoid during the avoid hours",
  "dayMessage": "One powerful warm personalized closing message for Abhi today"
}`;

export const buildSapnaPrompt = (dateStr, dayName) => `You are an expert Vedic astrologer. Generate a deeply personalized daily horoscope for Sapna for today, ${dateStr} (${dayName}).

SAPNA'S BIRTH DETAILS:
- Date: November 30, 1985 | Time: 7:15 AM | Place: Hamirpur, Himachal Pradesh, India
- Lagna: Scorpio (15°32') — Anuradha Nakshatra, Pada 4
- Moon: Gemini, Ardra Nakshatra (Pada 2), 12°06'
- Sun: Scorpio, Anuradha Nakshatra, 14°09'
- Mercury: Retrograde Scorpio, Anuradha — STRONGEST PLANET (540 Shadbala)
- Venus: Scorpio, Vishakha (DK — spouse karaka)
- Saturn: Scorpio, Anuradha
- Mars: Virgo, Chitra (AK — Atmakaraka / soul planet)
- Jupiter: Capricorn, Shravana (AmK, Neecha Bhanga)
- Rahu: Aries (6th house) | Ketu: Libra (12th house)

KEY CHART FACTS:
- Five planets in Scorpio — deeply intense, transformative, perceptive nature
- Mercury retrograde is her strongest planet — introspective, analytical, penetrating mind
- Mars as Atmakaraka — courage, independence, and right action are soul themes
- Moon in Ardra nakshatra — emotional storms beneath a calm surface, hidden deep resilience
- Jupiter Antardasha currently — expansion and healing after 15 years of Saturn hardship

CURRENT DASHA:
- Saturn Mahadasha (2010–2029)
- Jupiter Antardasha (January 2026 – November 2028) — CURRENT, best sub-period in Saturn MD
- Theme: Healing, hope returning, family blessings, gradual recovery after hardship

PERSONALITY: Scorpio Lagna — intense, deeply loyal, rarely shows emotions, magnetic, perceptive. Ardra Moon — carries hidden grief gracefully, resilient like no other. Mars AK — a warrior soul, never truly gives up.

You MUST respond with ONLY a raw JSON object. No markdown. No explanation. No backticks. Start your response with { and end with }. Use exactly this structure:

{
  "overallEnergy": "4-7 word evocative title for today",
  "overallDesc": "2-3 sentences about today's cosmic theme for Sapna",
  "scores": { "family": 75, "career": 60, "health": 70, "intuition": 80 },
  "morningGuidance": "2-3 sentences of specific morning guidance",
  "familyInsight": "2-3 sentences about home, husband, children energy today",
  "careerInsight": "2-3 sentences about work or personal projects today",
  "healthInsight": "2-3 sentences about physical and emotional health",
  "dos": ["DO 1", "DO 2", "DO 3", "DO 4"],
  "donts": ["DONT 1", "DONT 2", "DONT 3", "DONT 4"],
  "luckyColor": "one color",
  "luckyNumber": "one number",
  "luckyDirection": "one direction",
  "luckyGem": "one gemstone",
  "luckyTime": "e.g. 7 AM – 9 AM",
  "avoidTime": "e.g. 1 PM – 3 PM",
  "mantra": "a Sanskrit mantra suitable for Sapna today",
  "mantraMeaning": "English translation of the mantra",
  "bestTimeFor": "what to do during golden hours",
  "avoidTimeDesc": "what to avoid during rest hours",
  "jupiterGrace": "1-2 warm hopeful sentences about how Jupiter Antardasha is blessing Sapna right now",
  "dayMessage": "One powerful warm deeply personal closing message for Sapna"
}`;
