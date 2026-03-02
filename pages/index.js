// pages/index.js — Landing page with links to both horoscopes
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setMounted(true);
    setStars(Array.from({ length: 90 }, (_, i) => ({
      id: i,
      size: Math.random() * 1.6 + 0.3,
      left: Math.random() * 100,
      top:  Math.random() * 100,
      d:    2 + Math.random() * 5,
      delay: Math.random() * 6,
    })));
  }, []);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <Head>
        <title>Daily Vedic Horoscope</title>
        <meta name="description" content="Personalized daily Vedic horoscopes for Abhi and Sapna" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background: '#08080E', minHeight: '100vh', color: '#E8E0D0',
                    fontFamily: "'Cormorant Garamond', Georgia, serif", position: 'relative' }}>

        {/* Glow */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 30% 30%, rgba(107,79,160,0.1) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(196,116,138,0.08) 0%, transparent 50%)'
        }} />

        {/* Stars */}
        {mounted && stars.map(s => (
          <div key={s.id} className="star" style={{
            width: s.size, height: s.size, left: `${s.left}%`, top: `${s.top}%`,
            '--d': `${s.d}s`, '--delay': `${s.delay}s`
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700,
                      margin: '0 auto', padding: '0 24px 80px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', padding: '70px 0 50px' }}>
            <div style={{ fontSize: 44, marginBottom: 24, display: 'inline-block',
                          animation: 'spin 30s linear infinite',
                          color: '#C9A84C', filter: 'drop-shadow(0 0 16px rgba(201,168,76,0.4))' }}>
              ✦
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px,5vw,32px)',
                          letterSpacing: 6, color: '#E8CC7A', marginBottom: 12 }}>
              VEDIC DAILY HOROSCOPE
            </div>
            <div style={{ fontStyle: 'italic', fontSize: 16, color: '#7A7268',
                          letterSpacing: 2, marginBottom: 8 }}>
              Personalized Jyotish readings powered by AI
            </div>
            <div style={{ fontSize: 12, color: '#7A7268', opacity: 0.6, letterSpacing: 2 }}>
              {today}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)',
                        marginBottom: 50 }} />

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Abhi Card */}
            <Link href="/abhi" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #13131E, #1A1628)',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 4, padding: '36px 24px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.4s',
                position: 'relative', overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '1px solid rgba(201,168,76,0.6)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(201,168,76,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(201,168,76,0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                              background: 'linear-gradient(90deg,transparent,#E8CC7A,transparent)' }} />
                <div style={{ fontSize: 42, marginBottom: 16,
                              animation: 'spin 20s linear infinite', display: 'inline-block',
                              color: '#C9A84C' }}>✦</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18,
                              letterSpacing: 4, color: '#E8CC7A', marginBottom: 10 }}>ABHI</div>
                <div style={{ fontStyle: 'italic', fontSize: 13, color: '#7A7268',
                              letterSpacing: 1, marginBottom: 20, lineHeight: 1.7 }}>
                  Cancer Lagna · Gemini Moon<br />Punarvasu Nakshatra
                </div>
                <div style={{ fontSize: 10, color: '#7A7268', marginBottom: 16 }}>
                  Mercury MD · Sun AD
                </div>
                <div style={{
                  display: 'inline-block', padding: '10px 24px',
                  border: '1px solid rgba(201,168,76,0.4)', borderRadius: 2,
                  fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 3,
                  color: '#C9A84C'
                }}>
                  VIEW READING →
                </div>
              </div>
            </Link>

            {/* Sapna Card */}
            <Link href="/sapna" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #120A14, #1E1028)',
                border: '1px solid rgba(196,116,138,0.25)',
                borderRadius: 4, padding: '36px 24px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.4s',
                position: 'relative', overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '1px solid rgba(196,116,138,0.6)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(196,116,138,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(196,116,138,0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                              background: 'linear-gradient(90deg,transparent,#E8A0B8,transparent)' }} />
                <div style={{ fontSize: 42, marginBottom: 16, display: 'inline-block',
                              animation: 'moonFloat 6s ease-in-out infinite',
                              color: '#E8A0B8', filter: 'drop-shadow(0 0 12px rgba(196,116,138,0.5))' }}>☽</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18,
                              letterSpacing: 4, color: '#E8A0B8', marginBottom: 10 }}>SAPNA</div>
                <div style={{ fontStyle: 'italic', fontSize: 13, color: '#7A6880',
                              letterSpacing: 1, marginBottom: 20, lineHeight: 1.7 }}>
                  Scorpio Lagna · Gemini Moon<br />Ardra Nakshatra
                </div>
                <div style={{ fontSize: 10, color: '#7A6880', marginBottom: 16 }}>
                  Saturn MD · Jupiter AD
                </div>
                <div style={{
                  display: 'inline-block', padding: '10px 24px',
                  border: '1px solid rgba(196,116,138,0.4)', borderRadius: 2,
                  fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 3,
                  color: '#C4748A'
                }}>
                  VIEW READING →
                </div>
              </div>
            </Link>
          </div>

          {/* Footer note */}
          <div style={{ textAlign: 'center', marginTop: 60, fontStyle: 'italic',
                        color: '#7A7268', fontSize: 13, opacity: 0.45, lineHeight: 1.9 }}>
            Powered by Google Gemini · Free tier<br />
            For reflection and guidance only · 🙏
          </div>
        </div>
      </div>
    </>
  );
}
