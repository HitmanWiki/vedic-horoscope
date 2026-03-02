// pages/abhi.js — Abhi's personalized daily Vedic horoscope
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { buildAbhiPrompt } from '../lib/prompts';
import {
  Panel, ScoreCard, LuckyItem, ListItem, InfoStrip, TimeGuideCard
} from '../components/HoroscopeUI';

const G  = '#C9A84C';
const GL = '#E8CC7A';
const MU = '#7A7268';
const CB = '#13131E';
const C2 = '#191928';
const BR = 'rgba(201,168,76,0.18)';

// Inject CSS vars so shared components resolve them
const cssVars = {
  '--card':   CB,
  '--card2':  C2,
  '--border': BR,
  '--text':   '#E8E0D0',
  '--muted':  MU,
  '--accent': G,
  '--hl':     GL,
  '--green':  '#90C8A0',
  '--red':    '#D09090',
  '--warn':   '#D09090',
};

export default function Abhi() {
  const [reading,  setReading]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [dateStr,  setDateStr]  = useState('');
  const [dayName,  setDayName]  = useState('');
  const [stars,    setStars]    = useState([]);

  useEffect(() => {
    const now = new Date();
    setDateStr(now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' }));
    setDayName(now.toLocaleDateString('en-IN', { weekday:'long' }));
    setStars(Array.from({ length: 90 }, (_, i) => ({
      id: i, size: Math.random() * 1.6 + 0.3,
      left: Math.random() * 100, top: Math.random() * 100,
      d: 2 + Math.random() * 5, delay: Math.random() * 6,
    })));
  }, []);

  const generate = useCallback(async () => {
    setLoading(true); setError(null); setReading(null);
    try {
      const res = await fetch('/api/horoscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildAbhiPrompt(dateStr, dayName) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setReading(data);
    } catch (e) {
      setError(`Could not load reading: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [dateStr, dayName]);

  return (
    <>
      <Head>
        <title>Abhi — Daily Vedic Horoscope</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background: '#080810', minHeight: '100vh', color: '#E8E0D0',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    position: 'relative', zIndex: 1, ...cssVars }}>

        {/* Ambient glow */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 20% 30%,rgba(107,79,160,.1) 0%,transparent 60%),radial-gradient(ellipse at 80% 70%,rgba(58,127,154,.07) 0%,transparent 50%)'
        }} />

        {/* Stars */}
        {stars.map(s => (
          <div key={s.id} className="star" style={{
            width: s.size, height: s.size, left: `${s.left}%`, top: `${s.top}%`,
            '--d': `${s.d}s`, '--delay': `${s.delay}s`
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 840, margin: '0 auto', padding: '0 20px' }}>

          {/* Back link */}
          <div style={{ paddingTop: 24 }}>
            <Link href="/" style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 3,
                                    color: MU, textDecoration: 'none', opacity: 0.6 }}>
              ← HOME
            </Link>
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', padding: '40px 0 34px' }}>
            <div style={{ fontSize: 36, color: G, display: 'inline-block',
                          animation: 'spin 24s linear infinite', marginBottom: 18,
                          filter: `drop-shadow(0 0 12px ${G})` }}>✦</div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(16px,4vw,28px)',
                          letterSpacing: 5, color: GL, marginBottom: 8 }}>
              ABHI'S DAILY VEDIC HOROSCOPE
            </div>
            <div style={{ fontStyle: 'italic', fontSize: 15, color: MU, letterSpacing: 2, marginBottom: 4 }}>
              Cancer Lagna · Gemini Moon · Punarvasu Nakshatra
            </div>
            <div style={{ fontSize: 11, color: MU, letterSpacing: 3, opacity: 0.5 }}>
              Born June 10, 1986 · 9:00 AM · Abohar, India
            </div>
          </div>

          {/* Info strip */}
          <InfoStrip items={[
            ['TODAY', dateStr || '…'],
            ['MAHADASHA', 'Mercury'],
            ['ANTARDASHA', 'Sun'],
            ['PERIOD', 'Dec 2025 – Nov 2026'],
            ['ATMAKARAKA', 'Venus'],
          ]} />

          {/* Chart pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 24 }}>
            {[['LAGNA','Cancer'],['MOON','Gemini'],['NAKSHATRA','Punarvasu'],['STRONGEST','Mercury']].map(([l,v]) => (
              <div key={l} style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3,
                                    padding: '13px 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: 2, color: MU, marginBottom: 6 }}>{l}</div>
                <div style={{ fontStyle: 'italic', color: GL, fontSize: 15 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Generate button */}
          <button onClick={generate} disabled={loading} style={{
            display: 'block', width: '100%', padding: '20px',
            background: 'linear-gradient(135deg,#1A150A,#2A2010,#1A150A)',
            border: `1px solid ${G}`, borderRadius: 3, color: GL,
            fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: 5,
            cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 28,
            opacity: loading ? 0.55 : 1, transition: 'all .3s',
            boxShadow: loading ? 'none' : `0 0 20px rgba(201,168,76,.1)`
          }}>
            {loading ? '✦   Reading the Stars…   ✦' : '✦   REVEAL TODAY\'S COSMIC GUIDANCE   ✦'}
          </button>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{ fontSize: 50, color: GL, display: 'inline-block',
                            animation: 'floatY 2s ease-in-out infinite', marginBottom: 20 }}>☽</div>
              <div style={{ fontStyle: 'italic', color: MU, fontSize: 17, letterSpacing: 2 }}>
                The cosmos is aligning your reading…
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(160,64,64,.1)', border: '1px solid rgba(160,64,64,.3)',
                          borderRadius: 4, padding: '20px 24px', color: '#D09090',
                          marginBottom: 24, fontSize: 13, lineHeight: 1.7 }}>
              {error}
            </div>
          )}

          {/* Reading */}
          {reading && !loading && (
            <div>
              {/* Energy banner */}
              <div style={{ background: 'linear-gradient(135deg,#100E1A,#1A1628,#100E1A)',
                            border: '1px solid rgba(107,79,160,.4)', borderRadius: 3,
                            padding: '36px 28px', textAlign: 'center', marginBottom: 16,
                            position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                              background: `linear-gradient(90deg,transparent,${GL},transparent)` }} />
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 6,
                              color: G, opacity: 0.7, marginBottom: 12 }}>TODAY'S COSMIC ENERGY</div>
                <div style={{ fontStyle: 'italic', fontSize: 'clamp(22px,5vw,40px)',
                              color: GL, marginBottom: 14, lineHeight: 1.2,
                              textShadow: `0 0 40px rgba(201,168,76,.3)` }}>{reading.overallEnergy}</div>
                <div style={{ fontSize: 14, color: MU, lineHeight: 1.85,
                              maxWidth: 540, margin: '0 auto' }}>{reading.overallDesc}</div>
              </div>

              {/* Scores */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 16 }}>
                <ScoreCard icon="💼" name="CAREER"  val={reading.scores.career}  accentFrom={G}  accentTo={GL} />
                <ScoreCard icon="❤️" name="LOVE"    val={reading.scores.love}    accentFrom={G}  accentTo={GL} />
                <ScoreCard icon="🌿" name="HEALTH"  val={reading.scores.health}  accentFrom={G}  accentTo={GL} />
                <ScoreCard icon="💰" name="WEALTH"  val={reading.scores.wealth}  accentFrom={G}  accentTo={GL} />
              </div>

              {/* Insight panels */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Panel icon="🌅" title="MORNING GUIDANCE">{reading.morningGuidance}</Panel>
                <Panel icon="💼" title="CAREER & WORK">{reading.careerInsight}</Panel>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Panel icon="❤️" title="LOVE & RELATIONS">{reading.relationshipInsight}</Panel>
                <Panel icon="🌿" title="HEALTH & ENERGY">{reading.healthInsight}</Panel>
              </div>

              {/* Dos & Don'ts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px' }}>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: G, opacity: 0.7, marginBottom: 12 }}>✅ TODAY'S DOS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {reading.dos.map((d, i) => <ListItem key={i} text={d} type="do" />)}
                  </div>
                </div>
                <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px' }}>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: G, opacity: 0.7, marginBottom: 12 }}>⛔ TODAY'S DON'TS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {reading.donts.map((d, i) => <ListItem key={i} text={d} type="dont" />)}
                  </div>
                </div>
              </div>

              {/* Lucky elements */}
              <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: G, opacity: 0.7, marginBottom: 14 }}>🍀 TODAY'S LUCKY ELEMENTS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
                  <LuckyItem label="COLOR"      value={reading.luckyColor} />
                  <LuckyItem label="NUMBER"     value={reading.luckyNumber} />
                  <LuckyItem label="DIRECTION"  value={reading.luckyDirection} />
                  <LuckyItem label="GEMSTONE"   value={reading.luckyGem} />
                  <LuckyItem label="BEST TIME"  value={reading.luckyTime} />
                  <LuckyItem label="AVOID TIME" value={reading.avoidTime} warn />
                </div>
              </div>

              {/* Time guide */}
              <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: G, opacity: 0.7, marginBottom: 14 }}>⏰ TIME GUIDE FOR TODAY</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
                  <TimeGuideCard label="BEST HOURS"   val={reading.luckyTime}  desc={reading.bestTimeFor}   accentColor="rgba(74,138,90,.3)" />
                  <TimeGuideCard label="REST HOURS"   val={reading.avoidTime}  desc={reading.avoidTimeDesc} accentColor="rgba(160,64,64,.25)" />
                  <TimeGuideCard label="DASHA ENERGY" val="Merc / Sun"         desc="Career recognition & authority energy is strong" accentColor={BR} />
                </div>
              </div>

              {/* Mantra */}
              <div style={{ background: 'linear-gradient(135deg,#0E1218,#121820)',
                            border: '1px solid rgba(58,127,154,.35)', borderRadius: 3,
                            padding: '30px', textAlign: 'center', marginBottom: 12, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                              background: 'linear-gradient(90deg,transparent,rgba(58,127,154,.6),transparent)' }} />
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 5,
                              color: '#3A7F9A', opacity: 0.8, marginBottom: 14 }}>TODAY'S MANTRA</div>
                <div style={{ fontStyle: 'italic', fontSize: 'clamp(16px,3vw,22px)',
                              color: '#90C8D8', lineHeight: 1.6, marginBottom: 10 }}>{reading.mantra}</div>
                <div style={{ fontSize: 12, color: MU, letterSpacing: 1 }}>{reading.mantraMeaning}</div>
              </div>

              {/* Day message */}
              <div style={{ background: 'linear-gradient(135deg,#0A100E,#121E18)',
                            border: '1px solid rgba(74,138,90,.4)', borderRadius: 3,
                            padding: '34px', textAlign: 'center', marginBottom: 24, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                              background: 'linear-gradient(90deg,transparent,rgba(74,138,90,.5),transparent)' }} />
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 5,
                              color: '#5A9A6A', opacity: 0.8, marginBottom: 14 }}>MESSAGE FROM THE STARS</div>
                <div style={{ fontStyle: 'italic', fontSize: 'clamp(15px,3vw,22px)',
                              color: '#90C8A0', lineHeight: 1.65 }}>{reading.dayMessage}</div>
              </div>

              {/* Refresh */}
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <button onClick={generate} style={{
                  padding: '12px 36px', background: 'transparent',
                  border: `1px solid ${BR}`, borderRadius: 3,
                  color: MU, cursor: 'pointer',
                  fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 3
                }}>↻ &nbsp; REFRESH READING</button>
              </div>

              <div style={{ textAlign: 'center', fontStyle: 'italic', color: MU,
                            fontSize: 12, opacity: 0.4, lineHeight: 1.9, paddingBottom: 40 }}>
                Powered by Google Gemini · For reflection and guidance only · 🙏
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
