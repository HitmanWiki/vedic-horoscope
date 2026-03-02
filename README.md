# 🔮 Vedic Daily Horoscope — Abhi & Sapna

Personalized daily Vedic Jyotish readings powered by Google Gemini AI.

## Pages
- `/` — Home (links to both readings)
- `/abhi` — Abhi's daily horoscope (Cancer Lagna, Mercury MD / Sun AD)
- `/sapna` — Sapna's daily horoscope (Scorpio Lagna, Saturn MD / Jupiter AD)

---

## Deploy to Vercel (5 minutes)

### Step 1 — Get a free Gemini API Key
1. Go to https://aistudio.google.com
2. Sign in with Google → click **Get API Key → Create API Key**
3. Copy the key

### Step 2 — Upload to GitHub
1. Create a new repo at github.com
2. Upload all these files

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com → New Project → Import your GitHub repo
2. During setup, add Environment Variable:
   - Name: `GEMINI_API_KEY`
   - Value: your key from Step 1
3. Click Deploy — done! ✅

Your app will be live at `https://your-project.vercel.app`

---

## Run Locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000

---

## Cost
**Free!** Google Gemini gives 1,500 requests/day on the free tier.
Each reading = 1 request. More than enough for daily use forever.
