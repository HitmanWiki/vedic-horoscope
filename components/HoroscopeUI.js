// components/HoroscopeUI.js — shared UI building blocks

export function Panel({ icon, title, children, style = {} }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 3, padding: '20px', ...style
    }}>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 4,
        color: 'var(--accent)', opacity: 0.7, marginBottom: 12
      }}>{icon} {title}</div>
      <div style={{
        fontStyle: 'italic', fontSize: 16, lineHeight: 1.85, color: 'var(--text)'
      }}>{children}</div>
    </div>
  );
}

export function ScoreCard({ icon, name, val, accentFrom, accentTo }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 3, padding: '16px 10px', textAlign: 'center'
    }}>
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 2,
        color: 'var(--muted)', marginBottom: 8
      }}>{name}</div>
      <div style={{
        height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2,
        marginBottom: 8, overflow: 'hidden'
      }}>
        <div style={{
          height: '100%', width: `${val}%`,
          background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
          borderRadius: 2
        }} />
      </div>
      <div style={{ fontStyle: 'italic', fontSize: 18, color: 'var(--hl)' }}>{val}</div>
    </div>
  );
}

export function LuckyItem({ label, value, warn }) {
  return (
    <div style={{
      background: 'var(--card2)', border: '1px solid var(--border)',
      borderRadius: 3, padding: '14px 10px', textAlign: 'center'
    }}>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 2,
        color: 'var(--muted)', marginBottom: 6
      }}>{label}</div>
      <div style={{
        fontStyle: 'italic', fontSize: 15, fontWeight: 600,
        color: warn ? 'var(--warn)' : 'var(--hl)'
      }}>{value}</div>
    </div>
  );
}

export function ListItem({ text, type }) {
  const isDo = type === 'do';
  return (
    <div style={{
      display: 'flex', gap: 10, padding: '10px 13px',
      background: isDo ? 'rgba(74,138,90,0.08)' : 'rgba(160,64,64,0.08)',
      border: `1px solid ${isDo ? 'rgba(74,138,90,0.2)' : 'rgba(160,64,64,0.2)'}`,
      borderRadius: 3, fontSize: 13,
      color: isDo ? 'var(--green)' : 'var(--red)',
      lineHeight: 1.65
    }}>
      <span style={{ flexShrink: 0 }}>{isDo ? '✦' : '✗'}</span>
      <span>{text}</span>
    </div>
  );
}

export function Starfield() {
  if (typeof window === 'undefined') return null;
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    size: Math.random() * 1.6 + 0.3,
    left: Math.random() * 100,
    top:  Math.random() * 100,
    d:    2 + Math.random() * 5,
    delay: Math.random() * 6,
  }));
  return (
    <>
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          width: s.size, height: s.size,
          left: `${s.left}%`, top: `${s.top}%`,
          '--d': `${s.d}s`, '--delay': `${s.delay}s`,
        }} />
      ))}
    </>
  );
}

export function InfoStrip({ items }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '8px 20px',
      justifyContent: 'center', alignItems: 'center',
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 4, padding: '14px 20px', marginBottom: 24
    }}>
      {items.map(([label, value], i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8,
            letterSpacing: 3, color: 'var(--muted)', marginBottom: 3
          }}>{label}</div>
          <div style={{ fontStyle: 'italic', color: 'var(--hl)', fontSize: 13 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

export function TimeGuideCard({ label, val, desc, accentColor }) {
  return (
    <div style={{
      background: 'var(--card2)',
      border: `1px solid ${accentColor}`,
      borderRadius: 3, padding: '16px 12px', textAlign: 'center'
    }}>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 7,
        letterSpacing: 2, color: 'var(--muted)', marginBottom: 8
      }}>{label}</div>
      <div style={{
        fontStyle: 'italic', fontSize: 15, color: 'var(--text)',
        fontWeight: 600, marginBottom: 5
      }}>{val}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}
