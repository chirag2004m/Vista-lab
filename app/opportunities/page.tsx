'use client';
import { opportunities, labInfo } from '@/data/siteData';
import { Calendar, Clock, DollarSign, Mail } from 'lucide-react';

const typeColors: Record<string, { color: string; bg: string; border: string }> = {
  PhD:        { color: '#00d4ff', bg: 'rgba(0,212,255,0.06)',   border: 'rgba(0,212,255,0.2)'   },
  Postdoc:    { color: '#a78bfa', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.2)' },
  Masters:    { color: '#4ade80', bg: 'rgba(74,222,128,0.06)',  border: 'rgba(74,222,128,0.2)'  },
  Internship: { color: '#fbbf24', bg: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.2)'  },
};

export default function OpportunitiesPage() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>
      <div style={{ marginBottom: 52 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Join Our Team</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1 }}>Open Opportunities</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 560 }}>We're always looking for talented, motivated individuals to join our lab. Here are our current openings.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="opp-grid">
        {opportunities.map(opp => {
          const c = typeColors[opp.type] || { color: '#fff', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)' };
          const daysLeft = Math.ceil((new Date(opp.deadline).getTime() - Date.now()) / 86400000);
          return (
            <div key={opp.id} style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = c.border; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: c.bg, border: `1px solid ${c.border}`, color: c.color, letterSpacing: '0.05em' }}>{opp.type}</span>
                {daysLeft > 0 && daysLeft <= 30 ? <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 100, fontFamily: 'Space Mono, monospace', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>{daysLeft}d left</span>
                  : daysLeft <= 0 ? <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 100, fontFamily: 'Space Mono, monospace', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}>Closed</span> : null}
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#e8edf2', lineHeight: 1.35, marginBottom: 10 }}>{opp.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 20 }}>{opp.description}</p>
              <div style={{ marginBottom: 22, flex: 1 }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Requirements</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {opp.requirements.map((req, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: c.color, fontSize: 13, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>›</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 18 }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                {[{ icon: <Calendar size={11} />, text: new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, { icon: <Clock size={11} />, text: opp.duration }, { icon: <DollarSign size={11} />, text: opp.funding }].map(({ icon, text }) => (
                  <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.35)', padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ color: c.color }}>{icon}</span>{text}
                  </span>
                ))}
              </div>
              <a href={`mailto:${opp.contact}?subject=Application: ${opp.title}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px 0', borderRadius: 8, fontSize: 12, fontFamily: 'Space Mono, monospace', fontWeight: 700, textDecoration: 'none', transition: 'all 0.15s', background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = c.color; el.style.color = '#000'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = c.bg; el.style.color = c.color; }}>
                <Mail size={13} /> Apply via Email
              </a>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 56, padding: '36px 40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Don't See a Matching Position?</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: 480, margin: '0 auto 20px' }}>We welcome motivated researchers who align with our mission. Send your CV and a brief research statement.</p>
        <a href={`mailto:${labInfo.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 24px', borderRadius: 8, fontSize: 13, fontFamily: 'Space Mono, monospace', fontWeight: 700, textDecoration: 'none', background: '#fff', color: '#000' }}>
          <Mail size={13} /> Get in Touch
        </a>
      </div>
      <style>{`@media (max-width: 768px) { .opp-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}