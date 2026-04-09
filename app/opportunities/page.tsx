'use client';
import { opportunities, labInfo } from '@/data/siteData';
import { Calendar, Clock, DollarSign, Mail } from 'lucide-react';

const typeColors: Record<string, { color: string; bg: string; border: string }> = {
  PhD:        { color: '#0077b6', bg: 'rgba(0,119,182,0.06)',    border: 'rgba(0,119,182,0.2)'    },
  Postdoc:    { color: '#6d28d9', bg: 'rgba(109,40,217,0.06)',   border: 'rgba(109,40,217,0.2)'   },
  Masters:    { color: '#059669', bg: 'rgba(5,150,105,0.06)',    border: 'rgba(5,150,105,0.2)'    },
  Internship: { color: '#d97706', bg: 'rgba(217,119,6,0.06)',    border: 'rgba(217,119,6,0.2)'    },
};

export default function OpportunitiesPage() {
  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#0077b6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Join Our Team</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1, color: '#0f1923' }}>Open Opportunities</h1>
          <p style={{ fontSize: 15, color: 'rgba(15,25,35,0.55)', lineHeight: 1.6, maxWidth: 560 }}>We're always looking for talented, motivated individuals to join our lab. Here are our current openings.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="opp-grid">
          {opportunities.map(opp => {
            const c = typeColors[opp.type] || { color: '#0f1923', bg: 'rgba(15,25,35,0.04)', border: 'rgba(168,189,212,0.5)' };
            const daysLeft = Math.ceil((new Date(opp.deadline).getTime() - Date.now()) / 86400000);
            return (
              <div key={opp.id}
                style={{ background: '#ffffff', border: '1px solid rgba(168,189,212,0.5)', borderRadius: 14, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = c.border; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.09)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(168,189,212,0.5)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: c.bg, border: `1px solid ${c.border}`, color: c.color, letterSpacing: '0.05em' }}>{opp.type}</span>
                  {daysLeft > 0 && daysLeft <= 30
                    ? <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 100, fontFamily: 'Space Mono, monospace', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#dc2626' }}>{daysLeft}d left</span>
                    : daysLeft <= 0
                      ? <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 100, fontFamily: 'Space Mono, monospace', background: 'rgba(15,25,35,0.05)', border: '1px solid rgba(168,189,212,0.4)', color: 'rgba(15,25,35,0.35)' }}>Closed</span>
                      : null}
                </div>

                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#0f1923', lineHeight: 1.35, marginBottom: 10 }}>{opp.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(15,25,35,0.55)', lineHeight: 1.7, marginBottom: 20 }}>{opp.description}</p>

                <div style={{ marginBottom: 22, flex: 1 }}>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(15,25,35,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Requirements</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {opp.requirements.map((req, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: c.color, fontSize: 13, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>›</span>
                        <span style={{ fontSize: 12, color: 'rgba(15,25,35,0.6)', lineHeight: 1.55 }}>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(168,189,212,0.4)', marginBottom: 18 }} />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                  {[
                    { icon: <Calendar size={11} />, text: new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                    { icon: <Clock size={11} />, text: opp.duration },
                    { icon: <DollarSign size={11} />, text: opp.funding },
                  ].map(({ icon, text }) => (
                    <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontFamily: 'Space Mono, monospace', color: 'rgba(15,25,35,0.5)', padding: '4px 10px', borderRadius: 6, background: '#f4f6f9', border: '1px solid rgba(168,189,212,0.45)' }}>
                      <span style={{ color: c.color }}>{icon}</span>{text}
                    </span>
                  ))}
                </div>

                <a
                  href={`mailto:${opp.contact}?subject=Application: ${opp.title}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px 0', borderRadius: 8, fontSize: 12, fontFamily: 'Space Mono, monospace', fontWeight: 700, textDecoration: 'none', transition: 'all 0.15s', background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = c.color; el.style.color = '#fff'; el.style.borderColor = c.color; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = c.bg; el.style.color = c.color; el.style.borderColor = c.border; }}>
                  <Mail size={13} /> Apply via Email
                </a>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 56, padding: '40px', background: '#ffffff', border: '1px solid rgba(168,189,212,0.5)', borderRadius: 14, textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, marginBottom: 10, color: '#0f1923' }}>Don't See a Matching Position?</h3>
          <p style={{ fontSize: 14, color: 'rgba(15,25,35,0.55)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>We welcome motivated researchers who align with our mission. Send your CV and a brief research statement.</p>
          <a href={`mailto:${labInfo.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 26px', borderRadius: 8, fontSize: 12, fontFamily: 'Space Mono, monospace', fontWeight: 700, textDecoration: 'none', background: '#0077b6', color: '#fff' }}>
            <Mail size={13} /> Get in Touch
          </a>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .opp-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}