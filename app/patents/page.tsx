'use client';
import { patents } from '@/data/siteData';

export default function PatentsPage() {
  const granted = patents.filter(p => p.status === 'Granted');
  const pending = patents.filter(p => p.status === 'Pending');

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '72px 40px 80px' }}>

      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Intellectual Property</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1 }}>Patents</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Innovations developed at the CIS Lab with protected intellectual property registrations.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 1, marginBottom: 56 }}>
        {[
          { value: patents.length, label: 'Total Patents' },
          { value: granted.length, label: 'Granted' },
          { value: pending.length, label: 'Pending' },
          { value: 2, label: 'Countries' },
        ].map(({ value, label }) => (
          <div key={label} style={{ flex: 1, padding: '20px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, color: '#e8edf2', lineHeight: 1 }}>{value}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {patents.map(patent => {
          const isGranted = patent.status === 'Granted';
          return (
            <div key={patent.id} style={{ padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em' }}>{patent.category}</span>
                <span style={{ fontSize: 10, padding: '2px 10px', borderRadius: 100, fontFamily: 'Space Mono, monospace', fontWeight: 700, background: isGranted ? 'rgba(74,222,128,0.08)' : 'rgba(251,191,36,0.08)', border: `1px solid ${isGranted ? 'rgba(74,222,128,0.25)' : 'rgba(251,191,36,0.25)'}`, color: isGranted ? '#4ade80' : '#fbbf24' }}>
                  {patent.status}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'Space Mono, monospace' }}>{patent.number}</span>
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#e8edf2', lineHeight: 1.3, marginBottom: 8 }}>{patent.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 12, fontStyle: 'italic' }}>{patent.inventors}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16, maxWidth: 760 }}>{patent.abstract}</p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Mono, monospace' }}>
                  Filed: {new Date(patent.filedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {patent.grantDate && (
                  <span style={{ fontSize: 12, color: '#4ade80', fontFamily: 'Space Mono, monospace' }}>
                    Granted: {new Date(patent.grantDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}