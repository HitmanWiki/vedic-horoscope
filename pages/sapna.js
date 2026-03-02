// pages/sapna.js — Sapna's personalized daily Vedic horoscope
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import {
  Panel, ScoreCard, LuckyItem, ListItem, InfoStrip, TimeGuideCard
} from '../components/HoroscopeUI';

const RO = '#C4748A';
const RL = '#E8A0B8';
const MU = '#7A6880';
const CB = '#131018';
const C2 = '#1A1624';
const BR = 'rgba(196,116,138,0.18)';

const cssVars = {
  '--card':   CB,
  '--card2':  C2,
  '--border': BR,
  '--text':   '#F0E8F0',
  '--muted':  MU,
  '--accent': RO,
  '--hl':     RL,
  '--green':  '#90CCA8',
  '--red':    '#D898A8',
  '--warn':   '#D898A8',
};

export default function Sapna() {
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
        body: JSON.stringify({ person: 'sapna', dateStr, dayName }),
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
        <title>Sapna — Daily Vedic Horoscope</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background: '#08080E', minHeight: '100vh', color: '#F0E8F0',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    position: 'relative', zIndex: 1, ...cssVars }}>

        {/* Ambient glow */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 15% 25%,rgba(138,94,160,.11) 0%,transparent 55%),radial-gradient(ellipse at 85% 75%,rgba(196,116,138,.09) 0%,transparent 50%)'
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
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontSize: 16, color: RO, opacity: 0.5, marginRight: 12,
                             display: 'inline-block', animation: 'petalSway 4s ease-in-out infinite' }}>✿</span>
              <span style={{ fontSize: 34, color: RL, display: 'inline-block',
                             animation: 'moonFloat 6s ease-in-out infinite',
                             filter: 'drop-shadow(0 0 14px rgba(196,116,138,.55))' }}>☽</span>
              <span style={{ fontSize: 16, color: RO, opacity: 0.5, marginLeft: 12,
                             display: 'inline-block', animation: 'petalSway 4s ease-in-out infinite .5s' }}>✿</span>
            </div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(15px,4vw,27px)',
                          letterSpacing: 5, color: RL, marginBottom: 8 }}>
              SAPNA'S DAILY HOROSCOPE
            </div>
            <div style={{ fontStyle: 'italic', fontSize: 15, color: MU, letterSpacing: 2, marginBottom: 4 }}>
              Scorpio Lagna · Gemini Moon · Ardra Nakshatra
            </div>
            <div style={{ fontSize: 11, color: MU, letterSpacing: 3, opacity: 0.5 }}>
              Born November 30, 1985 · 7:15 AM · Hamirpur, India
            </div>
          </div>

          {/* Info strip */}
          <InfoStrip items={[
            ['TODAY', dateStr || '…'],
            ['MAHADASHA', 'Saturn'],
            ['ANTARDASHA', 'Jupiter'],
            ['PERIOD', 'Jan 2026 – Nov 2028'],
            ['ATMAKARAKA', 'Mars'],
          ]} />

          {/* Chart pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 24 }}>
            {[['LAGNA','Scorpio'],['MOON','Gemini'],['NAKSHATRA','Ardra'],['SUN','Scorpio'],['STRONGEST','Mercury']].map(([l,v]) => (
              <div key={l} style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3,
                                    padding: '12px 7px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 7, letterSpacing: 2, color: MU, marginBottom: 5 }}>{l}</div>
                <div style={{ fontStyle: 'italic', color: RL, fontSize: 14 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Generate button */}
          <button onClick={generate} disabled={loading} style={{
            display: 'block', width: '100%', padding: '20px',
            background: 'linear-gradient(135deg,#160C14,#220E1A,#160C14)',
            border: `1px solid ${RO}`, borderRadius: 3, color: RL,
            fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: 5,
            cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 28,
            opacity: loading ? 0.55 : 1, transition: 'all .4s',
            boxShadow: loading ? 'none' : '0 0 20px rgba(196,116,138,.1)'
          }}>
            {loading ? '☽   Reading the Stars for Sapna…   ☽' : '☽   REVEAL TODAY\'S COSMIC GUIDANCE FOR SAPNA   ☽'}
          </button>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '70px 0' }}>
              <div style={{ fontSize: 50, color: RL, display: 'inline-block',
                            animation: 'moonFloat 2.5s ease-in-out infinite', marginBottom: 20,
                            filter: 'drop-shadow(0 0 16px rgba(196,116,138,.6))' }}>☽</div>
              <div style={{ fontStyle: 'italic', color: MU, fontSize: 17, letterSpacing: 2 }}>
                The stars are weaving Sapna's reading…
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(160,64,88,.1)', border: '1px solid rgba(160,64,88,.3)',
                          borderRadius: 4, padding: '20px 24px', color: '#D898A8',
                          marginBottom: 24, fontSize: 13, lineHeight: 1.7 }}>
              {error}
            </div>
          )}

          {/* Reading */}
          {reading && !loading && (
            <div>
              {/* Energy banner */}
              <div style={{ background: 'linear-gradient(135deg,#120A14,#1E1028,#120A14)',
                            border: '1px solid rgba(138,94,160,.4)', borderRadius: 3,
                            padding: '36px 28px', textAlign: 'center', marginBottom: 16,
                            position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                              background: `linear-gradient(90deg,transparent,${RL},transparent)` }} />
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 6,
                              color: RO, opacity: 0.75, marginBottom: 12 }}>TODAY'S COSMIC ENERGY FOR SAPNA</div>
                <div style={{ fontStyle: 'italic', fontSize: 'clamp(22px,5vw,40px)',
                              color: RL, marginBottom: 14, lineHeight: 1.2,
                              textShadow: '0 0 40px rgba(196,116,138,.3)' }}>{reading.overallEnergy}</div>
                <div style={{ fontSize: 14, color: MU, lineHeight: 1.85,
                              maxWidth: 540, margin: '0 auto' }}>{reading.overallDesc}</div>
              </div>

              {/* Scores */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 16 }}>
                <ScoreCard icon="🏠" name="FAMILY"    val={reading.scores.family}    accentFrom="#9A4A60" accentTo={RL} />
                <ScoreCard icon="💼" name="CAREER"    val={reading.scores.career}    accentFrom="#9A4A60" accentTo={RL} />
                <ScoreCard icon="🌿" name="HEALTH"    val={reading.scores.health}    accentFrom="#9A4A60" accentTo={RL} />
                <ScoreCard icon="🔮" name="INTUITION" val={reading.scores.intuition} accentFrom="#9A4A60" accentTo={RL} />
              </div>

              {/* Panels */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Panel icon="🌸" title="MORNING GUIDANCE">{reading.morningGuidance}</Panel>
                <Panel icon="🏠" title="FAMILY & HOME">{reading.familyInsight}</Panel>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Panel icon="💼" title="CAREER & WORK">{reading.careerInsight}</Panel>
                <Panel icon="🌿" title="HEALTH & EMOTIONS">{reading.healthInsight}</Panel>
              </div>

              {/* Jupiter Grace */}
              <div style={{ background: 'linear-gradient(135deg,#100E1A,#181428)',
                            border: '1px solid rgba(138,94,160,.35)', borderRadius: 3,
                            padding: '20px', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4,
                              color: '#B090D8', marginBottom: 12 }}>🪐 JUPITER'S GRACE — CURRENT BLESSING</div>
                <div style={{ fontStyle: 'italic', fontSize: 16, lineHeight: 1.85,
                              color: '#C8B0E8' }}>{reading.jupiterGrace}</div>
              </div>

              {/* Dos & Don'ts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px' }}>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: RO, opacity: 0.7, marginBottom: 12 }}>✅ TODAY'S DOS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {reading.dos.map((d, i) => <ListItem key={i} text={d} type="do" />)}
                  </div>
                </div>
                <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px' }}>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: RO, opacity: 0.7, marginBottom: 12 }}>⛔ TODAY'S DON'TS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {reading.donts.map((d, i) => <ListItem key={i} text={d} type="dont" />)}
                  </div>
                </div>
              </div>

              {/* Lucky elements */}
              <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: RO, opacity: 0.7, marginBottom: 14 }}>🌺 TODAY'S LUCKY ELEMENTS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
                  <LuckyItem label="COLOR"      value={reading.luckyColor} />
                  <LuckyItem label="NUMBER"     value={reading.luckyNumber} />
                  <LuckyItem label="DIRECTION"  value={reading.luckyDirection} />
                  <LuckyItem label="GEMSTONE"   value={reading.luckyGem} />
                  <LuckyItem label="BEST TIME"  value={reading.luckyTime} />
                  <LuckyItem label="REST TIME"  value={reading.avoidTime} warn />
                </div>
              </div>

              {/* Time guide */}
              <div style={{ background: CB, border: `1px solid ${BR}`, borderRadius: 3, padding: '20px', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: RO, opacity: 0.7, marginBottom: 14 }}>⏰ TIME GUIDANCE FOR TODAY</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
                  <TimeGuideCard label="GOLDEN HOURS"   val={reading.luckyTime}  desc={reading.bestTimeFor}   accentColor="rgba(74,138,96,.3)" />
                  <TimeGuideCard label="REST & REFLECT"  val={reading.avoidTime}  desc={reading.avoidTimeDesc} accentColor="rgba(160,64,88,.25)" />
                  <TimeGuideCard label="DASHA ENERGY"   val="Saturn · Jupiter"   desc="Expansion after hardship — trust the healing" accentColor={BR} />
                </div>
              </div>

              {/* Mantra */}
              <div style={{ background: 'linear-gradient(135deg,#0C1016,#101620)',
                            border: '1px solid rgba(90,127,160,.35)', borderRadius: 3,
                            padding: '30px', textAlign: 'center', marginBottom: 12, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                              background: 'linear-gradient(90deg,transparent,rgba(90,127,160,.6),transparent)' }} />
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 5,
                              color: '#5A7FA0', opacity: 0.8, marginBottom: 14 }}>SAPNA'S MANTRA FOR TODAY</div>
                <div style={{ fontStyle: 'italic', fontSize: 'clamp(15px,3vw,22px)',
                              color: '#90B8D0', lineHeight: 1.6, marginBottom: 10 }}>{reading.mantra}</div>
                <div style={{ fontSize: 12, color: MU, letterSpacing: 1 }}>{reading.mantraMeaning}</div>
              </div>

              {/* Day message */}
              <div style={{ background: 'linear-gradient(135deg,#0E1012,#141820)',
                            border: '1px solid rgba(74,138,96,.4)', borderRadius: 3,
                            padding: '34px', textAlign: 'center', marginBottom: 24, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                              background: 'linear-gradient(90deg,transparent,rgba(74,138,96,.5),transparent)' }} />
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 5,
                              color: '#5A9A70', opacity: 0.8, marginBottom: 14 }}>A MESSAGE FROM THE COSMOS · FOR SAPNA</div>
                <div style={{ fontStyle: 'italic', fontSize: 'clamp(15px,3vw,22px)',
                              color: '#90C8A8', lineHeight: 1.65 }}>{reading.dayMessage}</div>
              </div>

              {/* Refresh */}
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <button onClick={generate} style={{
                  padding: '12px 36px', background: 'transparent',
                  border: `1px solid ${BR}`, borderRadius: 3,
                  color: MU, cursor: 'pointer',
                  fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 3
                }}>☽ &nbsp; REFRESH READING &nbsp; ☽</button>
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
